import { z } from 'zod';

export const shipping_option = z.object({
	shipping_option: z.string()
});

export type ShippingOption = typeof shipping_option;

export const discount_zod = z.object({
	discount: z.string()
});

export type DiscountFormZod = typeof discount_zod;

//DELETE
export const address_form_zod = z.object({
	email: z.string().email({ message: 'E-Mail ist erforderlich' }),
	first_name: z.string().min(1, { message: 'Vorname ist erforderlich' }),
	last_name: z.string().min(1, { message: 'Nachname ist erforderlich' }),
	company: z.string().optional(),
	phone: z.string().optional(),
	address_1: z.string().min(1, { message: 'Straße ist erforderlich' }),
	address_2: z.string().optional(),
	city: z.string().min(1, { message: 'Stadt ist erforderlich' }),
	province: z.string().min(1),
	//regex text
	postal_code: z.string().regex(/^(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})$/, {
		message: 'Ungültige Postleitzahl. Wir liefern nur nach Deutschland'
	}),
	country_code: z.string().default('de')
});
//DELETE
export type AddressFormZod = typeof address_form_zod;
