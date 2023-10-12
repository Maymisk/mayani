import Link from 'next/link';
import { ProfileIcon } from './ProfileIcon';

export function Navbar() {
	const user = 'user';

	return (
		<nav className="flex items-center justify-between font-bold text-xl bg-white px-12 py-6">
			<span className="text-2xl hover:scale-105 transition-all">
				JobConnect
			</span>

			<ul className="w-[30%] flex items-center justify-around">
				<li className="hover:text-blue700 hover:scale-105 transition-all">
					<Link href="/home">Home</Link>
				</li>

				<li className="hover:text-blue700 hover:scale-105 transition-all">
					<Link href="">Sobre nós</Link>
				</li>

				<li className="hover:text-blue700 hover:scale-105 transition-all">
					<Link href="">Contate-nos</Link>
				</li>

				<li className="hover:text-blue700 hover:scale-105 transition-all">
					{user ? (
						<Link href="">
							<ProfileIcon
								profile_picture={
									'https://github.com/maymisk.png'
								}
							/>
						</Link>
					) : (
						// profile icon will be a client component later on
						<Link
							href="/auth/login"
							className="border-2 border-blue500 p-3 rounded-sm hover:text-blue700 hover:border-blue700 transition-all"
						>
							Fazer Login
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
}
