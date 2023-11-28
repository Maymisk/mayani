'use client';

import { workOfferStatusColors } from '@/utils/WorkOfferStatusColors';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatISO9075 } from 'date-fns';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { WorkOfferFormInputs } from './Inputs';
import { WorkOfferUserInfo } from './WorkOfferUserInfo';
import { createWork } from './createWork';
import { createWorkOffer } from './createWorkOffer';
import { IFormData, IWorkOfferFormProps } from './types';
import { validation } from './validation';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/global/toast';

export function WorkOfferForm({ author, offer }: IWorkOfferFormProps) {
	const formattedDate = formatISO9075(new Date(offer.start_date));

	const router = useRouter();
	const [errorToastIsOpen, setErrorToastIsOpen] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting, defaultValues },
	} = useForm<IFormData>({
		resolver: yupResolver(validation),
		defaultValues: {
			price: offer.price / 100,
			start_date: formattedDate as any,
		},
	});

	const price = watch('price', offer.price / 100);
	const start_date = watch('start_date', formattedDate as any);

	async function onSubmit() {
		const isOffer = !areTheSame(defaultValues, { price, start_date });

		let response = null;
		if (isOffer)
			response = await createWorkOffer(offer, { price, start_date });
		else response = await createWork(offer, author.auth_id);

		if (response.status != 201) setErrorToastIsOpen(true);
		else router.refresh();
	}

	return (
		<form
			className="w-full max-w-xl mx-auto py-6 px-4 bg-gray400 rounded-md flex flex-col gap-4 items-center justify-center shadow-lg shadow-black"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h3
				className={`text-2xl font-bold ${
					workOfferStatusColors[offer.status]
				} mb-4`}
			>
				{offer.status}
			</h3>

			<WorkOfferUserInfo
				{...author}
				authorIsWorker={author.auth_id === offer.worker_id}
			/>

			<WorkOfferFormInputs
				title={offer.title}
				description={offer.description}
				register={register}
				errors={errors}
			/>

			<button
				type="submit"
				className="w-full h-12 flex items-center justify-center hover:bg-blue500 text-white font-bold rounded-lg bg-blue700 transition-all disabled:brightness-75 disabled:hover:bg-blue700 disabled:cursor-not-allowed"
				disabled={isSubmitting}
			>
				{areTheSame(defaultValues, { price, start_date })
					? 'Aceitar'
					: 'Fazer Contraproposta'}
			</button>

			<Toast
				title="ERRO"
				description="Houve um erro durante o envio do formulário."
				onOpenChange={setErrorToastIsOpen}
				open={errorToastIsOpen}
			/>
		</form>
	);
}

function areTheSame(object1: any, object2: any) {
	const keys = Object.keys(object1);

	for (const key of keys)
		if (!object2[key] || object1[key] != object2[key]) return false;

	return true;
}
