import { NoWorks } from '@/components/empty/NoWorks';
import { WorkCard } from './WorkCard';

interface IWork {
	id: string;
	title: string;
	tag?: string;
	description: string | null;
	banner_url?: string;
}

interface IWorksProps {
	works: IWork[];
}

export function WorkerWorks({ works }: IWorksProps) {
	return (
		<section className="text-blue100 mt-12">
			<h2 className="text-2xl mb-4">Trabalhos prévios</h2>

			<ul className="flex flex-col gap-4 items-start">
				{works.length > 0 ? (
					works.map(work => <WorkCard key={work.id} {...work} />)
				) : (
					<NoWorks />
				)}
			</ul>
		</section>
	);
}
