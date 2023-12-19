import { AdvantageCard } from './AdvantageCard';

export function Advantages() {
	return (
		<section className="mt-36 border-2 border-gray400 p-8 flex flex-col items-center justify-center rounded-xl gap-4 max-xl:mx-2">
			<h1 className="text-4xl font-bold hover:scale-105 transition-all">
				Por que escolher o Mayani?
			</h1>

			<span className="block font-light">
				Nós oferecemos mais do que apenas conexões
			</span>

			<div className="grid grid-cols-2 gap-6 mt-4 max-xl:grid-cols-1">
				<AdvantageCard
					title="Profissionais Verificados"
					detailing="Nós garantimos que nossos profissionais são certificados e tem experiência."
					link="a"
				/>
				<AdvantageCard
					title="Poucos cliques"
					detailing="O processo de contratação usando o Mayani é simples e dinâmico, requer poucos cliques."
					link="a"
				/>
				<AdvantageCard
					title="Preços Negociáveis"
					detailing="O Mayani oferece uma ampla gama de prestadores com diferentes faixas de preço, oferecendo suporte para negociação."
					link="a"
				/>
			</div>
		</section>
	);
}
