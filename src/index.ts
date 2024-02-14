import { ExpressAuth } from '@auth/express';
import { XataAdapter } from '@auth/xata-adapter';
import express from 'express';
import { getXataClient } from './libs/xata';

const client = getXataClient();

const app = express();

// If app is served through a proxy, trust the proxy to allow HTTPS protocol to be detected
app.use(
	'/auth/*',
	ExpressAuth({
		adapter: XataAdapter(client),
		session: {
			strategy: 'database',
		},
		debug: process.env.NODE_ENV === 'development',
	}),
);

app.listen(8000, () => {
	console.log('listening on 3000');
});
