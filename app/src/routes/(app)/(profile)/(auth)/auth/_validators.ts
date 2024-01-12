import { z } from 'zod';

export const login_post_request = z.object({
	email: z.string().email({ message: 'E-Mail ist erforderlich' }),
	password: z.string().min(6),
	rurl: z.string()
});

export const register_post_request = z
	.object({
		email: z.string().email({ message: 'E-Mail ist erforderlich' }),
		first_name: z.string().min(1, { message: 'Vorname ist erforderlich' }),
		last_name: z.string().min(1, { message: 'Nachname ist erforderlich' }),
		password: z.string().min(6, { message: 'Das Passwort muss mindestens 6 Zeichen lang sein' }),
		password_confirm: z
			.string()
			.min(6, { message: 'Das Passwort muss mindestens 6 Zeichen lang sein' }),
		rurl: z.string()
	})
	.superRefine(({ password_confirm, password }, ctx) => {
		if (password_confirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['password_confirm'],
				message: 'Die Passwörter stimmen nicht überein'
			});
		}
	});

export const forgot_post_request = z.object({
	email: z.string().email({ message: 'E-Mail ist erforderlich' }),
	token: z.string().min(1),
	rurl: z.string()
});

export const reset_post_request = z
	.object({
		email: z.string().email({ message: 'E-Mail ist erforderlich' }),
		password: z.string().min(6),
		passwordConfirm: z.string().min(6),
		code: z.string().min(1),

		rurl: z.string()
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Die Passwörter stimmen nicht überein'
			});
		}
	});
