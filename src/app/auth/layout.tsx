import { Metadata } from 'next';
import Image from 'next/image';
import { ReactNode } from 'react';

interface IAuthLayout {
	children: ReactNode;
}

export const metadata: Metadata = {
	title: 'Job Connect',
	icons: ['/favicon.png'],
};

export default function AuthLayout({ children }: IAuthLayout) {
	return (
		<main className="flex flex-col justify-evenly items-center h-screen mt-0">
			<Image
				src={'/favicon.png'}
				alt="Job Connect Logo"
				width={200}
				height={200}
				className="w-auto h-auto"
				priority
			/>

			{children}
		</main>
	);
}
