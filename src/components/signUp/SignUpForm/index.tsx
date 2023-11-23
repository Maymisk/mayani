'use client';

import { LoadingIcon } from '@/components/loadingIcon';
import { useAuth } from '@/contexts/auth/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { SignUpFormInput } from './SignUpFormInput';
import { validation } from './validation';
import { SignUpFormRadioInput } from './SignUpFormRadioInput';

interface IOnSubmitData {
	name: string;
	username: string;
	type: 'workers' | 'clients';
	email: string;
	password: string;
	passwordConfirmation: string;
}

export function SignUpForm() {
	const { signUp } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control,
		reset,
	} = useForm({ resolver: yupResolver(validation) });

	const [signUpError, setSignUpError] = useState('');

	async function onSubmit({
		name,
		username,
		type,
		email,
		password,
		passwordConfirmation,
	}: IOnSubmitData) {
		if (password != passwordConfirmation) return;

		const isWorker = type === 'workers';

		const response = await signUp({
			name,
			username,
			isWorker,
			email,
			password,
		});

		if (response.status != 201) setSignUpError('Erro');
		else reset();
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full flex flex-col flex-1 gap-4 mt-2"
		>
			<SignUpFormInput
				type="text"
				required
				autoComplete="off"
				{...register('name')}
				placeholder="Digite seu nome"
				error={errors.name?.message}
			/>

			<SignUpFormInput
				type="text"
				required
				autoComplete="off"
				{...register('username')}
				placeholder="Digite seu nome de usuário"
				error={errors.username?.message}
			/>

			<Controller
				name="type"
				render={({
					field: { onChange, value },
					formState: { errors },
				}) =>
					SignUpFormRadioInput({
						value,
						onChange,
						error: errors.type?.message,
					})
				}
				control={control}
			/>

			<SignUpFormInput
				type="email"
				required
				autoComplete="off"
				{...register('email')}
				placeholder="Digite seu email"
				error={errors.email?.message}
			/>

			<div className="flex gap-2">
				<SignUpFormInput
					type="password"
					required
					{...register('password')}
					placeholder="Digite sua senha"
					error={errors.password?.message}
				/>

				<SignUpFormInput
					type="password"
					required
					{...register('passwordConfirmation')}
					placeholder="Confirme sua senha"
					error={errors.passwordConfirmation?.message}
				/>
			</div>

			<button
				type="submit"
				className="w-full h-12 bg-blue500 hover:bg-blue700 hover:text-white transition-all mt-auto rounded-sm font-bold flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
				disabled={isSubmitting}
				onClick={() => setSignUpError('')}
			>
				{isSubmitting ? (
					<LoadingIcon />
				) : signUpError ? (
					<span className="uppercase">{signUpError}</span>
				) : (
					'Criar Conta'
				)}
			</button>
		</form>
	);
}
