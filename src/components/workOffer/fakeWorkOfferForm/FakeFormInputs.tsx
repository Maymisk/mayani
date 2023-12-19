import { Input } from '@/components/global/inputs/Input';
import { TextArea } from '@/components/global/inputs/TextArea';
import { formatISO9075 } from 'date-fns';

interface IFakeWorkOfferFormInputsProps {
	title: string;
	description: string | null;
	price: number;
	start_date: string;
}

export function FakeWorkOfferFormInputs({
	title,
	description,
	price,
	start_date,
}: IFakeWorkOfferFormInputsProps) {
	return (
		<>
			<Input type="text" label="Título" value={title} disabled readOnly />

			<TextArea
				label="Descrição"
				placeholder="Sem descrição"
				value={description || ''}
				disabled
				readOnly
			/>

			<div className="w-full flex items-start gap-2">
				<Input type="number" label="Preço" value={price / 100} />

				<Input
					type="datetime-local"
					label="Data de início"
					value={formatISO9075(new Date(start_date))}
				/>
			</div>
		</>
	);
}
