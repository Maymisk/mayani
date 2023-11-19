import Link from 'next/link';
import { ProfileButton } from './ProfileButton';

export function Navbar() {
	return (
		<nav className="w-full z-10 fixed top-0 right-0 flex items-center justify-between font-bold text-xl bg-gray500 text-white px-12 py-6 border-b-4 border-gray400">
			<h1 className="text-3xl hover:scale-105 transition-all">
				JobConnect
			</h1>

			<ul className="w-[40%] text-xl flex items-center justify-around">
				<li className="hover:text-blue700 hover:scale-105 transition-all">
					<Link href="/home">Home</Link>
				</li>

				<li className="hover:text-blue700 hover:scale-105 transition-all">
					<Link href="">Sobre nós</Link>
				</li>

				<li className="hover:text-blue700 hover:scale-105 transition-all">
					<Link href="">Contate-nos</Link>
				</li>

				<ProfileButton />
			</ul>
		</nav>
	);
}
