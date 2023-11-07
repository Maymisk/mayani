import Image from 'next/image';
import Link from 'next/link';
import { StatusColors, Status } from './status';
import { currencyFormatter } from '@/utils/currencyFormatter';

interface IWorkTableRowProps {
	client: {
		name: string;
		avatar: string;
	};
	price: number;
	status: keyof typeof Status;
	date: string;
	url: string;
}

export function WorkTableRow({
	client,
	status,
	price,
	date,
	url,
}: IWorkTableRowProps) {
	return (
		<tr className="text-white">
			<td className="p-2 flex items-center justify-center rounded-l-xl border-l-2 border-y-2 border-gray400">
				<Image
					src={client.avatar}
					alt="Client profile picutre"
					width={50}
					height={50}
					className="rounded-full"
				/>
			</td>
			<td className="p-2 text-center border-y-2 border-gray400">
				{client.name}
			</td>
			<td className="p-2 text-center border-y-2 border-gray400 font-bold">
				{currencyFormatter.format(price)}
			</td>
			<td
				className={`p-2 text-center ${StatusColors[status]} border-y-2 border-gray400 font-bold`}
			>
				{status}
			</td>
			<td className="p-2 text-center border-y-2 border-gray400">
				{date}
			</td>
			<td className="p-2 text-center rounded-r-xl border-y-2 border-r-2 border-gray400">
				<Link
					href={url}
					className="text-blue700 text-sm font-bold uppercase hover:text-blue500 transition-all"
				>
					Ver serviço
				</Link>
			</td>
		</tr>
	);
}
