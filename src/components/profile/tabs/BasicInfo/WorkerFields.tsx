import { useFormContext } from 'react-hook-form';
import { TabsFileInput } from '../TabsFileInput';
import { TabsInput } from '../TabsInput';
import { TabsTextArea } from '../TabsTextArea';

export function WorkerFields() {
	const { register } = useFormContext();

	return (
		<>
			<TabsTextArea
				label="biografia"
				placeholder="Digite sua biografia.."
				{...register('bio')}
			/>

			<div className="flex gap-4">
				<TabsInput
					label="Ocupação"
					type="text"
					placeholder="Diga-nos seu trabalho"
					{...register('occupation')}
				/>

				<TabsFileInput
					id="resumeInput"
					label="Envie seu currículo"
					accept="application/pdf"
					{...register('resume')}
				/>
			</div>
		</>
	);
}
