import {
	ExclamationCircleIcon,
	EyeIcon,
	StarIcon,
	WrenchScrewdriverIcon,
} from '@heroicons/react/24/solid';
import { ListItem } from './ListItem';

export function SummarizedData() {
	return (
		<div className="border-2 border-gray400 p-4 rounded-md">
			<ul className="flex items-center justify-around">
				<ListItem
					title="Visitas no perfil"
					data={1000}
					Icon={<EyeIcon width={25} height={25} />}
					iconColor="gray200"
				/>

				<li className="w-[1px] h-10 bg-slate-500"></li>

				<ListItem
					title="Serviços feitos"
					data={1000}
					Icon={<WrenchScrewdriverIcon width={25} height={25} />}
					iconColor="danger"
				/>

				<li className="w-[1px] h-10 bg-slate-500"></li>

				<ListItem
					title="Avaliações recebidas"
					data={1000}
					Icon={<StarIcon width={25} height={25} />}
					iconColor="yellow-400"
				/>

				<li className="w-[1px] h-10 bg-slate-500"></li>

				<ListItem
					title="Inscrição"
					data="Premium"
					Icon={<ExclamationCircleIcon width={25} height={25} />}
					iconColor="blue700"
				/>
			</ul>
		</div>
	);
}
