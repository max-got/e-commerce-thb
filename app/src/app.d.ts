import type { Cart, Customer } from '@medusajs/medusa';

import 'unplugin-icons/types/svelte';
declare global {
	// See https://kit.svelte.dev/docs/types#app
	// for information about these interfaces

	namespace App {
		// interface Error {}
		interface Locals {
			sid: string;
			cartid: string;
			user: Customer | null;
			cart?: Cart;
			student?: {
				name: string;
			};
		}
		interface PageData {
			cart?: Cart;
		}
		// interface Platform {}
	}
}

export {};
