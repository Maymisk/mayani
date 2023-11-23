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
import { fetchUser } from './fetchUser';
import { ISignInProps, ISignUpProps, User } from './types';
import { api } from '@/services/api';

type AuthContextData = {
	user: User;
	isLoading: boolean;
	signIn(props: ISignInProps): Promise<void | AuthError>;
	signOut(): Promise<void>;
	signUp(props: ISignUpProps): Promise<any>;
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

	async function signUp(data: ISignUpProps) {
		const response = await api.post('/user', data);

		return response;
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
