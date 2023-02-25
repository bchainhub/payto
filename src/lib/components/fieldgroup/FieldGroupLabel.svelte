<script lang="ts">
	import { getFieldGroupContext } from './fieldgroup.context';

	const ctx = getFieldGroupContext();
</script>

<label class={$$props.class} id={ctx.labelId} for={ctx.fieldId}>
	<slot />
</label>
