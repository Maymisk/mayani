export enum WorkStatus {
	FINISHED = 'FINISHED',
	PENDING = 'PENDING',
	CANCELED = 'CANCELED',
}

type WorkStatusColors = Record<WorkStatus, string>;

export const StatusColors: WorkStatusColors = {
	FINISHED: 'text-green400',
	PENDING: 'text-yellow-400',
	CANCELED: 'text-danger',
};
