import { workOfferStatusColors } from '@/utils/WorkOfferStatusColors';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { WorkOfferStatus } from '@root/supabase/workOfferStatus';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface IWorkOfferInfoProps {
	title: string;
	status: WorkOfferStatus;
	price: number;
	created_at: string;
}

export function WorkOfferInfo({
	title,
	status,
	price,
	created_at,
}: IWorkOfferInfoProps) {
	return (
		<div className="w-full flex flex-col justify-between overflow-hidden">
			<div className="flex flex-col items-start">
				<h2 className="w-full whitespace-nowrap overflow-hidden text-ellipsis text-3xl text-white font-bold capitalize">
					{title}
				</h2>

				<span
					className={`uppercase text-lg ${workOfferStatusColors[status]}`}
				>
					{status}
				</span>
			</div>

			<div className="flex flex-col items-start justify-center">
				<span className="text-white">
					{format(new Date(created_at), "dd 'de' MMMM 'de' yyyy", {
						locale: ptBR,
					})}
				</span>

				<span className="font-bold text-green400 text-2xl">
					{currencyFormatter.format(price / 100)}
				</span>
			</div>
		</div>
	);
}
