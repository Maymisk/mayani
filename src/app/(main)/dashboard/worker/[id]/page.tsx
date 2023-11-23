import { AnnualIncomeGraph } from '@/components/dashboard/AnnualncomeGraph';
import { MonthlyWorksGraph } from '@/components/dashboard/MonthlyWorksGraph';
import { OverallRatingCard } from '@/components/dashboard/OverallRatingCard';
import { SummarizedData } from '@/components/dashboard/SummarizedData';
import { UserRatings } from '@/components/dashboard/UserRatings';
import { WorkTable } from '@/components/dashboard/WorkTable';
import { getDashboardData } from './fetch';

interface IDashboardProps {
	params: {
		id: string;
	};
}

export default async function Dashboard({ params: { id } }: IDashboardProps) {
	const {
		name,
		isSubscribed,
		ratings,
		ratingsByStars,
		works,
		annualIncome,
		monthlyIncome,
	} = await getDashboardData(id);

	return (
		<main>
			<h1 className="text-white text-4xl font-bold mb-1">
				Olá {name}, esse é seu painel
			</h1>

			<span className="text-white font-thin text-lg mb-6 block">
				Informações sobre sua atividade na plataforma
			</span>

			<section className="w-full flex gap-12">
				<div className="w-full">
					<SummarizedData
						amountOfRatings={ratings.amount}
						amountOfWorks={works.amount}
						subscriptionType={isSubscribed}
					/>

					<AnnualIncomeGraph
						income={monthlyIncome}
						totalIncome={annualIncome}
					/>

					<div className="flex justify-center gap-6 mt-12">
						<MonthlyWorksGraph {...works.statuses} />
						<OverallRatingCard
							rating={ratings.stars}
							ratingsByStars={ratingsByStars}
							hasRatings={ratings.sample.length > 0}
						/>
					</div>
				</div>

				<UserRatings id={id} ratings={ratings.sample} />
			</section>

			<section className="w-full mt-16">
				<h2 className="text-2xl text-white font-bold mb-4">
					Histórico de Trabalhos
				</h2>

				{works.sample.length > 0 ? (
					<WorkTable works={works.sample} />
				) : (
					<div className="text-xl text-gray-600 uppercase font-bold flex items-center justify-center">
						Sem trabalhos
					</div>
				)}
			</section>
		</main>
	);
}
