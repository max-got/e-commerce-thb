import type { Cart as Cart_ } from '@medusajs/medusa';
export type CartState = {
	cart_state: 'empty' | 'not_empty';
	user_state: 'logged_in' | 'not_logged_in';
	user_address_state: 'empty' | 'not_empty';
};

export type Cart = Omit<Cart_, 'refundable_amount' | 'refunded_total'> | undefined;
