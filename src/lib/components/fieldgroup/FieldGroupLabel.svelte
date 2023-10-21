<script lang="ts">
	import { getFieldGroupContext } from './fieldgroup.context';

	const ctx = getFieldGroupContext();
	export let classValue: string = '';
</script>

<label class={classValue} id={ctx.labelId} for={ctx.fieldId}>
	<slot />
</label>
