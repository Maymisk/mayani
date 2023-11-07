import { StarIcon } from '@heroicons/react/24/solid';

export function GraphLabel() {
	return (
		<ul className="w-full flex items-center justify-center gap-4 mt-auto text-white">
			<li className="flex gap-1 font-bold hover:translate-y-[-4px] transition-all">
				1{' '}
				<StarIcon
					className="text-danger font-bold"
					width={20}
					height={20}
				/>
			</li>

			<li className="flex gap-1 font-bold hover:translate-y-[-4px] transition-all">
				2{' '}
				<StarIcon
					className="text-[#ffa739] font-bold"
					width={20}
					height={20}
				/>
			</li>

			<li className="flex gap-1 font-bold hover:translate-y-[-4px] transition-all">
				3{' '}
				<StarIcon
					className="text-yellow-400 font-bold"
					width={20}
					height={20}
				/>
			</li>

			<li className="flex gap-1 font-bold hover:translate-y-[-4px] transition-all">
				4{' '}
				<StarIcon
					className="text-green400 font-bold"
					width={20}
					height={20}
				/>
			</li>

			<li className="flex gap-1 font-bold hover:translate-y-[-4px] transition-all">
				5{' '}
				<StarIcon
					className="text-blue700 font-bold"
					width={20}
					height={20}
				/>
			</li>
		</ul>
	);
}
