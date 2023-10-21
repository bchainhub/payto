<script lang="ts">
	export let classValue: string = '';
</script>

<svg
	class={classValue}
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
	{...$$restProps}
>
	<path
		stroke-linecap="round"
		stroke-linejoin="round"
		d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
	/>
</svg>
