import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { ReactNode } from 'react';

interface INavbarLayoutProps {
	children: ReactNode;
}

export default function MainLayout({ children }: INavbarLayoutProps) {
	return (
		<>
			<header>
				<Navbar />
			</header>

			{children}

			<Footer />
		</>
	);
}
