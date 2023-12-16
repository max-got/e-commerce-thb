import { type MedusaRequest, type MedusaResponse } from '@medusajs/medusa';

import { MedusaError } from '@medusajs/utils';
import ExtendedCartService from '../../../../../services/cart';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
	if (!req.user || !req.user.customer_id) {
		throw new MedusaError(
			MedusaError.Types.NOT_ALLOWED,
			'You are not allowed to access this resource'
		);
	}

	const cartService = req.scope.resolve<ExtendedCartService>('cartService');
	const cart = await cartService.retrieveByCustomerId(req.user.customer_id);
	res.json({ cart });
};
