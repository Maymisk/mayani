'use client';

import { LoadingIcon } from '@/components/loadingIcon';
import { useAuth } from '@/contexts/auth/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validation } from './validation';
import { LoginFormInput } from './LoginFormInput';

interface IOnSubmitData {
	email: string;
	password: string;
}

export function LoginForm() {
	const { signIn } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm({ resolver: yupResolver(validation) });

	const [loginError, setLoginError] = useState<string>('');

	async function onSubmit({ email, password }: IOnSubmitData) {
		const error = await signIn({ email, password });

		if (error) setLoginError('Credenciais Inválidas');
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full h-full flex flex-col flex-1 gap-4 mt-1"
		>
			<LoginFormInput
				type="email"
				required
				autoComplete="off"
				{...register('email')}
				placeholder="Digite seu email"
				error={errors.email?.message}
			/>

			<LoginFormInput
				type="password"
				required
				{...register('password')}
				placeholder="Digite sua senha"
				error={errors.password?.message}
			/>

			<button
				type="submit"
				className="w-full h-12 bg-blue500 hover:bg-blue700 hover:text-white transition-all mt-auto rounded-sm font-bold flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
				onClick={() => setLoginError('')}
				disabled={isSubmitting}
			>
				{isSubmitting ? (
					<LoadingIcon />
				) : loginError ? (
					<span className="font-bold uppercase text-sm">
						{loginError}
					</span>
				) : (
					'Logar'
				)}
			</button>
		</form>
	);
}
