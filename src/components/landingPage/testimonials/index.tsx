import Link from 'next/link';
import { TestimonialCard } from './TestimonialCard';

export function Testimonials() {
	return (
		<section className="flex flex-col items-center gap-4 mt-36 max-xl:mx-2">
			<h1 className="text-4xl font-bold hover:scale-105 transition-all max-xl:text-center">
				O que nossos usuários dizem
			</h1>

			<span className="block font-light">
				Ouça de nossos clientes satisfeitos
			</span>

			<TestimonialCard author="Khaled" detailing="Muito bom o serviço" />

			<Link
				href={'/auth/signUp'}
				className="block border-blue700 border-2 text-blue700 hover:border-blue500 hover:text-blue500 hover:scale-105 transition-all px-4 py-2 rounded-sm mt-16"
			>
				Entrar na comunidade
			</Link>
		</section>
	);
}
