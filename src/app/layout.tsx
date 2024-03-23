import { FacebookPixel } from '@/components/Pixel';
import { ToastProvider } from '@/components/global/toast/ToastProvider';
import { AuthContextProvider } from '@/contexts/auth/AuthContext';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
const nunito = Nunito({
	subsets: ['latin'],
	weight: ['200', '300', '400', '700', '900'],
});

export const metadata: Metadata = {
	title: 'Mayani',
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
			<body className={`bg-gray500 ${nunito.className}`}>
				<AuthContextProvider>
					<ToastProvider>{children}</ToastProvider>
				</AuthContextProvider>

				<FacebookPixel />
			</body>
		</html>
	);
}
