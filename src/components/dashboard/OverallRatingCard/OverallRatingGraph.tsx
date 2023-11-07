'use client';

import { CategoryScale } from 'chart.js/auto';
import { Chart } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { StarIcon } from '@heroicons/react/24/solid';

Chart.register(CategoryScale);

export function OverallRatingGraph() {
	const data = [3, 4, 2, 8, 12];

	return (
		<div className="max-w-[200px]">
			<Doughnut
				data={{
					datasets: [
						{
							label: 'AVALIAÇÕES',
							data,
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
