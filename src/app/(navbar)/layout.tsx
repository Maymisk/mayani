import { Navbar } from '@/components/navbar';
import { ReactNode } from 'react';

interface INavbarLayoutProps {
	children: ReactNode;
}

export default function NavbarLayout({ children }: INavbarLayoutProps) {
	return (
		<header className="h-20">
			<Navbar />

			{children}
		</header>
	);
}
