import { z } from 'zod';

export const guest_checkout = z.object({
	email: z
		.string()
		.email({ message: 'E-Mail ist erforderlich' })
		.default('max.gottschalk@mailbox.org'),
	first_name: z.string().min(1, { message: 'Vorname ist erforderlich' }).default('Max'),
	last_name: z.string().min(1, { message: 'Nachname ist erforderlich' }).default('Gottschak'),
	company: z.string().optional(),
	phone: z.string().optional(),
	address_1: z
		.string()
		.min(1, { message: 'Straße ist erforderlich' })
		.default('Kurt-von-Plettenberg-Straße 14'),
	address_2: z.string().optional(),
	city: z.string().min(1, { message: 'Stadt ist erforderlich' }).default('Potsdam'),
	province: z.string().min(1).default('Brandenburg'),
	//regex text
	postal_code: z
		.string()
		.regex(/^(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})$/, {
			message: 'Ungültige Postleitzahl. Wir liefern nur nach Deutschland'
		})
		.default('14469'),
	country_code: z.string().default('de')
});

export type GuestCheckout = typeof guest_checkout;

export const shipping_option = z.object({
	shipping_option: z.string()
});

export type ShippingOption = typeof shipping_option;

export const discount = z.object({
	discount: z.string()
});

export type Discount = typeof discount;
