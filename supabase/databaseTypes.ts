export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			client_profiles: {
				Row: {
					avatar: string | null;
					client_id: string;
					created_at: string;
					id: string;
					location: string | null;
				};
				Insert: {
					avatar?: string | null;
					client_id: string;
					created_at?: string;
					id?: string;
					location?: string | null;
				};
				Update: {
					avatar?: string | null;
					client_id?: string;
					created_at?: string;
					id?: string;
					location?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'client_profiles_client_id_fkey';
						columns: ['client_id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['auth_id'];
					}
				];
			};
			notifications: {
				Row: {
					created_at: string;
					description: string;
					href: string | null;
					id: string;
					read_at: string | null;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					description: string;
					href?: string | null;
					id?: string;
					read_at?: string | null;
					user_id: string;
				};
				Update: {
					created_at?: string;
					description?: string;
					href?: string | null;
					id?: string;
					read_at?: string | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'notifications_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['auth_id'];
					}
				];
			};
			ratings: {
				Row: {
					author_id: string;
					author_rate_token: string;
					created_at: string;
					description: string | null;
					id: string;
					rated_id: string;
					stars: number;
					title: string;
					work_id: string;
				};
				Insert: {
					author_id: string;
					author_rate_token: string;
					created_at?: string;
					description?: string | null;
					id?: string;
					rated_id: string;
					stars: number;
					title: string;
					work_id: string;
				};
				Update: {
					author_id?: string;
					author_rate_token?: string;
					created_at?: string;
					description?: string | null;
					id?: string;
					rated_id?: string;
					stars?: number;
					title?: string;
					work_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'ratings_author_id_fkey';
						columns: ['author_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['auth_id'];
					},
					{
						foreignKeyName: 'ratings_rated_id_fkey';
						columns: ['rated_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['auth_id'];
					},
					{
						foreignKeyName: 'ratings_work_id_fkey';
						columns: ['work_id'];
						isOneToOne: false;
						referencedRelation: 'works';
						referencedColumns: ['id'];
					}
				];
			};
			users: {
				Row: {
					auth_id: string;
					created_at: string;
					id: string;
					isWorker: boolean;
					name: string;
					username: string;
				};
				Insert: {
					auth_id: string;
					created_at?: string;
					id?: string;
					isWorker: boolean;
					name: string;
					username: string;
				};
				Update: {
					auth_id?: string;
					created_at?: string;
					id?: string;
					isWorker?: boolean;
					name?: string;
					username?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'users_auth_id_fkey';
						columns: ['auth_id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			work_offers: {
				Row: {
					author_id: string;
					client_id: string;
					created_at: string;
					description: string | null;
					id: string;
					price: number;
					start_date: string;
					status: Database['public']['Enums']['workOfferStatus'];
					title: string;
					work_offer_id: string | null;
					worker_id: string;
				};
				Insert: {
					author_id: string;
					client_id: string;
					created_at?: string;
					description?: string | null;
					id?: string;
					price: number;
					start_date: string;
					status?: Database['public']['Enums']['workOfferStatus'];
					title: string;
					work_offer_id?: string | null;
					worker_id: string;
				};
				Update: {
					author_id?: string;
					client_id?: string;
					created_at?: string;
					description?: string | null;
					id?: string;
					price?: number;
					start_date?: string;
					status?: Database['public']['Enums']['workOfferStatus'];
					title?: string;
					work_offer_id?: string | null;
					worker_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'work_offers_author_id_fkey';
						columns: ['author_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['auth_id'];
					},
					{
						foreignKeyName: 'work_offers_client_id_fkey';
						columns: ['client_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['auth_id'];
					},
					{
						foreignKeyName: 'work_offers_work_offer_id_fkey';
						columns: ['work_offer_id'];
						isOneToOne: false;
						referencedRelation: 'work_offers';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'work_offers_worker_id_fkey';
						columns: ['worker_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['auth_id'];
					}
				];
			};
			worker_profiles: {
				Row: {
					avatar: string | null;
					bio: string | null;
					id: string;
					isSubscribed:
						| Database['public']['Enums']['subscriptionType']
						| null;
					isVerified: boolean;
					location: string | null;
					occupation:
						| Database['public']['Enums']['occupationType']
						| null;
					resume: string | null;
					worker_id: string;
				};
				Insert: {
					avatar?: string | null;
					bio?: string | null;
					id?: string;
					isSubscribed?:
						| Database['public']['Enums']['subscriptionType']
						| null;
					isVerified?: boolean;
					location?: string | null;
					occupation?:
						| Database['public']['Enums']['occupationType']
						| null;
					resume?: string | null;
					worker_id: string;
				};
				Update: {
					avatar?: string | null;
					bio?: string | null;
					id?: string;
					isSubscribed?:
						| Database['public']['Enums']['subscriptionType']
						| null;
					isVerified?: boolean;
					location?: string | null;
					occupation?:
						| Database['public']['Enums']['occupationType']
						| null;
					resume?: string | null;
					worker_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'worker_profiles_worker_id_fkey';
						columns: ['worker_id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['auth_id'];
					}
				];
			};
			works: {
				Row: {
					client_id: string;
					created_at: string;
					description: string | null;
					end_date: string | null;
					id: string;
					price: number;
					start_date: string;
					title: string;
					worker_id: string;
				};
				Insert: {
					client_id: string;
					created_at?: string;
					description?: string | null;
					end_date?: string | null;
					id?: string;
					price: number;
					start_date: string;
					title: string;
					worker_id: string;
				};
				Update: {
					client_id?: string;
					created_at?: string;
					description?: string | null;
					end_date?: string | null;
					id?: string;
					price?: number;
					start_date?: string;
					title?: string;
					worker_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'works_client_id_fkey';
						columns: ['client_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['auth_id'];
					},
					{
						foreignKeyName: 'works_worker_id_fkey';
						columns: ['worker_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['auth_id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			occupationType:
				| 'Plumber'
				| 'Electrician'
				| 'Carpenter'
				| 'Painter'
				| 'Mechanic'
				| 'Bricklayer'
				| 'Drywaller'
				| 'Welder'
				| 'Gardener'
				| 'Locksmith'
				| 'Housekeeper';
			subscriptionType: 'VERIFIED' | 'PREMIUM';
			workOfferStatus: 'PENDING' | 'DECLINED' | 'ACCEPTED';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
