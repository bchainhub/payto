<script lang="ts">
	import { getFieldGroupContext } from './fieldgroup.context';

	const ctx = getFieldGroupContext();
</script>

<small class="[ -mb-1 text-gray-400 ]" id={ctx.descriptionId}>
	<slot />
</small>
