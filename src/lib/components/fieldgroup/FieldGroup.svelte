<script lang="ts">
	import { join } from '$lib/helpers/join.helper';
	import { setFieldGroupContext } from './fieldgroup.context';

	setFieldGroupContext();

	export let classValue: string = '';
	export let flexType: string = 'flex-col';
	export let itemPosition: string = 'items-stretch';
	let computedClass: string = join('[ flex gap-2 ]', itemPosition, flexType, classValue);
</script>

<div class={computedClass}>
	<slot />
</div>
