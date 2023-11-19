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
								'#E25858',
								'#ffa739',
								'#FACC15',
								'#53ba83',
								'#1E6F9F',
							],
						},
					],
				}}
			/>
		</div>
	);
}
