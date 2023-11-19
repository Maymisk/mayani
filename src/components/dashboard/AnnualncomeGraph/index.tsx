'use client';

import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import { Chart } from 'chart.js/auto';
import { currencyFormatter } from '@/utils/currencyFormatter';

Chart.register(CategoryScale);

interface IAnnualIncomeGraphProps {
	income: number[];
	totalIncome: number;
}

export function AnnualIncomeGraph({
	income,
	totalIncome,
}: IAnnualIncomeGraphProps) {
	return (
		<div className="w-full mt-8 p-8 rounded-2xl border-2 border-gray400">
			<h2 className="text-2xl font-bold mb-4 text-center text-white">
				Renda Anual de {currencyFormatter.format(totalIncome)}
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
							data: income,
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
