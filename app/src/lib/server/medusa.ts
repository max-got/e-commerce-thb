import Medusa from '@medusajs/medusa-js';

import { MEDUSA_API_KEY, MEDUSA_BACKEND_URL } from '$env/static/private';
import { MedusaClient } from 'sveltekit-medusa-client';

export const medusa_sveltekit_client = new MedusaClient(MEDUSA_BACKEND_URL, {
	retry: 0,
	persistentCart: true,
	logLevel: 'silent',
	logFormat: 'json',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	}
});

export const medusa_client = new Medusa({
	baseUrl: MEDUSA_BACKEND_URL,
	maxRetries: 3,
	apiKey: MEDUSA_API_KEY
});
