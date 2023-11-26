import { WorkOfferStatus } from '@root/supabase/workOfferStatus';

interface IAuthor {
	auth_id: string;
	name: string;
	avatar: string | null;
	rating: number;
	location: string | null;
	isWorker: boolean;
}

export interface IOffer {
	id: string;
	title: string;
	description: string | null;
	price: number;
	status: WorkOfferStatus;
	start_date: string;
	client_id: string;
	worker_id: string;
}

export interface IWorkOfferFormProps {
	author: IAuthor;
	offer: IOffer;
}

export interface IFormData {
	price: number;
	start_date: Date;
}
