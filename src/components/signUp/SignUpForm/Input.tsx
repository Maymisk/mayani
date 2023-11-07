import { InputHTMLAttributes } from 'react';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;

export function Input(props: InputProps) {
	return (
		<input
			{...props}
			className="w-full p-3 bg-transparent text-gray-400 outline-none focus:outline-none border-2 border-gray500 rounded-md transition-all placeholder:text-gray-400 placeholder:font-extralight hover:border-blue500 focus:border-blue500"
		/>
	);
}
