import type { CustomerDetailsWidgetProps, WidgetConfig } from '@medusajs/admin';
import { useAdminCustomer, useAdminUpdateCustomer } from 'medusa-react';
import { Checkbox, Label } from '@medusajs/ui';
import { useAdminCustomQuery } from 'medusa-react';
const ProductWidget = ({ customer }: CustomerDetailsWidgetProps) => {
	const { customer: customer_ } = useAdminCustomer(customer.id);

	return (
		<div className="bg-white p-8 border border-gray-200 rounded-lg ">
			<h3 className="text-lg font-medium mb-4">Newsletter subscription</h3>
			<div className="flex items-center space-x-2">
				<Checkbox
					id="accepts-newsletter-checked"
					checked={customer_.accepts_newsletter}
				/>

				<Label htmlFor="accepts-newsletter-checked">Accepts newsletter</Label>
			</div>
		</div>
	);
};

export const config: WidgetConfig = {
	zone: 'customer.details.after',
};

export default ProductWidget;
