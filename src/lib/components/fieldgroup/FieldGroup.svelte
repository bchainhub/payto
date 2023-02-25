<script>
	import { join } from '$lib/helpers/join.helper';
	import { setFieldGroupContext } from './fieldgroup.context';

	setFieldGroupContext();
</script>

<div class={join('[ flex flex-col items-stretch gap-2 ]', $$props.class)}>
	<slot />
</div>
