'use client';

import { forwardRef, TextareaHTMLAttributes, Ref } from 'react';

interface ITextAreaComponentProps
	extends Omit<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		'className' | 'ref'
	> {
	label: string;
}

export function TextAreaComponent(
	{ label, ...rest }: ITextAreaComponentProps,
	ref: Ref<HTMLTextAreaElement>
) {
	return (
		<div className="w-full mb-2">
			<label className="text-white font-bold text-sm uppercase">
				{label}
			</label>

			<textarea
				ref={ref}
				className="w-full min-h-[52px] h-40 p-2 rounded-md bg-transparent border-2 border-gray500 focus:border-blue500 hover:border-blue500 outline-none placeholder:text-gray-500 text-white font-extralight transition-all mb-1"
				{...rest}
			/>
		</div>
	);
}

export const TabsTextArea = forwardRef(TextAreaComponent);
