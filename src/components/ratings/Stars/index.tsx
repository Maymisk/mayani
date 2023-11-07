import { StarIcon } from '@heroicons/react/24/solid';

interface IStarsProps {
	stars: number;
}

export function Stars({ stars }: IStarsProps) {
	const rounded = Math.round(stars);

	return (
		<div className="flex justify-center gap-1 ">
			{new Array(5).fill(0).map((_, index) => {
				return (
					<StarIcon
						key={index}
						width={20}
						height={20}
						className={`${
							index + 1 <= rounded
								? 'text-blue700 hover:text-blue500'
								: 'text-gray-600 hover:text-gray-800'
						} transition-all`}
					/>
				);
			})}

			<span className="block mt-[-1px] ml-1 text-white font-bold">
				{stars.toFixed(1)}
			</span>
		</div>
	);
}
