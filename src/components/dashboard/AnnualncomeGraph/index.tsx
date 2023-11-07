'use client';

import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import { Chart } from 'chart.js/auto';

Chart.register(CategoryScale);

export function AnnualIncomeGraph() {
	return (
		<div className="w-full mt-8 p-8 rounded-2xl border-2 border-gray400">
			<h2 className="text-2xl font-bold mb-4 text-center text-white">
				Renda Anual
			</h2>

			<Line
				datasetIdKey="id"
				data={{
					labels: [
						'Janeiro',
						'Fevereiro',
						'Março',
						'Abril',
						'Maio',
						'Junho',
						'Julho',
						'Agosto',
						'Setembro',
						'Outubro',
						'Novembro',
						'Dezembro',
					],
					datasets: [
						{
							label: '',
							data: [1, 4, 3, 4, 2],
							borderColor: '#4EA8DE',
							borderWidth: 2,
							pointBackgroundColor: 'black',
							backgroundColor: '#4EA8DE',
							borderCapStyle: 'round',
							hoverBorderColor: 'black',
							tension: 0.25,
						},
					],
				}}
			/>
		</div>
	);
}
