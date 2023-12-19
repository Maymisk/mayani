import Link from 'next/link';

export function Footer() {
	return (
		<footer
			id="mainFooter"
			className="w-full flex max-md:flex-col max-md:gap-12 items-start justify-evenly text-white bg-gray500 border-y-2 border-y-gray400 px-8 py-8 mt-20 mb-8"
		>
			<Link
				href="https://storyset.com/"
				className="uppercase font-bold hover:text-blue700 transition-all text-sm"
			>
				Illustrations by Storyset
			</Link>

			<div>
				<h3 className="uppercase font-bold text-xl hover:text-blue700 transition-all">
					A empresa
				</h3>
				<ul className="mt-4 flex flex-col gap-4">
					<li className="hover:text-blue700 transition-all font-extralight">
						<Link href={'#'}>Sobre</Link>
					</li>

					<li className="hover:text-blue700 transition-all font-extralight">
						<Link href={'#'}>Clientes</Link>
					</li>

					<li className="hover:text-blue700 transition-all font-extralight">
						<Link href={'#'}>Contate-nos</Link>
					</li>
				</ul>
			</div>

			<div>
				<h3 className="uppercase font-bold text-xl hover:text-blue700 transition-all">
					A plataforma
				</h3>
				<ul className="mt-4 flex flex-col gap-4">
					<li className="hover:text-blue700 transition-all font-extralight">
						<Link href={'#'}>Funcionalidades</Link>
					</li>

					<li className="hover:text-blue700 transition-all font-extralight">
						<Link href={'/pricing'}>Preços</Link>
					</li>

					<li className="hover:text-blue700 transition-all font-extralight">
						<Link href={'#'}>Perguntas Frequentes</Link>
					</li>
				</ul>
			</div>

			<div>
				<h3 className="uppercase font-bold text-xl hover:text-blue700 transition-all">
					Conecte-se
				</h3>
			</div>
		</footer>
	);
}
