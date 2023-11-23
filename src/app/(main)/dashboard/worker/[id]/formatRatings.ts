interface IProfile {
	avatar: string | null;
}

interface IRating {
	id: string;
	description: string | null;
	stars: number;
	users: {
		name: string;
		worker_profiles: IProfile | null;
		client_profiles: IProfile | null;
	};
}

export function formatRatings(ratingsData: IRating[]) {
	let sum = 0;
	const ratingsByStars = new Array(6).fill(0);

	const formattedRatings = ratingsData.map(rating => {
		const {
			stars,
			users: { name, worker_profiles, client_profiles },
			...rest
		} = rating;

		sum += stars;
		ratingsByStars[Math.round(stars)]++;

		const author = {
			name,
			avatar: worker_profiles
				? worker_profiles.avatar
				: client_profiles!.avatar,
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
