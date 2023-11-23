import { isSubscribedType } from '@root/supabase/isSubscribed';

export type User = {
	id: string;
	name: string;
	username: string;
	email: string;
	phone?: string;
	auth_id: string;
	isWorker: boolean;
	isVerified: boolean | undefined;
	isSubscribed: isSubscribedType;
	avatar: string | null;
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
	isWorker: boolean;
}

export type IFetchUserResponse = {
	id: string;
	name: string;
	username: string;
	worker_profiles: {
		isVerified: boolean;
		isSubscribed: isSubscribedType;
		avatar: string | null;
	} | null;

	client_profiles: {
		avatar: string | null;
	} | null;
};
