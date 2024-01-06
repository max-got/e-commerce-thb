import type { ProductVariant } from '@medusajs/medusa';
import { writable } from 'svelte/store';

const INVENTORY_STATUS = {
	IN_STOCK: 'in_stock',
	LOW_STOCK: 'low_stock',
	OUT_OF_STOCK: 'out_of_stock'
} as const;

export type INVENTORY_STATUS = (typeof INVENTORY_STATUS)[keyof typeof INVENTORY_STATUS];

function inventory_status(priced_product?: ProductVariant) {
	const { set, update, subscribe } = writable<ProductVariant>();

	const quantity = priced_product?.inventory_quantity || 0;

	const inventory_status = (): { quantity: number; status: INVENTORY_STATUS } => {
		if (quantity !== undefined) {
			if (quantity > 0 && quantity < 10) {
				return {
					quantity,
					status: INVENTORY_STATUS.LOW_STOCK
				};
			} else if (quantity >= 10) {
				return {
					quantity,
					status: INVENTORY_STATUS.IN_STOCK
				};
			} else if (quantity === 0) {
				return {
					quantity,
					status: INVENTORY_STATUS.OUT_OF_STOCK
				};
			}
		}

		return {
			quantity: 0,
			status: INVENTORY_STATUS.OUT_OF_STOCK
		};
	};

	const text = () => {
		const quantity = inventory_status().status;

		switch (quantity) {
			case 'in_stock':
				return 'Auf Lager';
			case 'low_stock':
				return `Noch ${inventory_status().quantity} Stück verfügbar`;
			case 'out_of_stock':
				return 'Ausverkauft';
		}
	};

	const class_name = () => {
		const quantity = inventory_status().status;

		switch (quantity) {
			case 'in_stock':
				return 'text-green-500';
			case 'low_stock':
				return 'text-yellow-500';
			case 'out_of_stock':
				return 'text-red-500';
		}
	};

	return {
		subscribe,
		inventory_status,
		text,
		class_name,
		set,
		update
	};
}

export const inventory_status_store = inventory_status;
