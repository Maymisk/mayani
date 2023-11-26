'use client';

import { Chart } from 'chart.js';
import { CategoryScale } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

Chart.register(CategoryScale);

interface IOverallRatingGraph {
	ratingsByStars: number[];
}

export function OverallRatingGraph({ ratingsByStars }: IOverallRatingGraph) {
	return (
		<div className="max-w-[200px]">
			<Doughnut
				data={{
					datasets: [
						{
							label: 'AVALIAÇÕES',
							data: ratingsByStars,
							backgroundColor: [
								'#1E6F9F',
								'#53ba83',
								'#FACC15',
								'#ffa739',
								'#E25858',
							],
						},
					],
				}}
			/>
		</div>
	);
}
