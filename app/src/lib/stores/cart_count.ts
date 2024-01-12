import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export const CART_COUNT_CTX = 'USER_CART_COUNT';

export function set_cart_count(count: number) {
	const cart_count = writable(count);
	setContext(CART_COUNT_CTX, cart_count);
	return cart_count;
}

export function get_cart_count() {
	return getContext<Writable<number>>(CART_COUNT_CTX);
}
