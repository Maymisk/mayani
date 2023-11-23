import { Database } from './databaseTypes';

export type OccupationType = Database['public']['Enums']['occupationType'];

export const OccupationTypeEnum: Record<OccupationType, string> = {
	Bricklayer: 'Pedreiro',
	Carpenter: 'Carpinteiro',
	Drywaller: 'Gesseiro',
	Electrician: 'Eletricista',
	Gardener: 'Jardineiro',
	Housekeeper: 'Diarista',
	Locksmith: 'Chaveiro',
	Mechanic: 'Mecânico',
	Painter: 'Pintor',
	Plumber: 'Encanador',
	Welder: 'Soldador',
} as const;
