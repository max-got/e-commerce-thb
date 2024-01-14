import { EMAIL_USER } from '$env/static/private';
import type { StoreOrdersRes } from '@medusajs/medusa';
import fsPromise from 'fs/promises';
import Handlebars from 'handlebars';
import type { SendMailOptions } from 'nodemailer';
import { transporter } from '../transporter';
import { TEMPLATE } from './template';

export async function send_order_placed_email(order: StoreOrdersRes['order']) {
	Handlebars.registerHelper('convert_to_eur', function (price) {
		return `${(price / 100).toFixed(2).replace('.', ',')} €`;
	});

	const email_template = Handlebars.compile(TEMPLATE);

	const current_path = import.meta.url;
	const __dirname = new URL('.', current_path).pathname;
	//get all pdf files in assets folder
	const pdf_files = await fsPromise.readdir(new URL('./assets', current_path)).then((files) => {
		return files.filter((file) => file.endsWith('.pdf'));
	});

	const message: SendMailOptions = {
		from: EMAIL_USER,
		to: EMAIL_USER,
		subject: 'Vielen Dank für deine Bestellung!',
		html: email_template({
			first_name: order.shipping_address.first_name,
			last_name: order.shipping_address.last_name,
			items: order.items,
			total_amount: order.total,
			shipping_option: order.shipping_methods[0].shipping_option.name,
			id: order.display_id,
			shipping_address: order.shipping_address,
			total: order.total
		}),
		attachments: [
			...pdf_files.map((file) => ({
				filename: file,
				path: `${__dirname}/assets/${file}`,
				contentType: 'application/pdf'
			}))
		]
	};

	transporter.sendMail(message);
}
