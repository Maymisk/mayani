import { WorkTableRow } from './Row';

export function WorkTable() {
	return (
		<table className="w-full rounded-md border-separate border-spacing-y-4">
			<thead>
				<th></th>
				<th className="p-4 uppercase text-lg text-white">Cliente</th>
				<th className="p-4 uppercase text-lg text-white">Preço</th>
				<th className="p-4 uppercase text-lg text-white">Status</th>
				<th className="p-4 uppercase text-lg text-white">Data</th>
				<th className="p-4 uppercase text-lg"></th>
			</thead>

			<tbody>
				<WorkTableRow
					client={{
						name: 'John Doe',
						avatar: 'https://github.com/maymisk.png',
					}}
					price={1000}
					status="PENDING"
					date="13/03/2023"
					url="#"
				/>
				<WorkTableRow
					client={{
						name: 'John Doe',
						avatar: 'https://github.com/maymisk.png',
					}}
					price={1000}
					status="PENDING"
					date="13/03/2023"
					url="#"
				/>
				<WorkTableRow
					client={{
						name: 'John Doe',
						avatar: 'https://github.com/maymisk.png',
					}}
					price={1000}
					status="PENDING"
					date="13/03/2023"
					url="#"
				/>
				<WorkTableRow
					client={{
						name: 'John Doe',
						avatar: 'https://github.com/maymisk.png',
					}}
					price={1000}
					status="PENDING"
					date="13/03/2023"
					url="#"
				/>
			</tbody>
		</table>
	);
}
