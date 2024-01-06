import Medusa from '@medusajs/medusa-js';

import { dev } from '$app/environment';
import { MEDUSA_API_KEY, MEDUSA_BACKEND_URL } from '$env/static/private';
import { MedusaClient } from 'sveltekit-medusa-client';

export const medusa_sveltekit_client = new MedusaClient(
	dev ? 'http://localhost:9000' : MEDUSA_BACKEND_URL,
	{
		retry: 0,
		persistentCart: true,
		logLevel: 'silent',
		logFormat: 'json',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	}
);

export const medusa_client = new Medusa({
	baseUrl: dev ? 'http://localhost:9000' : MEDUSA_BACKEND_URL,
	maxRetries: 3,
	apiKey: MEDUSA_API_KEY
});

//https://github.com/medusajs/medusa/blob/develop/packages/utils/src/common/errors.ts#L28
const MedusaErrorTypes = {
	/** Errors stemming from the database */
	DB_ERROR: 'database_error',
	DUPLICATE_ERROR: 'duplicate_error',
	INVALID_ARGUMENT: 'invalid_argument',
	INVALID_DATA: 'invalid_data',
	UNAUTHORIZED: 'unauthorized',
	NOT_FOUND: 'not_found',
	NOT_ALLOWED: 'not_allowed',
	UNEXPECTED_STATE: 'unexpected_state',
	CONFLICT: 'conflict',
	PAYMENT_AUTHORIZATION_ERROR: 'payment_authorization_error'
};

const MedusaErrorCodes = {
	INSUFFICIENT_INVENTORY: 'insufficient_inventory',
	CART_INCOMPATIBLE_STATE: 'cart_incompatible_state'
};

type MedusaError = {
	response: {
		data: {
			type: keyof typeof MedusaErrorTypes;
			code: keyof typeof MedusaErrorCodes;
			message: string;
		};
	};
};
export function is_medusa_error(error: unknown): error is MedusaError {
	if (error instanceof Error) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const e = error as any;
		if (e.response && e.response.data && e.response.data.code) {
			const code = e.response.data.code as string;
			//error.response.data.code contains on of the error codes from MedusaErrorCodes
			return (
				Object.values(MedusaErrorCodes).includes(code) ||
				Object.values(MedusaErrorTypes).includes(code)
			);
		}
	}
	return false;
}
