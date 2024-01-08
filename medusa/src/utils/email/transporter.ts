import nodemailer from 'nodemailer';

const dotenv = require('dotenv');

export const transporter = nodemailer.createTransport({
	...(process.env.NODE_ENV === 'production'
		? {
				host: process.env.EMAIL_SERVER,
				port: 465,
				secure: true,
				auth: {
					user: process.env.EMAIL_USER,
					pass: process.env.EMAIL_PASS,
				},
		  }
		: {
				host: '0.0.0.0',
				port: 1025,
				debug: true,
		  }),
});
