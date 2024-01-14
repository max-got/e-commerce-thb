import { dev } from '$app/environment';
import { EMAIL_PASS, EMAIL_SERVER, EMAIL_USER } from '$env/static/private';

import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	...(!dev
		? {
				host: EMAIL_SERVER,
				port: 465,
				secure: true,
				auth: {
					user: EMAIL_USER,
					pass: EMAIL_PASS
				}
		  }
		: {
				host: '0.0.0.0',
				port: 1025,
				debug: true
		  })
});
