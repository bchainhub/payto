<script lang="ts">
	import { TabGroup } from '@rgossiaux/svelte-headlessui';
</script>

<TabGroup defaultIndex={0} class="[ flex flex-col gap-8 ]" on:change>
	<slot />
</TabGroup>
