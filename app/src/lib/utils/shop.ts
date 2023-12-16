export const format_price = (price: number) => {
	if (typeof Intl === 'undefined') {
		return `${(price / 100).toFixed(2).replace('.', ',')} €`;
	}

	return new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'EUR'
	}).format(price / 100);
};
