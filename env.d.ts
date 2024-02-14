namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV?: 'development';

		DISCORD_GUILD_ID: string;
		DISCORD_TOKEN: string;

		XATA_BRANCH: string;
		XATA_API_KEY: string;

		NG_API_KEY: string;
	}
}
