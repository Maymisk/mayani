import { PricingCard } from '@/components/pricing/PricingCard';

export default function Pricing() {
	return (
		<main className="flex flex-col justify-center items-center gap-4 text-white">
			<h1 className="text-4xl hover:scale-105 transition-all">
				Preço acessível para todos
			</h1>

			<span className="font-extralight hover:scale-105 transition-all">
				O JobConnect oferece diferentes planos de acordo com suas
				necessidades
			</span>

			<section className="grid grid-cols-2 items-center gap-8 mt-8">
				<PricingCard
					title="Verificado"
					description="O plano base para quem deseja publicar seus serviços na plataforma. Ganhe acesso à publicação de anúncios e à comunidade JobConnect."
					price={50}
					image="/verified.svg"
				/>
				<PricingCard
					title="Premium"
					description="O plano premium te dá uma vantagem competitiva no algoritmo de recomendação de profissionais. Aliado com suas competências e avaliações positivas, seu alcance de mercado irá decolar."
					price={100}
					image="/premium.svg"
				/>
			</section>
		</main>
	);
}
