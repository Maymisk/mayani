export const api = new (class {
	private baseUrl: string;

	constructor() {
		this.baseUrl = 'http://localhost:3000/api';
	}

	async get(path: string, options?: Omit<RequestInit, 'method'>) {
		const response = await fetch(this.baseUrl + path, options);

		return await response.json();
	}

	async post(
		path: string,
		data: any,
		options?: Omit<RequestInit, 'method' | 'body'>
	) {
		const response = await fetch(this.baseUrl + path, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			...options,
		});

		const body = await response.json();

		return {
			...body,
			status: response.status,
		};
	}

	async put(
		path: string,
		data: any,
		options?: Omit<RequestInit, 'method' | 'body'>
	) {
		const response = await fetch(this.baseUrl + path, {
			body: JSON.stringify(data),
			method: 'PUT',
			...options,
		});

		const body = await response.json();

		return {
			...body,
			status: response.status,
		};
	}
})();
