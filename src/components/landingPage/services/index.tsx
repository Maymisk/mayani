import Image from 'next/image';
import Link from 'next/link';

export function Services() {
	return (
		<section className="mt-36 p-8">
			<h1 className="text-4xl font-bold text-center hover:scale-105 transition-all">
				Nossos Serviços
			</h1>

			<span className="w-full text-center block mt-4 font-extralight">
				Explore os diversos serviços que oferecemos
			</span>

			<div className="mt-20 flex items-center justify-evenly">
				<Image
					src={'https://github.com/maymisk.png'}
					alt="App screenshot"
					width={400}
					height={200}
					className="rounded-md"
				/>

				<div className="h-[200px] flex flex-col gap-5">
					<h2 className="text-3xl font-bold hover:scale-105 transition-all">
						Conecte-se com profissionais especializados
					</h2>

					<span className="block font-light w-full">
						Encontre os melhores profissionais na sua área com
						apenas alguns cliques.
					</span>

					<Link
						href={'/auth/signUp'}
						className="block border-blue700 border-2 text-blue700 hover:border-blue500 hover:text-blue500 hover:scale-105 transition-all px-4 py-2 rounded-sm mt-auto w-max"
					>
						Encontrar profissionais
					</Link>
				</div>
			</div>
		</section>
	);
}
