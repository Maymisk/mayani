import { WorkCard } from '../WorkCard';

interface IWork {
	id: string;
	title: string;
	tag: string;
	description: string;
	banner_url: string;
}

interface IWorksProps {
	works: IWork[];
}

export function Works({ works }: IWorksProps) {
	return (
		<section className="text-blue100 mt-12">
			<h2 className="text-2xl mb-4">Trabalhos prévios</h2>

			<ul className="grid grid-cols-1">
				{works?.map(work => (
					<WorkCard key={work.id} {...work} />
				))}
			</ul>
		</section>
	);
}
