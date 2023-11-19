export type UserType = 'workers' | 'clients';

type IsWorker = {
	isVerified: boolean;
	isSubscribed: boolean;
	avatar: string | null;
} | null;

export type User = {
	id: string;
	username: string;
	email: string;
	phone?: string;
	user_id: string;
	isWorker: IsWorker;
} | null;

export interface ISignInProps {
	email: string;
	password: string;
}

export interface ISignUpProps {
	name: string;
	username: string;
	email: string;
	password: string;
	type: UserType;
}

export interface ICreateUserData {
	name: string;
	username: string;
	type: UserType;
}

export type IFetchUserResponse = {
	workers: {
		id: string;
		username: string;
		isVerified: boolean;
		isSubscribed: boolean;
		worker_profiles: {
			avatar: string | null;
		};
	} | null;

	clients: {
		id: string;
		username: string;
	} | null;
};
