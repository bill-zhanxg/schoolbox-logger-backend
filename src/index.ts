import 'dotenv-flow/config';

const dynamicImport = new Function('specifier', 'return import(specifier)');

import * as cheerio from 'cheerio';
import express, { NextFunction, Request, Response } from 'express';
import type QueueType from 'queue';
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

app.post('/', authenticatedUser, async (req, res) => {
	const { schoolboxDomain, schoolboxCookie } = req.body;
	// Validate request body
	if (!schoolboxDomain || !schoolboxCookie) return res.status(400).send('Incomplete request body');
	let schoolboxUrl: string;
	try {
		schoolboxUrl = new URL(schoolboxDomain).href;
	} catch (err) {
		return res.status(400).send('Invalid schoolbox domain');
	}

	const Queue = await dynamicImport('queue');
	const q: QueueType = new Queue.default();

	for (let i = 8294; i < 8295; i++) {
		q.push((cb) => {
			if (!cb) throw new Error('Callback is not defined');

			fetch(`${schoolboxUrl}search/user/${i}`, {
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
							fetch(`${schoolboxUrl}portrait.php?id=${i}`, {
								headers: {
									cookie: schoolboxCookie,
								},
							})
								.then(async (res) => {
									console.log(res.status);
									if (res.ok) {
										const contentDisposition = res.headers.get('content-disposition');
										if (!contentDisposition) throw new Error('Content-Disposition header is not defined');
										const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
										const matches = filenameRegex.exec(contentDisposition);
										if (matches != null && matches[1]) {
											const filename = matches[1].replace(/['"]/g, '');
											console.log(filename);
											const portraitBlob = await res.blob();
											new File([portraitBlob], filename);

											// Database action
											// xata.db.portraits
											// 	.create({
											// 		mail: email,
											// 		portrait: portrait,
											// 	})
											// 	.catch((err) => {
											// 		// TODO
											// 		console.log('database error', err);
											// 	})
											// 	.finally(() => {
											// 		cb();
											// 	});
										} else throw new Error('Filename is not defined');
									} else throw new Error(`Failed getting portrait for ${i} with status ${res.status}`);
								})
								.catch((err) => {
									// TODO
									console.log(err);
									cb();
								});
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
		});
	}

	q.start((err) => {
		// TODO
		if (err) throw err;
		console.log('all done:', q);
	});
	res.send('authed');
});

app.listen(8000, () => {
	console.log('listening on 8000');
});
