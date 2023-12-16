import { writable } from 'svelte/store';

/**
 * @description A store that indicates whether the app is loading or not (useful for adding products to cart, etc.)
 */
export const loading = writable(false);
