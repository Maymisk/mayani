'use client';

import { FormEvent, useState } from 'react';
import { validate } from './validation';

export function LoginForm() {
	const [user, setUser] = useState<string>('');
	const [userError, setUserError] = useState<string>('');

	const [password, setPassword] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');

	async function handleOnSubmit(event: FormEvent) {
		event.preventDefault();

		const error = await validate({ email: user, password });

		if (error) {
			if (error.path === 'email') setUserError(error.message);
			else setPasswordError(error.message);

			return;
		}

		console.log(user, password);
	}

	return (
		<form
			onSubmit={handleOnSubmit}
			className="w-full h-full flex flex-col gap-2"
		>
			<label className="text-danger font-bold">{userError}</label>
			<input
				type="email"
				required
				value={user}
				onChange={e => {
					if (userError.length > 0) setUserError('');
					setUser(e.target.value);
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

			<button
				type="submit"
				className="w-full h-12 bg-blue500 hover:bg-blue700 transition-all mt-auto rounded-sm font-bold"
			>
				Logar
			</button>
		</form>
	);
}
