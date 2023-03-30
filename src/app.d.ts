// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

type ITransitionType = 'ican' | 'iban' | 'upi' | 'ach' | 'bic' | 'void';

interface IPayload {
	placeholder?: string;
	value: string | undefined;
	query?: boolean;
}

interface IOutput {
	label: string;
	value: string;
	previewable?: boolean;
}
