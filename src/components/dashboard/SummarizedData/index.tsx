import {
	ExclamationCircleIcon,
	EyeIcon,
	StarIcon,
	WrenchScrewdriverIcon,
} from '@heroicons/react/24/solid';
import { ListItem } from './ListItem';
import { isSubscribedType } from '@root/supabase/isSubscribed';

interface ISummarizedDataProps {
	amountOfWorks: number;
	amountOfRatings: number;
	subscriptionType: isSubscribedType;
}

export function SummarizedData({
	amountOfWorks,
	amountOfRatings,
	subscriptionType,
}: ISummarizedDataProps) {
	return (
		<div className="border-2 border-gray400 p-4 rounded-md">
			<ul className="flex items-center justify-around max-md:flex-col max-md:items-start max-md:gap-4">
				<ListItem
					title="Visitas no perfil"
					data={1000}
					Icon={<EyeIcon width={25} height={25} />}
					iconColor="gray200"
				/>

				<li className="w-[1px] h-10 bg-slate-500 max-md:hidden"></li>

				<ListItem
					title="Serviços feitos"
					data={amountOfWorks}
					Icon={<WrenchScrewdriverIcon width={25} height={25} />}
					iconColor="danger"
				/>

				<li className="w-[1px] h-10 bg-slate-500 max-md:hidden"></li>

				<ListItem
					title="Avaliações recebidas"
					data={amountOfRatings}
					Icon={<StarIcon width={25} height={25} />}
					iconColor="yellow-400"
				/>

				<li className="w-[1px] h-10 bg-slate-500 max-md:hidden"></li>

				<ListItem
					title="Inscrição"
					data={subscriptionType || 'Sem inscrição'}
					Icon={<ExclamationCircleIcon width={25} height={25} />}
					iconColor="blue700"
				/>
			</ul>
		</div>
	);
}
