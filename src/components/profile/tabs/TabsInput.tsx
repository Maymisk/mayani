'use client';

import { InputHTMLAttributes, Ref, forwardRef } from 'react';

interface ITabsInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'ref'> {
	label: string;
	error?: string;
}

function InputComponent(
	{ label, error, ...rest }: ITabsInputProps,
	ref: Ref<HTMLInputElement>
) {
	return (
		<div className="w-full mb-6">
			<label className="text-white font-bold text-sm uppercase">
				{label}
			</label>

			<input
				ref={ref}
				{...rest}
				className="w-full p-3 bg-transparent text-gray300 outline-none focus:outline-none border-2 border-gray500 rounded-md transition-all placeholder:text-gray-500 placeholder:font-extralight hover:border-blue500 focus:border-blue500"
			/>
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

export const TabsInput = forwardRef(InputComponent);
