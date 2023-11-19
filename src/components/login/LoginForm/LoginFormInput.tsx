'use client';

import { Ref, forwardRef, InputHTMLAttributes } from 'react';

interface IInputComponentProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'ref'> {
	error?: string;
}

function InputComponent(
	{ error, ...rest }: IInputComponentProps,
	ref: Ref<HTMLInputElement>
) {
	return (
		<div>
			<input
				ref={ref}
				{...rest}
				className="w-full p-3 bg-transparent text-gray-400 outline-none focus:outline-none border-2 border-gray500 rounded-md transition-all placeholder:text-gray-400 placeholder:font-extralight hover:border-blue500 focus:border-blue500"
			/>

			<p
				className={`text-danger font-bold mt-1 ${
					error ? 'block' : 'hidden'
				}`}
			>
				{error}
			</p>
		</div>
	);
}

export const LoginFormInput = forwardRef(InputComponent);
