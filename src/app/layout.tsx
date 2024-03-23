import { ToastProvider } from '@/components/global/toast/ToastProvider';
import { AuthContextProvider } from '@/contexts/auth/AuthContext';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Script from 'next/script';
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

				<Script id="fb-pixel" strategy="afterInteractive">
					{`
					!function(f,b,e,v,n,t,s)
					{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
					n.callMethod.apply(n,arguments):n.queue.push(arguments)};
					if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
					n.queue=[];t=b.createElement(e);t.async=!0;
					t.src=v;s=b.getElementsByTagName(e)[0];
					s.parentNode.insertBefore(t,s)}(window, document,'script',
					'https://connect.facebook.net/en_US/fbevents.js');
					fbq('init', '1262126871413263');
					fbq('track', 'PageView');
					<noscript>
						<img
							height="1"
							width="1"
							style="display:none"
							src="https://www.facebook.com/tr?id=1262126871413263&ev=PageView&noscript=1"
						/>
					</noscript>
					`}
				</Script>
			</body>
		</html>
	);
}
