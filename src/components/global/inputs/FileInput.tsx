'use client';

import { InputHTMLAttributes, Ref, forwardRef, useState } from 'react';

interface IInputProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'className' | 'ref' | 'type' | 'id'
	> {
	id: string;
	label: string;
	error?: string;
}

function InputComponent(
	{ id, label, error, ...rest }: IInputProps,
	ref: Ref<HTMLInputElement>
) {
	const [value, setValue] = useState<string | null>(null);

	return (
		<div className="w-full flex items-center overflow-hidden whitespace-nowrap">
			<label
				htmlFor={id}
				className="w-full p-3 rounded-md bg-gray500 border-2 border-transparent focus:border-blue700 hover:border-blue700 outline-none text-gray-300 text-center font-extralight transition-all cursor-pointer text-ellipsis overflow-hidden"
			>
				{value ? value.slice(0, 50) : label}
			</label>

			<input
				id={id}
				ref={ref}
				{...rest}
				type="file"
				className="hidden"
				onChange={event => setValue(event.target.value)}
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

export const FileInput = forwardRef(InputComponent);
