<script lang="ts">
	import { join } from '$lib/helpers/join.helper';
</script>

<div
	class={join(
		'[ flex flex-col items-stretch justify-between gap-8 ] [ container plb-4 mlb-4 ] [ lg:flex-row lg:plb-8 lg:mlb-8 ]',
		'[ text-gray-100 ]',
	)}
>
	<slot />
</div>
