'use client';

import { Database } from '@root/supabase/databaseTypes';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
	AuthError,
	PostgrestError,
	User as SupaUser,
} from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

type AuthContextData = {
	user: User;
	isLoading: boolean;
	signIn(props: ISignInProps): Promise<void | AuthError>;
	signOut(): Promise<void>;
	signUp(props: ISignUpProps): Promise<void | AuthError | PostgrestError>;
};

type User = {
	id: string;
	username: string;
	email: string;
	phone?: string;
	isWorker: IsWorker;
} | null;

type IsWorker = {
	isVerified: boolean;
	isSubscribed: boolean;
	avatar: string | null;
} | null;

interface ISignInProps {
	email: string;
	password: string;
}

interface ISignUpProps {
	name: string;
	username: string;
	email: string;
	password: string;
	type: UserType;
}

interface ICreateUserData {
	id: string;
	name: string;
	username: string;
	type: UserType;
}

type UserType = 'workers' | 'clients';

interface IAuthContextProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthContextProvider({ children }: IAuthContextProviderProps) {
	const [user, setUser] = useState<User>(null);
	const [isLoading, setIsLoading] = useState(false);

	const supabase = createClientComponentClient<Database>();
	const router = useRouter();

	async function signIn({ email, password }: ISignInProps) {
		const {
			data: { user },
			error,
		} = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) return error;

		await getUser(user);
		router.refresh();
	}

	async function signOut() {
		await supabase.auth.signOut();
		setUser(null);
		router.refresh();
	}

	async function signUp({
		name,
		username,
		email,
		password,
		type,
	}: ISignUpProps) {
		const {
			data: { user },
			error,
		} = await supabase.auth.signUp({
			email,
			password,
			options: { emailRedirectTo: 'http://localhost:3000/home' },
		});

		if (error) return error;

		// evitar realizacao do signup antes de conferir se o username eh duplicado ou nao
		const creationError = await createUser({
			id: user!.id,
			name,
			username,
			type,
		});

		if (creationError) return creationError;
	}

	async function getUser(user: SupaUser | null) {
		if (!user) return null;

		setIsLoading(true);

		const { id, email } = user;
		const { data: isWorker } = await supabase
			.from('workers')
			.select(
				'username, isVerified, isSubscribed, worker_profiles(avatar)'
			)
			.eq('user_id', id)
			.single();

		const value: User = {
			id,
			username: isWorker?.username!,
			email: email as string,
			isWorker: isWorker
				? {
						...isWorker,
						avatar:
							isWorker.worker_profiles &&
							isWorker.worker_profiles[0].avatar,
				  }
				: null,
		};

		setUser(value);

		setIsLoading(false);
	}

	async function createUser({ id, name, username, type }: ICreateUserData) {
		const { error } = await supabase.from(type).insert({
			name,
			username,
			user_id: id,
		});

		if (error) return error;
	}

	useEffect(() => {
		supabase.auth.getUser().then(response => {
			const {
				data: { user },
			} = response;
			getUser(user);
		});
	}, []);

	const value = {
		user,
		isLoading,
		signIn,
		signOut,
		signUp,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextData {
	return useContext(AuthContext);
}
