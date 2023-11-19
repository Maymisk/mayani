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
import { createUser } from './createUser';
import { fetchUser } from './fetchUser';
import { ISignInProps, ISignUpProps, User } from './types';

type AuthContextData = {
	user: User;
	isLoading: boolean;
	signIn(props: ISignInProps): Promise<void | AuthError>;
	signOut(): Promise<void>;
	signUp(
		props: ISignUpProps
	): Promise<void | AuthError | PostgrestError | Error>;
};

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
		router.push('/home');
	}

	async function signOut() {
		await supabase.auth.signOut();
		setUser(null);
		router.push('/login');
	}

	async function signUp({
		name,
		username,
		email,
		password,
		type,
	}: ISignUpProps) {
		const data = await createUser(
			{
				name,
				username,
				type,
			},
			supabase
		);

		if (!data) return new Error('Error creating the user');

		const isWorker = type === 'workers';
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: 'http://localhost:3000/home',
				data: { id: data.id, isWorker },
			},
		});

		if (authError) return authError;

		// this can be done with database triggers
		const { error: userError } = await supabase.from('users').insert({
			id: user!.id,
			clientId: isWorker ? null : data.id,
			workerId: isWorker ? data.id : null,
		});

		if (userError) return userError;
	}

	async function getUser(user: SupaUser | null) {
		if (!user) return null;

		setIsLoading(true);

		const fetchedUser = await fetchUser(user, supabase);

		setUser(fetchedUser);
		setIsLoading(false);
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
