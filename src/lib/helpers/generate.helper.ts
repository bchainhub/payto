import { META_CONTENT } from '$lib/data/meta-content.data';

/**
 * It takes a list of payloads and a set of props, and returns a link
 * @param {IPayload[]} payload - IPayload[] - the payload is an array of objects that contain the value
 * and placeholder of each field.
 * @param props - The props object that was used to initialized store.
 */
const generateLink = (payload: IPayload[], props: Record<string, any>) => {
	let link = payload
		.filter((payload) => payload.value !== undefined)
		.reduce((acc, payload) => acc.concat('/', payload.value || payload.placeholder), 'payto:/');

	if (props.params) {
		const { amount, currency, ...rest } = props.params;
		const validParams = Object.entries<{ value: string | undefined; mandatory?: boolean }>(rest)
			.filter(([_, param]) => param.mandatory || Boolean(param.value))
			.map(([key, param]) => [kebabize(key), param.value]);

		const searchParams = new URLSearchParams(validParams as string[][]);

		if (amount.mandatory) {
			searchParams.set(
				'amount',
				currency.value
				? caseCurrency(currency.value) + ':' + amount.value
				: amount.value
			);
		} else if (amount.value || currency.value) {
			searchParams.set(
				'amount',
				(amount.value && currency.value)
				? caseCurrency(currency.value) + ':' + amount.value
				: (currency.value ? caseCurrency(currency.value) + ':' : amount.value)
			);
		}

		if (searchParams.toString()) {
			link += '?' + uriNormalize(searchParams.toString());
		}
	}

	return link;
};

/**
 * camelCase to kebab-case
 * @param str - String to be kebabized
 */
const kebabize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());

/**
 * Convert required characters back from encodeURIComponent
 * @param str - String to be decoded
 */
const uriNormalize = (str) => str.replace(/%3A/g,':').replace(/%40/g,'@');

/**
 * Convert currency to lower case except Smart Contracts
 * @param str - String to be converted
 */
const caseCurrency = (str) => str.startsWith("0x") ? str : str.toLowerCase();

/**
 * It takes a prefix and a props object, and returns a title
 * @param {'Pay' | 'Donate'} prefix - 'Pay' | 'Donate'
 * @param props - The props object that was used to initialized store.
 */
const getTitle = (prefix: 'Pay' | 'Donate', props: Record<string, any>) => {
	const network = props.network !== 'other' ? props.network : props.other;
	let title = `${prefix} via ${network.toUpperCase()}`;
	if (props.chain > 0 && (props.network === 'eth' || props.network === 'other')) {
		title += `@${props.chain}`;
	}
	if (props.params.currency.value) {
		if (props.params.currency.value.length > 10) {
			if(props.params.currency.value.startsWith("0x")) {
				title += ` with ${props.params.currency.value.slice(0,4)}…${props.params.currency.value.slice(-4)}`;
			} else {
				title += ` with ${props.params.currency.value.slice(0,4).toUpperCase()}…${props.params.currency.value.slice(-4).toUpperCase()}`;
			}
		} else {
			title += ` with ${props.params.currency.value.toUpperCase()}`;
		}

	}

	return title;
};

/**
 * It takes a link and a props object and returns a markdown string
 * @param {string} link - The link to the payment page.
 * @param props - The props object that was used to initialized store.
 */
const generateMarkDown = (link: string, props: Record<string, any>) => {
	return `[${getTitle('Pay', props)}](${link})`;
};

/**
 * It takes a link and a props object and returns an HTML link
 * @param {string} link - The link to the payment page.
 * @param props - The props object that was used to initialized store.
 * @returns A string that contains an anchor tag with a link and a title.
 */
const generateHtmlLink = (link: string, props: Record<string, any>) => {
	return `<a href="${link}">${getTitle('Pay', props)}</a>`;
};

/**
 * It generates an HTML link with a payment button
 * @param {string} link - The link to the payment page.
 * @param props - The props object that was used to initialized store.
 * @returns A string of HTML code that will be used to create a button that will link to the payment
 * page.
 */
const generateHtmlPaymentButton = (link: string, props: Record<string, any>) => {
	const style = `
display:inline-block;
background-color:#518842;
color:#d3fbc9;
text-decoration:none;
font-weight:500;
padding:.5em 1.3em .5em .7em;
border:3px #77bb65 solid;
border-left:10px #77bb65 solid;
border-radius:4px 9999px 9999px 4px;
font-family:BlinkMacSystemFont,-apple-system,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',Helvetica,Arial,sans-serif;
`;

	return `<a href="${link}" style="${style}">💸&#8192;${getTitle('Pay', props)}</a>`;
};

/**
 * It takes a link and a set of properties and returns a string of HTML that can be used to render a
 * donation button
 * @param {string} link - The link to the donation page.
 * @param props - The props object that was used to initialized store.
 * @returns A string of HTML code that will be used to create a donation button.
 */
const generateHtmlDonationButton = (link: string, props: Record<string, any>) => {
	const style = `
display:inline-block;
background-color:#aa8c2c;
color:#f7ebc9;
text-decoration:none;
font-weight:500;
padding:.5em 1.3em .5em .7em;
border:3px #ddbf5f solid;
border-left:10px #ddbf5f solid;
border-radius:4px 9999px 9999px 4px;
font-family:BlinkMacSystemFont,-apple-system,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',Helvetica,Arial,sans-serif;
`;

	return `<a href="${link}" style="${style}">🎁&#8192;${getTitle('Donate', props)}</a>`;
};

/**
 * It takes a type and a set of properties, and returns a meta tag
 * @param {ITransitionType} type - The type of the meta tag.
 * @param props - The props object that was used to initialized store.
 * @returns A string of HTML that will be used to create a meta tag.
 */
const generateMetaTag = (type: ITransitionType, props: Record<string, any>) => {
	let property = `${type}`;
	if (type === 'ican' && props.network) {
		if(props.network !== 'other') {
			if(props.network === 'eth' && props.chain > 0) {
				property += `:${props.network}@${props.chain}`;
			} else {
				property += `:${props.network}`;
			}
		} else {
			if(props.chain > 0) {
				property += `:${props.other}@${props.chain}`;
			} else {
				property += `:${props.other}`;
			}
		}
	} else if (type === 'iban' && props.bic) {
		property += `:${props.bic}`;
	} else if (type === 'ach' && props.routingNumber) {
		property += `:${props.routingNumber}`;
	} else if (type === 'void') {
		if(props.network !== 'other') {
			property += `:${props.network}`;
		} else {
			property += `:${props.other}`;
		}
	}

	if (props.params.currency.value) {
		property += `:${props.params.currency.value}`;
	}

	const content = META_CONTENT[type](props);

	return `<meta property="${property}" content="${content}" />`;
};

/**
 * It takes in a type, props, and payload, and returns an array of objects
 * @param {ITransitionType} type - The type of the link. This is used to generate the meta tag.
 * @param props - The props object that was used to initialized store.
 * @param {IPayload[]} payload - The payload that was generated by the user.
 */
export const generate = (type: ITransitionType, props: any, payload: IPayload[]): IOutput[] => {
	const link = generateLink(payload, props);

	return [
		{ label: 'Link', value: link },
		{ label: 'Markdown', value: generateMarkDown(link, props) },
		{ label: 'Html link', value: generateHtmlLink(link, props) },
		{
			label: 'Html payment button',
			value: generateHtmlPaymentButton(link, props),
			previewable: true
		},
		{
			label: 'Html donation button',
			value: generateHtmlDonationButton(link, props),
			previewable: true
		},
		{ label: 'Meta tag', value: generateMetaTag(type, props) }
	];
};
