import { AdvantageCard } from './AdvantageCard';

export function Advantages() {
	return (
		<section className="mt-36 bg-gray400 p-8 flex flex-col items-center justify-center rounded-sm gap-4">
			<h1 className="text-4xl font-bold hover:scale-105 transition-all">
				Por que escolher o JobConnect?
			</h1>

			<span className="block font-light">
				Nós oferecemos mais do que apenas conexões
			</span>

			<div className="grid grid-cols-2 gap-6 mt-4">
				<AdvantageCard
					title="Profissionais Verificados"
					detailing="Nós garantimos que nossos profissionais são certificados e tem experiência."
					link="a"
				/>
				<AdvantageCard
					title="Profissionais Verificados"
					detailing="Nós garantimos que nossos profissionais são certificados e tem experiência."
					link="a"
				/>
				<AdvantageCard
					title="Profissionais Verificados"
					detailing="Nós garantimos que nossos profissionais são certificados e tem experiência."
					link="a"
				/>
			</div>
		</section>
	);
}
