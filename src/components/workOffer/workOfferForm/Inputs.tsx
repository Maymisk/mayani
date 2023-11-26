import { Input } from '@/components/global/inputs/Input';
import { TextArea } from '@/components/global/inputs/TextArea';
import { useForm } from 'react-hook-form';
import { IFormData } from './types';

interface IWorkOfferFormInputsProps {
	title: string;
	description: string | null;
	register: ReturnType<typeof useForm<IFormData>>['register'];
	errors: ReturnType<typeof useForm<IFormData>>['formState']['errors'];
}

export function WorkOfferFormInputs({
	title,
	description,
	register,
	errors,
}: IWorkOfferFormInputsProps) {
	return (
		<>
			<Input
				type="text"
				placeholder="Digite o título do trabalho que deseja ser feito"
				label="Título"
				value={title}
				disabled
				readOnly
			/>

			<TextArea
				label="Descrição"
				placeholder="Descreva com riqueza de detalhes o trabalho a ser realizado"
				value={description || ''}
				disabled
				readOnly
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
					error={errors.start_date?.message}
					{...register('start_date')}
					autoComplete="off"
				/>
			</div>
		</>
	);
}
