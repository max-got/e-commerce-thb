import type { PricedVariant } from '@medusajs/medusa/dist/types/pricing.d';

const INVENTORY_STATUS = {
	IN_STOCK: 'in_stock',
	LOW_STOCK: 'low_stock',
	OUT_OF_STOCK: 'out_of_stock'
} as const;

export type INVENTORY_STATUS = (typeof INVENTORY_STATUS)[keyof typeof INVENTORY_STATUS];

function inventory_status(priced_product?: PricedVariant) {
	const _quantity = priced_product?.inventory_quantity || 0;

	const _inventory_status = () => {
		let inventory_status: { quantity: number; status: INVENTORY_STATUS } = {
			quantity: 0,
			status: INVENTORY_STATUS.OUT_OF_STOCK
		};

		if (_quantity !== undefined) {
			if (_quantity > 0 && _quantity < 10) {
				inventory_status = {
					quantity: _quantity,
					status: INVENTORY_STATUS.LOW_STOCK
				};
			} else if (_quantity >= 10) {
				inventory_status = {
					quantity: _quantity,
					status: INVENTORY_STATUS.IN_STOCK
				};
			} else if (_quantity === 0) {
				inventory_status = {
					quantity: _quantity,
					status: INVENTORY_STATUS.OUT_OF_STOCK
				};
			} else {
				inventory_status = {
					quantity: _quantity,
					status: INVENTORY_STATUS.OUT_OF_STOCK
				};
			}
		}

		return inventory_status;
	};
	const { status, quantity } = _inventory_status();

	const _display_text = () => {
		switch (status) {
			case 'in_stock':
				return 'Auf Lager';
			case 'low_stock':
				return `Noch ${quantity} Stück verfügbar`;
			case 'out_of_stock':
				return 'Ausverkauft';
			default:
				return 'Ausverkauft';
		}
	};

	const display_text = _display_text();

	const _class_name = () => {
		switch (status) {
			case 'in_stock':
				return 'text-green-500';
			case 'low_stock':
				return 'text-yellow-500';
			case 'out_of_stock':
				return 'text-red-500';
			default:
				return 'text-red-500';
		}
	};
	const class_name = _class_name();

	return {
		display_text,
		class_name,
		is_available: status === 'in_stock' || status === 'low_stock',
		is_low_stock: status === 'low_stock',
		is_out_of_stock: status === 'out_of_stock',
		quantity: quantity,
		status: status
	};
}

export const inventory_status_store = inventory_status;
