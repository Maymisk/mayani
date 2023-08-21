'use client';

import { FormEvent, useState } from 'react';
import { validate } from './validation';

export function SignUpForm() {
	const [email, setEmail] = useState<string>('');
	const [emailError, setEmailError] = useState<string>('');

	const [password, setPassword] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');

	const [passwordMatch, setPasswordMatch] = useState<string>('');
	const [passwordMatchError, setPasswordMatchError] = useState<string>('');

	async function handleOnSubmit(event: FormEvent) {
		event.preventDefault();

		const error = await validate({
			email,
			password,
			passwordConfirmation: passwordMatch,
		});

		if (error) {
			const message = error.message;

			if (error.path === 'email') setEmailError(message);
			else if (error.path === 'password') setPasswordError(message);
			else setPasswordMatchError(message);

			return;
		}

		console.log(email, password);
	}

	return (
		<form
			onSubmit={handleOnSubmit}
			className="w-full flex flex-col flex-1 gap-2"
		>
			<label className="text-danger font-bold">{emailError}</label>
			<input
				type="text"
				required
				value={email}
				onChange={e => {
					if (emailError.length > 0) setEmailError('');
					setEmail(e.target.value);
				}}
				className="h-12 rounded-sm py-1 px-4 bg-gray focus:outline-none bg-blue100 hover:bg-gray300 transition-all placeholder:text-black font-bold"
				placeholder="Digite seu email"
			/>

			<label className="text-danger font-bold">{passwordError}</label>
			<input
				type="password"
				required
				value={password}
				onChange={e => {
					if (passwordError.length > 0) setPasswordError('');
					setPassword(e.target.value);
				}}
				className="h-12 rounded-sm py-1 px-4 bg-blue100 focus:outline-none hover:bg-gray300 transition-all text-black placeholder:text-black font-bold"
				placeholder="Digite sua senha"
			/>

			<label className="text-danger font-bold">
				{passwordMatchError}
			</label>
			<input
				type="password"
				required
				value={passwordMatch}
				onChange={e => {
					if (passwordMatchError.length > 0)
						setPasswordMatchError('');
					setPasswordMatch(e.target.value);
				}}
				className="h-12 rounded-sm py-1 px-4 bg-blue100 focus:outline-none hover:bg-gray300 transition-all text-black placeholder:text-black font-bold"
				placeholder="Confirme sua senha"
			/>

			<button
				type="submit"
				className="w-full h-12 bg-blue500 hover:bg-blue700 transition-all mt-auto rounded-sm font-bold"
			>
				Criar conta
			</button>
		</form>
	);
}
