'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/global/inputs/Input';
import { TextArea } from '@/components/global/inputs/TextArea';
import { LoadingIcon } from '@/components/loadingIcon';
import { useAuth } from '@/contexts/auth/AuthContext';
import { api } from '@/services/api';
import { useState } from 'react';
import { validation } from './validation';
import { Toast } from '@/components/global/toast';

interface IOnSubmitData {
	title: string;
	description: string;
	price: number;
	date: Date;
}

interface IHireFormProps {
	worker: {
		id: string;
		name: string;
	};
}

export function HireForm({ worker }: IHireFormProps) {
	const { user } = useAuth();
	const [errorToastIsOpen, setErrorToastIsOpen] = useState(false);
	const [successToastIsOpen, setSuccessToastIsOpen] = useState(false);

	const {
		register,
		handleSubmit,
		clearErrors,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({ resolver: yupResolver(validation) });

	async function onSubmit({
		title,
		description,
		price,
		date,
	}: IOnSubmitData) {
		// create a toasts for each of the submission cases (success or errors)
		if (user?.auth_id === worker.id) {
			setErrorToastIsOpen(true);
			return;
		}

		const { error } = await api.post('/workOffer', {
			title,
			description,
			price: price * 100, // price must be in cents
			start_date: date.toISOString(),
			client_id: user!.auth_id,
			worker_id: worker.id,
			author_id: user!.auth_id,
		});

		if (error) setErrorToastIsOpen(true);
		else {
			clearErrors();
			reset();
			setSuccessToastIsOpen(true);
		}
	}

	return (
		<form
			className="w-full max-w-xl p-4 bg-gray400 rounded-md flex flex-col gap-4 items-center justify-center"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				type="text"
				placeholder="Digite o título do trabalho que deseja ser feito"
				label="Título"
				error={errors.title?.message}
				{...register('title')}
				autoComplete="off"
			/>

			<TextArea
				label="Descrição"
				error={errors.description?.message}
				placeholder="Descreva com riqueza de detalhes o trabalho a ser realizado"
				{...register('description')}
				autoComplete="off"
			/>

			<div className="w-full flex items-start gap-2">
				<Input
					type="number"
					label="Preço"
					placeholder="Digite o preço que deseja pagar"
					error={errors.price?.message}
					{...register('price')}
					autoComplete="off"
				/>

				<Input
					type="datetime-local"
					placeholder="Selecione a data que deseja que o serviço seja feito"
					label="Data de início"
					error={errors.date?.message}
					{...register('date')}
					autoComplete="off"
				/>
			</div>

			<button
				type="submit"
				className="w-full h-12 flex items-center justify-center hover:bg-blue500 text-white font-bold rounded-lg bg-blue700 transition-all disabled:bg-blue500 disabled:cursor-not-allowed"
				disabled={isSubmitting}
			>
				{isSubmitting ? <LoadingIcon /> : 'Fazer Oferta'}
			</button>

			<Toast
				open={errorToastIsOpen}
				onOpenChange={setErrorToastIsOpen}
				title="ERRO"
				description="Erro durante o envio do formulário."
			/>

			<Toast
				open={successToastIsOpen}
				onOpenChange={setSuccessToastIsOpen}
				title="Sucesso"
				description={`Oferta enviada para ${worker.name}`}
				success
			/>
		</form>
	);
}
