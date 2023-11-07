'use client';

import { FormEvent, useState } from 'react';
import { validation } from './validation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@root/supabase/databaseTypes';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';

interface IOnSubmitData {
	email: string;
	password: string;
}

export function LoginForm() {
	const { signIn } = useAuth();

	const {
		register,
		handleSubmit,
		clearErrors,
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
			className="w-full h-full flex flex-col gap-4 mt-1"
		>
			<div>
				<input
					type="email"
					required
					autoComplete="off"
					{...register('email')}
					onChange={() => clearErrors()}
					className="w-full p-3 bg-transparent text-gray-400 outline-none focus:outline-none border-2 border-gray500 rounded-md transition-all placeholder:text-gray-400 placeholder:font-extralight hover:border-blue500 focus:border-blue500"
					placeholder="Digite seu email"
				/>

				<p
					className={`text-danger font-bold mt-1 ${
						errors.email ? 'block' : 'hidden'
					}`}
				>
					{errors.email?.message}
				</p>
			</div>

			<div>
				<input
					type="password"
					required
					{...register('password')}
					onChange={() => clearErrors()}
					className="w-full p-3 bg-transparent text-gray-400 outline-none focus:outline-none border-2 border-gray500 rounded-md transition-all placeholder:text-gray-400 placeholder:font-extralight hover:border-blue500 focus:border-blue500"
					placeholder="Digite sua senha"
				/>

				<p
					className={`text-danger font-bold mt-1 ${
						errors.password ? 'block' : 'hidden'
					}`}
				>
					{errors.password?.message}
				</p>
			</div>

			<button
				type="submit"
				className="w-full h-12 bg-blue500 hover:bg-blue700 hover:text-white transition-all mt-auto rounded-sm font-bold flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
				onClick={() => setLoginError('')}
				disabled={isSubmitting}
			>
				{isSubmitting ? (
					<WrenchScrewdriverIcon
						width={25}
						height={25}
						className="text-gray400 animate-spin"
					/>
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
