import { FinishWorkButton } from './FinishWorkButton';
import { WorkInfo } from './WorkInfo';
import { WorkUserCard } from './WorkUserCard';

interface IUser {
	auth_id: string;
	name: string;
	avatar: string | null;
	rating: number;
}

interface IWorkCardProps {
	id: string;
	title: string;
	description: string | null;
	price: number;
	end_date: string | null;
	created_at: string;
	client: IUser;
	worker: IUser;
}

export function WorkCard({
	id,
	title,
	description,
	price,
	end_date,
	created_at,
	client,
	worker,
}: IWorkCardProps) {
	return (
		<div className="min-h-[500px] w-full max-w-4xl border-2 border-gray400 rounded-lg p-6 flex flex-col">
			<WorkInfo
				title={title}
				price={price}
				created_at={created_at}
				end_date={end_date}
			/>

			<p className="mt-4 text-justify text-white">{description}</p>

			<section className="mt-auto flex justify-between items-center gap-4 max-xl:flex-col max-xl:mt-8">
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

			{!end_date && (
				<FinishWorkButton work_id={id} client_id={client.auth_id} />
			)}
		</div>
	);
}
