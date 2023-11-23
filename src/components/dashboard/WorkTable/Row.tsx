import Image from 'next/image';
import Link from 'next/link';
import { StatusColors, WorkStatus } from '../../../utils/WorkStatus';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { format } from 'date-fns';
import { FallbackAvatar } from '@/components/fallbackAvatar';

interface IWorkTableRowProps {
	client: {
		name: string;
		avatar: string | null;
	};
	price: number;
	status: keyof typeof WorkStatus;
	created_at: string;
	url: string;
}

export function WorkTableRow({
	client,
	status,
	price,
	created_at,
	url,
}: IWorkTableRowProps) {
	return (
		<tr className="text-white">
			<td className="p-2 flex items-center justify-center rounded-l-xl border-l-2 border-y-2 border-gray400">
				{client.avatar ? (
					<Image
						src={client.avatar}
						alt="Client profile picutre"
						width={50}
						height={50}
						className="rounded-full"
					/>
				) : (
					<FallbackAvatar
						width="w-[50px]"
						height="h-[50px]"
						name={client.name}
					/>
				)}
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
				{format(new Date(created_at), 'dd/MM/yyyy')}
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
