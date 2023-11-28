import { WorkOfferUserInfo } from '../workOfferForm/WorkOfferUserInfo';
import { IWorkOfferFormProps } from '../workOfferForm/types';
import { FakeWorkOfferFormInputs } from './FakeFormInputs';
import { workOfferStatusColors } from '@/utils/WorkOfferStatusColors';

export function FakeWorkOfferForm({ author, offer }: IWorkOfferFormProps) {
	return (
		<form className="w-full max-w-xl mx-auto py-6 px-4 bg-gray400 rounded-md flex flex-col gap-4 items-center justify-center shadow-lg shadow-black">
			<h3
				className={`text-2xl font-bold ${
					workOfferStatusColors[offer.status]
				} mb-4`}
			>
				{offer.status}
			</h3>

			<WorkOfferUserInfo
				{...author}
				authorIsWorker={author.auth_id === offer.worker_id}
			/>

			<FakeWorkOfferFormInputs {...offer} />

			<button
				type="submit"
				className="w-full h-12 flex items-center justify-center hover:bg-blue500 text-white font-bold rounded-lg bg-blue700 transition-all disabled:brightness-75 disabled:hover:bg-blue700 disabled:cursor-not-allowed"
				disabled
			>
				Essa oferta já foi concluída.
			</button>
		</form>
	);
}
