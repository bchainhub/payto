import { derived, writable } from 'svelte/store';

/**
 * It takes an initial state and a builder object, and returns a writable store with a reset function
 * and a build function
 * @param {TState} initial - The initial state of the store.
 * @param builder - Record<TKey, (props: any) => void>
 */
export const createStore = <TState, TKey extends keyof TState>(
	initial: TState,
	builder: Record<TKey, (props: any) => IOutput[]>
) => {
	const state = structuredClone(initial);
	const store = writable(state);

	const reset = (name: keyof typeof initial) => () => {
		store.update(($state) => ({ ...$state, [name]: initial[name] }));
	};

	const build = (name: TKey) => {
		return derived(store, ($state) => {
			const props = $state[name];
			return builder[name](props);
		});
	};

	return { ...store, reset, build };
};
