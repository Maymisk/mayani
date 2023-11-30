import Image from 'next/image';

export function NoRatings() {
	return (
		<section className="w-full flex flex-col items-center gap-20 mt-12">
			<h2 className="text-white text-3xl font-bold brightness-50 text-center">
				Oops... Não encontramos avaliações para esse usuário 🥺
			</h2>
		</section>
	);
}
