import { AnnualIncomeGraph } from '@/components/dashboard/AnnualncomeGraph';
import { MonthlyWorksGraph } from '@/components/dashboard/MonthlyWorksGraph';
import { OverallRatingCard } from '@/components/dashboard/OverallRatingCard';
import { SummarizedData } from '@/components/dashboard/SummarizedData';
import { UserRatings } from '@/components/dashboard/UserRatings';
import { WorkTable } from '@/components/dashboard/WorkTable';

interface IDashboardProps {
	params: {
		id: string;
	};
}

export default function Dashboard({ params }: IDashboardProps) {
	const { id } = params;

	return (
		<main>
			<h1 className="text-white text-4xl font-bold mb-1">
				Olá Khalil, esse é seu painel
			</h1>

			<span className="text-white font-thin text-lg mb-6 block">
				Informações sobre sua atividade na plataforma
			</span>

			<section className="w-full flex gap-12">
				<div className="w-full">
					<SummarizedData />

					<AnnualIncomeGraph />

					<div className="flex justify-center gap-6 mt-12">
						<MonthlyWorksGraph />
						<OverallRatingCard rating={2} />
					</div>
				</div>

				<UserRatings />
			</section>

			<section className="w-full mt-16">
				<h2 className="text-2xl text-white font-bold mb-4">
					Histórico de Trabalhos
				</h2>

				<WorkTable />
			</section>
		</main>
	);
}
