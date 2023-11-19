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
			clients: {
				Row: {
					avatar: string | null;
					created_at: string;
					id: string;
					location: string | null;
					name: string;
					username: string;
				};
				Insert: {
					avatar?: string | null;
					created_at?: string;
					id?: string;
					location?: string | null;
					name: string;
					username: string;
				};
				Update: {
					avatar?: string | null;
					created_at?: string;
					id?: string;
					location?: string | null;
					name?: string;
					username?: string;
				};
				Relationships: [];
			};
			ratings: {
				Row: {
					authorId: string;
					created_at: string;
					description: string | null;
					id: string;
					ratedId: string;
					stars: number;
					title: string;
					workId: string;
				};
				Insert: {
					authorId: string;
					created_at?: string;
					description?: string | null;
					id?: string;
					ratedId: string;
					stars: number;
					title: string;
					workId: string;
				};
				Update: {
					authorId?: string;
					created_at?: string;
					description?: string | null;
					id?: string;
					ratedId?: string;
					stars?: number;
					title?: string;
					workId?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'ratings_authorId_fkey';
						columns: ['authorId'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'ratings_ratedId_fkey';
						columns: ['ratedId'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'ratings_workId_fkey';
						columns: ['workId'];
						isOneToOne: false;
						referencedRelation: 'works';
						referencedColumns: ['id'];
					}
				];
			};
			users: {
				Row: {
					clientId: string | null;
					id: string;
					workerId: string | null;
				};
				Insert: {
					clientId?: string | null;
					id: string;
					workerId?: string | null;
				};
				Update: {
					clientId?: string | null;
					id?: string;
					workerId?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'users_clientId_fkey';
						columns: ['clientId'];
						isOneToOne: true;
						referencedRelation: 'clients';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'users_id_fkey';
						columns: ['id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'users_workerId_fkey';
						columns: ['workerId'];
						isOneToOne: true;
						referencedRelation: 'workers';
						referencedColumns: ['id'];
					}
				];
			};
			worker_profiles: {
				Row: {
					avatar: string | null;
					bio: string | null;
					id: string;
					location: string | null;
					occupation:
						| Database['public']['Enums']['occupationType']
						| null;
					resume: string | null;
					workerId: string;
				};
				Insert: {
					avatar?: string | null;
					bio?: string | null;
					id?: string;
					location?: string | null;
					occupation?:
						| Database['public']['Enums']['occupationType']
						| null;
					resume?: string | null;
					workerId: string;
				};
				Update: {
					avatar?: string | null;
					bio?: string | null;
					id?: string;
					location?: string | null;
					occupation?:
						| Database['public']['Enums']['occupationType']
						| null;
					resume?: string | null;
					workerId?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'worker_profiles_workerId_fkey';
						columns: ['workerId'];
						isOneToOne: true;
						referencedRelation: 'workers';
						referencedColumns: ['id'];
					}
				];
			};
			workers: {
				Row: {
					created_at: string;
					id: string;
					isSubscribed:
						| Database['public']['Enums']['subscriptionType']
						| null;
					isVerified: boolean;
					name: string;
					username: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					isSubscribed?:
						| Database['public']['Enums']['subscriptionType']
						| null;
					isVerified?: boolean;
					name: string;
					username: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					isSubscribed?:
						| Database['public']['Enums']['subscriptionType']
						| null;
					isVerified?: boolean;
					name?: string;
					username?: string;
				};
				Relationships: [];
			};
			works: {
				Row: {
					clientId: string;
					created_at: string;
					description: string | null;
					end_date: string | null;
					id: string;
					price: number;
					start_date: string;
					title: string;
					workerId: string;
				};
				Insert: {
					clientId: string;
					created_at?: string;
					description?: string | null;
					end_date?: string | null;
					id?: string;
					price: number;
					start_date: string;
					title: string;
					workerId: string;
				};
				Update: {
					clientId?: string;
					created_at?: string;
					description?: string | null;
					end_date?: string | null;
					id?: string;
					price?: number;
					start_date?: string;
					title?: string;
					workerId?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'works_clientId_fkey';
						columns: ['clientId'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'works_workerId_fkey';
						columns: ['workerId'];
						isOneToOne: false;
						referencedRelation: 'workers';
						referencedColumns: ['id'];
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
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
