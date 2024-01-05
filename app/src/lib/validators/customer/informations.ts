import { z } from 'zod';

export const customer_informations_zod = z.object({
	first_name: z.string().min(1, { message: 'Vorname ist erforderlich' }),
	last_name: z.string().min(1, { message: 'Nachname ist erforderlich' }),
	company: z.string().optional(),
	phone: z.string().optional(),
	address_1: z
		.string()
		.min(1, { message: 'Straße ist erforderlich' })
		.default('Kurt-von-Plettenberg-Straße 14'),
	address_2: z.string().optional(),
	city: z.string().min(1, { message: 'Stadt ist erforderlich' }).default('Potsdam'),
	province: z.string().min(1),
	//regex text
	postal_code: z
		.string()
		.regex(/^(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})$/, {
			message: 'Ungültige Postleitzahl. Wir liefern nur nach Deutschland'
		})
		.default('14469'),
	country_code: z.string().default('de')
});

export type CustomerInformationsZod = typeof customer_informations_zod;
