<script lang="ts">
	import { join } from '$lib/helpers/join.helper';
</script>

<section
	class={join(
		'[ flex flex-col gap-6 ]',
		'[ grow rounded-sm ]',
		'[ p-4 text-gray-100 bg-gray-800/75 rounded-lg ]',
		'[ lg:!p-8 lg:gap-8 lg:is-1/2 ]'
	)}
>
	<slot />
</section>
