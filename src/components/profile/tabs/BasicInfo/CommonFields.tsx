'use client';

import { Input } from '@/components/global/inputs/Input';
import { useFormContext } from 'react-hook-form';

export function CommonFields() {
	const { register } = useFormContext();

	return (
		<>
			<div className="flex gap-4">
				<Input
					label="Nome"
					type="text"
					autoComplete="off"
					placeholder="Digite seu nome.."
					{...register('name')}
				/>

				<Input
					label="Nome de usuário"
					type="text"
					autoComplete="off"
					placeholder="Digite seu nome de usuário.."
					{...register('username')}
				/>
			</div>

			<Input
				label="Localização"
				type="text"
				autoComplete="off"
				placeholder="Cidade, País"
				{...register('location')}
			/>
		</>
	);
}
