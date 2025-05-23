import Image from 'next/image';
import Link from 'next/link';

export function LandingPageBanner() {
	return (
		<section className="flex max-xl:flex-col items-center justify-between">
			<div className="max-xl:flex flex-col items-center">
				<h1 className="text-7xl font-bold max-xl:text-5xl max-xl:text-center">
					Bem-vindo ao Mayani
				</h1>

				<span className="block mt-6 w-3/4 max-xl:text-center">
					Conectando você aos profissionais qualificados mais próximos
					de você.
				</span>

				<Link
					href={'/auth/signUp'}
					className="px-4 py-2 mt-14 border-blue700 border-2 w-max text-blue700 hover:scale-105 hover:text-blue500 hover:border-blue500 transition-all block rounded-sm"
				>
					Começar
				</Link>

				<span className="text-sm block mt-4 w-1/2 text-blue100 font-extralight max-xl:text-center">
					Junte-se a nós hoje e encontre o profissional certo para o
					seu trabalho.
				</span>
			</div>

			<Image
				src={'/person_hiring.svg'}
				alt="Illustration of a person hiring a professional"
				width={700}
				height={700}
			/>
		</section>
	);
}
