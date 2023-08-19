import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { ReactNode } from 'react';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700', '900'] });

export const metadata: Metadata = {
	title: 'Job Connect',
	icons: ['favicon.png'],
};

interface IRootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps) {
	return (
		<html lang="en">
			<body className={`bg-gray500 ${nunito.className}`}>{children}</body>
		</html>
	);
}
