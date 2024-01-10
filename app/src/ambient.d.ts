declare module '@medusajs/medusa/dist/models/product-variant' {
	declare interface ProductVariant {
		metadata:
			| {
					gewicht: string;
					streben: string;
					spannweite: string;
					groesse_geschlossen: string;
					verschlussmechanismus: string;
					herstellungsmaterialien: string;
			  }
			| { [key: string]: string | null };
	}
}
