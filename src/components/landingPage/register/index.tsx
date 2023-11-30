import Link from 'next/link';

export function Register() {
	return (
		<section className="mt-36 bg-gray400 p-12 rounded-sm">
			<div className="flex flex-col items-center justify-center gap-8 border-2 border-blue700 rounded-lg py-16">
				<h1 className="text-4xl font-bold hover:scale-105 transition-all w-1/2 text-center">
					Preparado para encontrar o profissional certo para seu
					trabalho?
				</h1>

				<span className="block font-light">
					Registre-se no Mayani hoje
				</span>

				<Link
					href={'/auth/signUp'}
					className="block bg-blue700 text-blue100 font-bold hover:scale-110 hover:bg-blue500 transition-all px-4 py-2 rounded-sm mt-16"
				>
					Registrar
				</Link>
			</div>
		</section>
	);
}
