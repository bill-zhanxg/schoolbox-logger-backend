import { DefaultSession } from '@auth/express';

type role = 'admin' | 'view' | null;
type team = { id: string };

interface CustomUser {
	/** The role of the user. */
	id: string;
	role?: role | null;
}
declare module '@auth/express' {
	interface Session {
		user: CustomUser & DefaultSession['user'];
	}

	interface User extends DefaultUser, CustomUser {}
}

declare module '@auth/core/adapters' {
	interface AdapterUser extends BaseAdapterUser, CustomUser {}
}
