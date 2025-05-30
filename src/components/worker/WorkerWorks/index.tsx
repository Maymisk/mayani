import { NoWorks } from '@/components/empty/NoWorks';
import { WorkCard } from './WorkCard';

interface IWork {
	id: string;
	title: string;
	description: string | null;
	users: {
		name: string;
	};
}

interface IWorksProps {
	works: IWork[];
}

export function WorkerWorks({ works }: IWorksProps) {
	return (
		<section className="text-blue100 mt-24">
			<h2 className="text-4xl mb-4">Trabalhos prévios</h2>

			<ul
				className={`gap-8 items-start ${
					works.length > 0 ? 'grid grid-cols-2' : 'flex flex-col'
				} max-xl:grid-cols-1`}
			>
				{works.length > 0 ? (
					works.map(work => <WorkCard key={work.id} {...work} />)
				) : (
					<NoWorks />
				)}
			</ul>
		</section>
	);
}
