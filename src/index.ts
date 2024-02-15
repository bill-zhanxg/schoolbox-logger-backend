import 'dotenv-flow/config';

import express, { NextFunction } from 'express';
import { getXataClient } from './libs/xata';

console.log(process.env.XATA_API_KEY);
const app = express();
const client = getXataClient();

export function authenticatedUser(req: Request, res: Response, next: NextFunction) {
	console.log('authenticatedUser');
	// if (!session?.user) {
	// 	res.redirect('/login');
	// } else {
	// 	next();
	// }
}

app.use(express.json());

app.listen(8000, () => {
	console.log('listening on 8000');
});
