import { FileInput } from '@/components/global/inputs/FileInput';
import { Input } from '@/components/global/inputs/Input';
import { TextArea } from '@/components/global/inputs/TextArea';
import { useFormContext } from 'react-hook-form';

export function WorkerFields() {
	const { register } = useFormContext();

	return (
		<>
			<TextArea
				label="biografia"
				placeholder="Digite sua biografia.."
				{...register('bio')}
			/>

			<div className="h-min flex items-end gap-4 max-xl:text-xs">
				<Input
					label="Ocupação"
					type="text"
					placeholder="Diga-nos seu trabalho"
					{...register('occupation')}
				/>

				<FileInput
					id="resumeInput"
					label="Envie seu currículo"
					accept="application/pdf"
					{...register('resume')}
				/>
			</div>
		</>
	);
}
