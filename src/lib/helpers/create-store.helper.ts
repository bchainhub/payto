import { writable, derived } from 'svelte/store';

type BaseState = { _reactivityTrigger?: boolean };

export const createStore = <TState extends Record<string, any>, TKey extends keyof TState>(
	initial: TState & BaseState,
	builder: Record<TKey, (props: any) => IOutput[]>
) => {
	const state = structuredClone(initial);
	const store = writable<TState & BaseState>(state);

	const reset = (name: keyof typeof initial) => () => {
		store.update((currentState: TState & BaseState) => {
			const deepClone = JSON.parse(JSON.stringify(initial[name]));
			const updatedState = { ...currentState, [name]: deepClone, _reactivityTrigger: !currentState._reactivityTrigger };
			return updatedState;
		});
	};

	const build = (name: TKey) => {
		return derived(store, ($state: TState & BaseState) => {
			const props = $state[name as keyof TState];
			return builder[name](props);
		});
	};

	return { ...store, reset, build };
};
