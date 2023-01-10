<script>
	export let types;
	export let typeSelected = types[0].value;

	function clearType() {
		network = ``;
		console.log(network);
	}
</script>

<div class="control">
	{#each types as { value, label, link }}
		<label class="radio">
			<input type="radio" name="type" value={value} bind:group={typeSelected} on:change={() => clearType()}/> {label}
			{#if link}
			<sup>
				<a href={link} rel="noreferrer" target="_blank">ℹ</a>
			</sup>
			{/if}
		</label>
	{/each}
</div>
