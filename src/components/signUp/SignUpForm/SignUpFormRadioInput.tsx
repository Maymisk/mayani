'use client';

import { UserIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { Root, Item } from '@radix-ui/react-radio-group';

interface ISignUpFormRadioInput {
	value: string;
	onChange(value: string): void;
	error?: string;
}

export function SignUpFormRadioInput({
	value,
	onChange,
	error,
}: ISignUpFormRadioInput) {
	return (
		<div className="w-full">
			<Root
				value={value}
				onValueChange={onChange}
				defaultChecked={false}
				className="w-full flex gap-4"
			>
				<Item
					value={'workers'}
					className={`w-full border-2 border-gray500 rounded-md flex items-center justify-center gap-2 text-blue700 px-8 py-4 uppercase font-bold hover:bg-blue500 hover:text-gray400 transition-all max-xl:text-sm max-xl:px-4 ${
						value === 'workers' && 'bg-blue500 text-gray400'
					}`}
				>
					<WrenchScrewdriverIcon width={24} height={24} />
					Prestador
				</Item>

				<Item
					value="clients"
					className={`w-full border-2 border-gray500 rounded-md flex items-center justify-center gap-2 text-blue700 px-8 py-4 uppercase font-bold hover:bg-blue500 hover:text-gray400 transition-all max-xl:text-sm max-xl:px-4 ${
						value === 'clients' && 'bg-blue500 text-gray400'
					}`}
				>
					<UserIcon width={24} height={24} />
					Cliente
				</Item>
			</Root>

			<p
				className={`text-danger font-bold text-sm text-left mt-1 ${
					error ? 'block' : 'hidden'
				}`}
			>
				{error}
			</p>
		</div>
	);
}
