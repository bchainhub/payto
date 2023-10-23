import { META_CONTENT } from '$lib/data/meta-content.data';
import { checkValidity } from '$lib/helpers/check-validity.helper';

/**
 * It takes a list of payloads and a set of props, and returns a link
 * @param {IPayload[]} payload - IPayload[] - the payload is an array of objects that contain the value
 * and placeholder of each field.
 * @param props - The props object that was used to initialized store.
 */
const generateLink = (payload: IPayload[], props: Record<string, any>) => {
	let link = payload
		.filter((payload) => (payload.value !== undefined || payload.query === true))
		.reduce((acc, payload) => acc.concat('/', payload.value || (payload.placeholder ? payload.placeholder : '')), 'payto:/');

	if (props.params) {
		const { amount, currency, ...rest } = props.params;
		const validParams = Object.entries<{ value: string | undefined; mandatory?: boolean }>(rest)
			.filter(([_, param]) => param.mandatory || Boolean(param.value))
			.map(([key, param]) => [kebabize(key), param.value]);

		const searchParams = new URLSearchParams(validParams as string[][]);

		if (amount.mandatory) {
			searchParams.set(
				(props.isFiat ? 'fiat' : 'amount'),
				currency.value
				? caseCurrency(currency.value) + ':' + amount.value
				: amount.value
			);
		} else if (amount.value || currency.value) {
			searchParams.set(
				(props.isFiat ? 'fiat' : 'amount'),
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
const kebabize = (str: any) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($: any, ofs: any) => (ofs ? "-" : "") + $.toLowerCase());

/**
 * Convert required characters back from encodeURIComponent
 * @param str - String to be decoded
 */
const uriNormalize = (str: any) => str.replace(/%3A/g,':').replace(/%40/g,'@');

/**
 * Convert currency to lower case except Smart Contracts
 * @param str - String to be converted
 */
const caseCurrency = (str: any) => str.startsWith("0x") ? str : str.toLowerCase();

/**
 * Shorten name for title
 * @param str - String to be shorten
 */
const shortenTitle = (str: any) => str.length > 10 ? `${str.slice(0,4)}…${str.slice(-4)}` : str;

/**
 * It takes a prefix and a props object, and returns a title
 * @param {'Pay' | 'Donate'} prefix - 'pay' | 'donate'
 * @param props - The props object that was used to initialized store.
 */
const getTitle = (prefix: 'pay' | 'donate', props: Record<string, any>) => {
	let network
	if (props.network === 'void') {
		network = props.transport !== 'other'
		? shortenTitle(props.transport)
		: shortenTitle(props.other);
	} else {
		network = props.network !== 'other'
		? shortenTitle(props.network)
		: (checkValidity(props.other)
		? shortenTitle(props.other)
		: '');
	}
	let namePrefix;
	if (typeof props.params !== 'undefined' && typeof props.params.rc !== 'undefined' && typeof props.params.rc.value !== 'undefined') {
		namePrefix = `Recurring ${prefix}`;
	} else {
		namePrefix = prefix[0].toUpperCase() + prefix.slice(1);
	}
	let title = `${namePrefix} via ${network.toUpperCase()}`;
	if (props.chain > 0 && (props.network === 'eth' || props.network === 'other')) {
		title += `@${props.chain}`;
	}
	if (props.params.currency.value) {
		if (props.params.currency.value.length > 10) {
			if(props.params.currency.value.startsWith("0x")) {
				title += ` with ${shortenTitle(props.params.currency.value)}`;
			} else {
				title += ` with ${shortenTitle(props.params.currency.value.toUpperCase())}`;
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
	return `[${getTitle('pay', props)}](${link})`;
};

/**
 * It takes a link and a props object and returns an HTML link
 * @param {string} link - The link to the payment page.
 * @param props - The props object that was used to initialized store.
 * @returns A string that contains an anchor tag with a link and a title.
 */
const generateHtmlLink = (link: string, props: Record<string, any>) => {
	return `<a href="${link}">${getTitle('pay', props)}</a>`;
};

/**
 * It generates an HTML link with a payment button
 * @param {string} link - The link to the payment page.
 * @param props - The props object that was used to initialized store.
 * @returns A string of HTML code that will be used to create a button that will link to the payment
 * page.
 */
const generateHtmlPaymentButton = (link: string, props: Record<string, any>) => {
	const style1 = `
position:relative;
cursor:pointer;
background:#77bb65;
border:0;
border-radius:50px;
padding:10px 20px 10px 53px;
color:#f6fff4;
font-size:15px;
font-family:BlinkMacSystemFont,-apple-system,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',Helvetica,Arial,sans-serif;
font-weight:600;
text-decoration:none;
top:5px;
bottom:5px;
text-shadow: 0px 0px 1px #275b19;
white-space: nowrap;
`;
	const style2 = `
font-size:1.1em;
background:#518842;
border-radius:100px;
border:4px solid #77bb65;
padding:8px 10px;
margin:10px;
position:absolute;
top:-15px;
left:-10px;
`;

	return `<a href="${link}" style="${style1}">${getTitle('pay', props)}<span style="${style2}">💸</span></a>`;
};

/**
 * It takes a link and a set of properties and returns a string of HTML that can be used to render a
 * donation button
 * @param {string} link - The link to the donation page.
 * @param props - The props object that was used to initialized store.
 * @returns A string of HTML code that will be used to create a donation button.
 */
const generateHtmlDonationButton = (link: string, props: Record<string, any>) => {
	const style1 = `
position:relative;
cursor:pointer;
background:#c2a04b;
border:0;
border-radius:50px;
padding:10px 20px 10px 53px;
color:#f5ecd3;
font-size:15px;
font-family:BlinkMacSystemFont,-apple-system,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',Helvetica,Arial,sans-serif;
font-weight:600;
text-decoration:none;
top:5px;
bottom:5px;
text-shadow: 0px 0px 1px #7d601a;
white-space: nowrap;
`;
	const style2 = `
font-size:1.1em;
background:#9e8146;
border-radius:100px;
border:4px solid #c2a04b;
padding:8px 10px;
margin:10px;
position:absolute;
top:-15px;
left:-10px;
`;

	return `<a href="${link}" style="${style1}">${getTitle('donate', props)}<span style="${style2}">🎁</span></a>`;
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
			if(checkValidity(props.other)) {
				if(props.chain > 0) {
					property += `:${props.other.toLowerCase()}@${props.chain}`;
				} else {
					property += `:${props.other.toLowerCase()}`;
				}
			}
		}
	} else if (type === 'iban' && props.bic) {
		property += `:${props.bic.toLowerCase()}`;
	} else if (type === 'ach' && props.routingNumber) {
		property += `:${props.routingNumber}`;
	} else if (type === 'void') {
		if(props.transport !== 'other') {
			property += `:${props.transport}`;
		} else {
			property += `:${props.other.toLowerCase()}`;
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
		{ label: 'Meta tag', note: 'Basic payment instructions only.', value: generateMetaTag(type, props) }
	];
};
