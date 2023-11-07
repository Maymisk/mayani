export const ratingMap = {
	0: {
		color: 'text-danger',
		hover: 'hover:text-red-800',
		tag: 'PÉSSIMO',
	},
	1: {
		color: 'text-danger',
		hover: 'hover:text-red-800',
		tag: 'PÉSSIMO',
	},
	2: {
		color: 'text-[#fa6900]',
		hover: 'hover:text-orange-700',
		tag: 'RUIM',
	},
	3: {
		color: 'text-yellow-400',
		hover: 'hover:text-yellow-500',

		tag: 'MÉDIO',
	},
	4: {
		color: 'text-green400',
		hover: 'hover:text-green-400',
		tag: 'BOM',
	},
	5: {
		color: 'text-blue700',
		hover: 'hover:text-blue500',
		tag: 'PRESTADOR JOB CONNECT',
	},
};

export type RoundedRating = keyof typeof ratingMap;
