'use client';

import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

Chart.register(CategoryScale);

interface IMonthlyWorksGraphProps {
	finished: number;
	pending: number;
	canceled: number;
}

export function MonthlyWorksGraph({
	finished,
	pending,
	canceled,
}: IMonthlyWorksGraphProps) {
	const data = [finished, pending, canceled];
	const total = finished + pending + canceled;

	return (
		<div className="w-full p-6 rounded-3xl flex flex-col items-center gap-4 border-2 border-gray400">
			<h2 className="text-xl text-white uppercase font-bold text-center">
				Trabalhos do mês atual
			</h2>

			{total > 0 ? (
				<div>
					<Pie
						data={{
							labels: [
								`${Math.round(
									(finished * 100) / total
								)}% - CONCLUÍDOS`,
								`${Math.round(
									(pending * 100) / total
								)}% PENDENTES`,
								`${Math.round(
									(canceled * 100) / total
								)}% CANCELADOS`,
							],
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
			) : (
				<div className="flex items-center justify-center text-gray-600 text-xl font-bold uppercase">
					Sem trabalhos no mês atual
				</div>
			)}
		</div>
	);
}
