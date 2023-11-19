import { WorkStatus } from '@/utils/WorkStatus';
import { WorkTableRow } from './Row';

interface IWork {
	id: string;
	client: {
		name: string;
		avatar: string | null;
	};
	price: number;
	status: keyof typeof WorkStatus;
	created_at: string;
}

interface IWorkTableProps {
	works: IWork[];
}

export function WorkTable({ works }: IWorkTableProps) {
	return (
		<table className="w-full rounded-md border-separate border-spacing-y-4">
			<thead>
				<tr>
					<th></th>
					<th className="p-4 uppercase text-lg text-white">
						Cliente
					</th>
					<th className="p-4 uppercase text-lg text-white">Preço</th>
					<th className="p-4 uppercase text-lg text-white">Status</th>
					<th className="p-4 uppercase text-lg text-white">Data</th>
					<th className="p-4 uppercase text-lg"></th>
				</tr>
			</thead>

			<tbody>
				{works.map(work => (
					<WorkTableRow
						key={work.id}
						{...work}
						url={`/work/${work.id}`}
					/>
				))}
			</tbody>
		</table>
	);
}
