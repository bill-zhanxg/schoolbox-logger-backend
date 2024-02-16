// file deepcode ignore Ssrf: Strictly authenticated path
// file deepcode ignore UseCsurfForExpress: This server uses server authentication instead of cookies
// file deepcode ignore DisablePoweredBy: We don't need to hide the server
import 'dotenv-flow/config';
const dynamicImport = new Function('specifier', 'return import(specifier)');

import * as cheerio from 'cheerio';
import express, { NextFunction, Request, Response } from 'express';
import type QueueType from 'queue';
import { getXataFile } from './libs/getXataFile';
import { getXataClient } from './libs/xata';

const app = express();
const xata = getXataClient();
app.use(express.json());

export function authenticatedUser(req: Request, res: Response, next: NextFunction) {
	const secret = req.headers.authorization;
	if (!secret || secret !== process.env.AUTH_SECRET) res.status(401).send('Unauthorized');
	else next();
}

app.use(express.json());

app.post('/scan-portraits', authenticatedUser, async (req, res) => {
	const { schoolboxDomain, schoolboxCookie } = req.body;
	// Validate request body
	if (!schoolboxDomain || !schoolboxCookie) return res.status(400).send('Incomplete request body');
	let schoolboxUrl: string;
	try {
		schoolboxUrl = new URL(schoolboxDomain).href;
	} catch (err) {
		return res.status(400).send('Invalid schoolbox domain');
	}

	res.send('I got the response, I will process in the background');

	const start = 1;
	const end = 2000;
	// const end = 11520;

	const Queue = (await dynamicImport('queue')).default;
	// Split the process into chunk of 500 to avoid maximum call stack exceeded
	const chunkSize = 500;
	for (let c = 0; c < Math.ceil(end / chunkSize); c++) {
		const q: QueueType = new Queue();

		const remaining = end - c * chunkSize;
		for (
			let i = c * chunkSize + start;
			i < c * chunkSize + start + (remaining < chunkSize ? remaining : chunkSize);
			i++
		) {
			q.push(async (cb) => {
				if (!cb) throw new Error('Callback is not defined');

				let retry = true;
				while (retry) {
					retry = false;
					await fetch(`${schoolboxUrl}search/user/${i}`, {
						// Originally I used schoolbox token but portrait API require cookie so why not both use cookie instead?
						headers: {
							cookie: schoolboxCookie,
						},
					})
						.then(async (res) => {
							if (res.ok) {
								const $ = cheerio.load(await res.text());
								const email = $('#content .content dd a').text().toLowerCase();
								if (email.trim()) {
									console.log(email);
									// We need user cookie to get portrait
									await fetch(`${schoolboxUrl}portrait.php?id=${i}`, {
										headers: {
											cookie: schoolboxCookie,
										},
									})
										.then(async (res) => {
											if (res.ok) {
												console.log('number', i, 'is ok');
												const contentDisposition = res.headers.get('content-disposition');
												if (!contentDisposition) throw new Error('Content-Disposition header is not defined');
												const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
												const matches = filenameRegex.exec(contentDisposition);
												if (matches != null && matches[1]) {
													const filename = matches[1].replace(/['"]/g, '');
													const portraitBlob = await res.blob();
													const portrait = new File([portraitBlob], filename);

													const response = await getXataFile(portrait);
													if (typeof response === 'string') throw new Error(response);
													const [fileObject, fileBlob] = response;

													// Database action
													xata.db.portraits
														.create({
															mail: email,
															schoolbox_id: i,
															portrait: fileObject ? fileObject : null,
														})
														.then(async (portrait) => {
															if (fileBlob) {
																await xata.files.upload(
																	{ table: 'portraits', column: 'portrait', record: portrait.id },
																	fileBlob,
																);
															}
														})
														.catch((err) => {
															// TODO
															console.log('database error', err);
														})
														.finally(() => {
															cb();
														});
												} else throw new Error('Filename is not defined');
											} else throw new Error(`Failed getting portrait for ${i} with status ${res.status}`);
										})
										.catch((err) => {
											// TODO
											console.log(err);
											cb();
										});
								} else {
									if ($.root().find('title').text().toLocaleLowerCase().includes('unavailable')) {
										// Schoolbox is rate limited (can't handle too many requests)
										// <title>Schoolbox is currently unavailable</title>
										/*
											<div class="row">
												<div id="message">
													<h2>We are experiencing more requests than we can handle.</h2>
													<p>
														We apologise that due to current high volumes of traffic we are unable to process your request at this time.
														Please wait for a minute then try refreshing your page. This problem is generally temporary and will pass
														once traffic returns to normal. If this persists, please contact your IT department to let them know.
													</p>
												</div>
											</div>
										*/
										// We want to wait and retry the request
										console.log('Schoolbox is rate limited,', i);
										retry = true;
										await new Promise((resolve) => {
											setTimeout(() => {
												resolve(undefined);
											}, 5000);
										});
									} else {
										// Maybe log to database
										console.log('No email found for', i);
										cb();
									}
								}
							} else {
								console.log(res.statusText);
								cb();
							}
						})
						.catch((err) => {
							// TODO
							console.log(err);
							cb();
						});
				}
			});
		}

		await new Promise((resolve) => {
			q.start((err) => {
				// TODO
				if (err) throw err;
				console.log(`Batch ${c} is finished:`);
				setTimeout(() => {
					resolve(undefined);
				}, 5000);
			});
		});
	}

	console.log('everything is finished!');
});

app.listen(8000, () => {
	console.log('listening on 8000');
});
