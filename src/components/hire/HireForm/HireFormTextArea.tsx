'use client';

import { forwardRef, TextareaHTMLAttributes, Ref } from 'react';

interface ITextAreaComponentProps
	extends Omit<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		'className' | 'ref'
	> {
	label: string;
	error?: string;
}

export function TextAreaComponent(
	{ label, error, ...rest }: ITextAreaComponentProps,
	ref: Ref<HTMLTextAreaElement>
) {
	return (
		<div className="w-full mb-2">
			<label className="text-white font-bold mb-1 uppercase">
				{label}
			</label>

			<textarea
				ref={ref}
				className="w-full min-h-[44px] h-40 p-2 rounded-md bg-gray500 border-2 border-transparent focus:border-blue700 hover:border-blue700 outline-none placeholder:text-gray-500 text-white font-extralight transition-all mb-1"
				{...rest}
			/>

			{error && <p className="font-bold text-sm text-danger">{error}</p>}
		</div>
	);
}

export const HireFormTextArea = forwardRef(TextAreaComponent);
