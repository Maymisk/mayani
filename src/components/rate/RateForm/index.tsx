'use client';

import { Input } from '@/components/global/inputs/Input';
import { TextArea } from '@/components/global/inputs/TextArea';
import { StarInput } from './StarInput';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validation } from './validation';
import { LoadingIcon } from '@/components/loadingIcon';
import { useAuth } from '@/contexts/auth/AuthContext';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';

interface IFormData {
	title: string;
	description?: string;
	rating: string;
}

interface IRateFormProps {
	rated_id: string;
	work_id: string;
	token: string;
}

export function RateForm({ rated_id, work_id, token }: IRateFormProps) {
	const router = useRouter();
	const { user } = useAuth();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting, isValid },
	} = useForm<IFormData>({ resolver: yupResolver(validation) });

	async function onSubmit({ title, description, rating }: IFormData) {
		const response = await api.post('/rating', {
			title,
			description,
			rating,
			author_id: user?.auth_id,
			rated_id,
			work_id,
			token,
		});

		if (response.status === 201) router.refresh();
	}

	return (
		<form
			className="w-full max-w-xl bg-gray400 p-8 rounded-lg flex flex-col items-center gap-8 shadow-md shadow-black"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				label="Título"
				type="text"
				required
				error={errors.title?.message}
				{...register('title')}
			/>

			<TextArea
				label="Descrição"
				error={errors.description?.message}
				{...register('description')}
			/>

			<Controller
				render={({ field: { value, onChange } }) => (
					<StarInput value={value} onChange={onChange} />
				)}
				name="rating"
				control={control}
			/>

			<button
				className="w-1/2 font-bold text-white bg-blue700 p-4 rounded-lg uppercase hover:brightness-125 transition-all disabled:brightness-75 disabled:cursor-not-allowed flex items-center justify-center"
				disabled={isSubmitting || !isValid}
			>
				{isSubmitting ? <LoadingIcon /> : 'Enviar'}
			</button>
		</form>
	);
}
