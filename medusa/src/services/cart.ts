import { Cart, CartService, buildQuery } from '@medusajs/medusa';
import { MedusaError } from '@medusajs/utils';
import { IsNull, MoreThan, Not } from 'typeorm';

class ExtendedCartService extends CartService {
	async retrieveByCustomerId(customerId: string): Promise<Cart> {
		if (!customerId) {
			throw new MedusaError(
				MedusaError.Types.INVALID_DATA,
				`"customerId" must be defined`
			);
		}
		const cartRepo = this.activeManager_.withRepository(this.cartRepository_);

		const lastCompleted: Cart | null = await cartRepo.findOne({
			where: {
				customer_id: customerId,
				completed_at: Not(IsNull()),
			},
			order: { completed_at: 'desc' },
		});

		if (lastCompleted?.completed_at) {
			const query = buildQuery({
				customer_id: customerId,
				completed_at: null,
				created_at: MoreThan(lastCompleted.completed_at),
			});
			return await cartRepo.findOne(query);
		} else {
			const query = buildQuery({
				customer_id: customerId,
				completed_at: null,
			});
			return await cartRepo.findOne(query);
		}
	}
}

export default ExtendedCartService;
