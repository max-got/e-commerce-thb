import type { StoreProductsRes } from '@medusajs/medusa';

export type PricedProduct = StoreProductsRes['product']['variants'][0] & {
	thumbnail: StoreProductsRes['product']['thumbnail'];
	images: StoreProductsRes['product']['images'];
};
