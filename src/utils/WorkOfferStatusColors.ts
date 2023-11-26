import { WorkOfferStatus } from '@root/supabase/workOfferStatus';

type WorkOfferStatusColors = Record<WorkOfferStatus, string>;

export const workOfferStatusColors: WorkOfferStatusColors = {
	ACCEPTED: 'text-green400',
	PENDING: 'text-yellow-400',
	DECLINED: 'text-danger',
} as const;
