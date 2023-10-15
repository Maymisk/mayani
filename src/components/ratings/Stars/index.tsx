import { StarIcon } from '@heroicons/react/24/solid';

interface IStarsProps {
	rating: number;
}

export function Stars({ rating }: IStarsProps) {
	const rounded = Math.round(rating);

	return (
		<div className="flex justify-center gap-1 ">
			{new Array(5).fill(0).map((_, index) => {
				return (
					<StarIcon
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
				{rounded}
			</span>
		</div>
	);
}
