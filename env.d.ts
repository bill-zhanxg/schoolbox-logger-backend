namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV?: 'development';
		PORT: string;

		XATA_BRANCH: string;
		XATA_API_KEY: string;

		AUTH_SECRET: string;
	}
}
