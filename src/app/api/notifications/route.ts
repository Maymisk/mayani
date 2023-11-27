import { PUTLogic } from './PUT';

export async function PUT(request: Request) {
	return await PUTLogic(request);
}
