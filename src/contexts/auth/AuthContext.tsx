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
	reload(): Promise<void>;
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
		router.refresh();
	}

	async function signOut() {
		await supabase.auth.signOut();
		setUser(null);
		router.refresh();
	}

	async function signUp(data: ISignUpProps) {
		const response = await api.post('/user', data);

		return response;
	}

	async function getUser(supaUser: SupaUser | null) {
		if (!supaUser) return null;

		if (!user) setIsLoading(true);

		const fetchedUser = await fetchUser(supaUser, supabase);

		setUser(fetchedUser);
		setIsLoading(false);
	}

	async function reload() {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		await getUser(user);
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
		reload,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextData {
	return useContext(AuthContext);
}
