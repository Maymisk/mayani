import { POSTLogic } from './POST';
import { PUTLogic } from './PUT';

export async function POST(request: Request) {
	return await POSTLogic(request);
}

export async function PUT(request: Request) {
	return await PUTLogic(request);
}
