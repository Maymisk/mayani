interface IRating {
	id: string;
	description: string | null;
	stars: number;
	users: {
		workers: {
			name: string;
			worker_profiles: {
				avatar: string | null;
			};
		};
	};
}

export function formatRatings(ratingsData: IRating[]) {
	let sum = 0;
	const ratingsByStars = new Array(6).fill(0);

	const formattedRatings = ratingsData.map(rating => {
		const {
			stars,
			users: {
				workers: {
					name,
					worker_profiles: { avatar },
				},
			},
			...rest
		} = rating;

		sum += stars;
		ratingsByStars[Math.round(stars)]++;

		const author = {
			name,
			avatar,
		};

		return {
			...rest,
			stars,
			author,
		};
	});

	const ratings = {
		stars: Math.round(sum / ratingsData.length) || 0,
		sample: formattedRatings,
		amount: ratingsData.length,
	};

	return {
		ratings,
		ratingsByStars,
	};
}
