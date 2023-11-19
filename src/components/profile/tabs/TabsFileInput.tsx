import { InputHTMLAttributes, Ref, forwardRef } from 'react';

interface ITabsFileInputProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'className' | 'ref' | 'type' | 'id'
	> {
	id: string;
	label: string;
	error?: string;
}

function InputComponent(
	{ id, label, error, ...rest }: ITabsFileInputProps,
	ref: Ref<HTMLInputElement>
) {
	return (
		<div className="w-full flex items-center">
			<label
				htmlFor={id}
				className="w-full text-center p-3 bg-transparent text-gray300 outline-none focus:outline-none border-2 border-gray500 rounded-md transition-all hover:border-blue500 focus:border-blue500 cursor-pointer"
			>
				{label}
			</label>

			<input id={id} ref={ref} {...rest} type="file" className="hidden" />

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

export const TabsFileInput = forwardRef(InputComponent);
