import { StatusColors, WorkStatus } from '@/utils/WorkStatus';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { formatDistanceToNow, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface IWorkInfoProps {
	title: string;
	price: number;
	end_date: string | null;
	created_at: string;
}

export function WorkInfo({
	title,
	price,
	end_date,
	created_at,
}: IWorkInfoProps) {
	const status = end_date ? WorkStatus.FINISHED : WorkStatus.PENDING;
	const formattedPrice = currencyFormatter.format(price);
	const formattedCreationDate = formatDistanceToNow(new Date(created_at), {
		locale: ptBR,
		addSuffix: true,
	});
	const formattedEndDate =
		end_date &&
		format(new Date(end_date), "d 'de' MMMM 'de' yyyy", {
			locale: ptBR,
		});

	return (
		<div className="w-full flex items-start justify-between">
			<div className="w-full flex flex-col items-start">
				<h2 className="w-full text-2xl text-white font-bold capitalize max-md:text-xl">
					{title}
				</h2>

				<span
					className={`uppercase text-sm max-md:text-xs ${StatusColors[status]}`}
				>
					{status} &#128900;{' '}
					<span>
						{status === WorkStatus.PENDING
							? 'Sem data de término'
							: `Terminado em ${formattedEndDate}`}
					</span>
				</span>
			</div>

			<div className="w-full flex flex-col items-end justify-center">
				<span className="text-white max-md:text-xs max-md:text-center">
					{formattedCreationDate}
				</span>

				<span className="font-bold text-green400">
					{formattedPrice}
				</span>
			</div>
		</div>
	);
}
