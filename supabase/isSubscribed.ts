import { Database } from './databaseTypes';

export type isSubscribedType =
	| Database['public']['Enums']['subscriptionType']
	| null;
