export enum Status {
	FINISHED = 'FINISHED',
	PENDING = 'PENDING',
	CANCELED = 'CANCELED',
}

type StatusColors = Record<Status, string>;

export const StatusColors: StatusColors = {
	FINISHED: 'text-green400',
	PENDING: 'text-yellow-400',
	CANCELED: 'text-danger',
};
