import { OrderService, type SubscriberArgs, type SubscriberConfig } from '@medusajs/medusa';
import { send_order_placed_email } from '../utils/email/order_placed/send';

export default async function handleOrderPlaced({ data, container }: SubscriberArgs<Record<string, string>>) {
	try {
		const orderService: OrderService = container.resolve('orderService');

		const order = await orderService.retrieve(data.id, {
			select: ['id', 'display_id', 'email', 'total', 'shipping_methods', 'shipping_address', 'items'],
			relations: ['items', 'shipping_address', 'shipping_methods', 'shipping_methods.shipping_option'],
		});

		await send_order_placed_email(order);
	} catch (error) {
		console.log('Error handling order placed', error);
	}
}

export const config: SubscriberConfig = {
	event: OrderService.Events.PLACED,
	context: {
		subscriberId: 'order-placed-handler',
	},
};
