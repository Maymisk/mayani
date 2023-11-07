'use client';

import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(CategoryScale);

export function MonthlyWorksGraph() {
	// calcular as porcentagens de cada dado e modificar as labels
	const data = [10, 20, 30];

	return (
		<div className="w-full p-6 rounded-3xl flex flex-col items-center gap-4 border-2 border-gray400">
			<h2 className="text-xl text-white uppercase font-bold text-center">
				Trabalhos do mês atual
			</h2>

			<div>
				<Pie
					data={{
						labels: ['36% - CONCLUÍDOS', 'PENDENTES', 'CANCELADOS'],
						datasets: [
							{
								data,
								backgroundColor: [
									'#1E6F9F',
									'#FACC15',
									'#E25858',
								],
							},
						],
					}}
				/>
			</div>
		</div>
	);
}
