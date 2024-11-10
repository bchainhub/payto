import { writable } from 'svelte/store';

export interface Toast {
	id: string;
	message: string;
	type?: 'success' | 'error' | 'info' | 'warning';
	duration?: number;
}

export const toasts = writable<Toast[]>([]);
