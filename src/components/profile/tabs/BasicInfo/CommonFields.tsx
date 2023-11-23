'use client';

import { TabsInput } from '../TabsInput';
import { useFormContext } from 'react-hook-form';

export function CommonFields() {
	const { register } = useFormContext();

	return (
		<>
			<div className="flex gap-4">
				<TabsInput
					label="Nome"
					type="text"
					autoComplete="off"
					placeholder="Digite seu nome.."
					{...register('name')}
				/>

				<TabsInput
					label="Nome de usuário"
					type="text"
					autoComplete="off"
					placeholder="Digite seu nome de usuário.."
					{...register('username')}
				/>
			</div>

			<TabsInput
				label="Localização"
				type="text"
				autoComplete="off"
				placeholder="Cidade, País"
				{...register('location')}
			/>
		</>
	);
}
