export default async function () {
	const imports = (await import(
		'@medusajs/medusa/dist/api/routes/admin/products/index'
	)) as any;

	imports.defaultAdminProductFields = [
		...imports.defaultAdminProductFields,
		'color',
	];
}
