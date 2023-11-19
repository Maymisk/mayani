import { WorkUserCard } from '@/components/work/UserCard';
import { WorkInfo } from '@/components/work/WorkInfo';
import { getWork } from './fetch';

interface IWorkProps {
	params: {
		id: string;
	};
}

export default async function Work({ params: { id } }: IWorkProps) {
	const { work, client, worker } = await getWork(id);
	const { title, description, price, start_date, end_date, created_at } =
		work;

	return (
		<main className="max-w-4xl border-2 border-gray400 rounded-lg p-6 ">
			<WorkInfo
				title={title}
				price={price}
				created_at={created_at}
				end_date={end_date}
			/>

			<p className="mt-4 text-justify text-white">{description}</p>

			<section className="mt-8 flex justify-between items-center gap-4">
				<div className="w-full">
					<h3 className="text-blue700 font-bold uppercase">
						Contratante
					</h3>

					<WorkUserCard {...client} />
				</div>

				<div className="w-full">
					<h3 className="text-blue700 font-bold uppercase">
						Prestador
					</h3>

					<WorkUserCard {...worker} />
				</div>
			</section>
		</main>
	);
}
