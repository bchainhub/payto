<script lang="ts">
	import { join } from '$lib/helpers/join.helper';
	import { setFieldGroupContext } from './fieldgroup.context';

	setFieldGroupContext();

	export let classValue: string = '';
	let computedClass: string = join('[ flex flex-col items-stretch gap-2 ]', classValue);
</script>

<div class={computedClass}>
	<slot />
</div>
