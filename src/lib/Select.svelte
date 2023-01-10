<script>
	export let transports;
	export let transportSelected;
</script>

<span class="select">
	<select name="transport" bind:value={transportSelected}>
		{#each transports as { value, label }}
			<option value="{value}">{label}</option>
		{/each}
	</select>
</span>
