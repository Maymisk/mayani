// api to use the Fake database (json server)

interface IWork {
	id: string;
	title: string;
	tag: string;
	description: string;
	banner_url: string;
}

interface IRating {
	id: string;
	title: string;
	description: string;
	rating: number;
}

interface IUser {
	name: string;
	bio: string;
	occupation: string;
	avatar_url: string;
	works: IWork[];
	ratings: IRating[];
}

export const api = new (class {
	private baseUrl: string;

	constructor() {
		this.baseUrl = 'http://localhost:5555';
	}

	async get(path: string, init?: RequestInit | undefined): Promise<any> {
		const response = await fetch(this.baseUrl + path, init);
		const data = await response.json();

		return data;
	}

	async post(path: string, payload: any) {}
})();
