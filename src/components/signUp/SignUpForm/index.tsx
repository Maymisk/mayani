'use client';

import { useAuth } from '@/contexts/AuthContext';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from './Input';
import { validation } from './validation';

interface IOnSubmitData {
	email: string;
	password: string;
	passwordConfirmation: string;
}

export function SignUpForm() {
	const { signUp } = useAuth();

	const {
		register,
		handleSubmit,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: yupResolver(validation) });

	const [signUpError, setSignUpError] = useState('');

	async function onSubmit({
		email,
		password,
		passwordConfirmation,
	}: IOnSubmitData) {
		if (password != passwordConfirmation) return;

		const error = await signUp({
			email,
			password,
			name: 'Khalil Bohner',
			username: 'a',
			type: 'workers',
		});

		if (error) setSignUpError('Erro');
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full flex flex-col flex-1 gap-4 mt-2"
		>
			<div>
				<Input
					type="text"
					required
					autoComplete="off"
					{...register('email')}
					onChange={() => clearErrors()}
					placeholder="Digite seu email"
				/>
				<p
					className={`text-danger font-bold text-sm text-left mt-1 ${
						errors.email ? 'block' : 'hidden'
					}`}
				>
					{errors.email?.message}
				</p>
			</div>

			<div>
				<Input
					type="password"
					required
					{...register('password')}
					onChange={() => clearErrors()}
					placeholder="Digite sua senha"
				/>
				<p
					className={`text-danger font-bold text-sm ${
						errors.password?.message ? 'block' : 'hidden'
					} text-left mt-1`}
				>
					{errors.password?.message}
				</p>
			</div>

			<div>
				<Input
					type="password"
					required
					{...register('passwordConfirmation')}
					onChange={() => clearErrors()}
					placeholder="Confirme sua senha"
				/>
				<p
					className={`text-danger font-bold text-sm ${
						errors.passwordConfirmation?.message
							? 'block'
							: 'hidden'
					} text-left mt-1`}
				>
					{errors.passwordConfirmation?.message}
				</p>
			</div>

			<button
				type="submit"
				className="w-full h-12 bg-blue500 hover:bg-blue700 hover:text-white transition-all mt-auto rounded-sm font-bold flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
				disabled={isSubmitting}
				onClick={() => setSignUpError('')}
			>
				{isSubmitting ? (
					<WrenchScrewdriverIcon
						width={25}
						height={25}
						className="text-gray400 animate-spin"
					/>
				) : signUpError ? (
					signUpError
				) : (
					'Criar Conta'
				)}
			</button>
		</form>
	);
}
