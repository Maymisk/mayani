'use client';

import { LoadingIcon } from '@/components/loadingIcon';
import { useFormContext } from 'react-hook-form';

export function BasicInfoFormButtons() {
	const {
		reset,
		formState: { isSubmitting, isDirty },
	} = useFormContext();

	return (
		<div className="flex items-center justify-center gap-4 mt-auto">
			<button
				type="button"
				className="bg-transparent px-8 py-4 border-2 border-blue500 rounded-md font-bold uppercase text-white flex-1 disabled:cursor-not-allowed disabled:brightness-[60%] max-md:px-6"
				disabled={!isDirty || isSubmitting}
				onClick={() => reset()}
			>
				Cancelar
			</button>

			<button
				type="submit"
				className="flex items-center justify-center flex-1 px-8 py-4 bg-blue500 rounded-md font-bold uppercase text-gray500 hover:bg-blue700 hover:text-white transition-all disabled:cursor-not-allowed disabled:brightness-75 disabled:hover:bg-blue500 disabled:hover:text-gray500 max-md:px-6"
				disabled={!isDirty || isSubmitting}
			>
				{isSubmitting ? <LoadingIcon /> : 'Salvar'}
			</button>
		</div>
	);
}
