import { AuthContextProvider } from '@/contexts/auth/AuthContext';
import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { ReactNode } from 'react';

const nunito = Nunito({
	subsets: ['latin'],
	weight: ['200', '300', '400', '700', '900'],
});

export const metadata: Metadata = {
	title: 'Job Connect',
	icons: [
		{
			url: '/favicon.png',
			rel: 'icon',
		},
	],
};

interface IRootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps) {
	return (
		<html lang="en">
			<AuthContextProvider>
				<body className={`bg-gray500 ${nunito.className}`}>
					{children}
				</body>
			</AuthContextProvider>
		</html>
	);
}
