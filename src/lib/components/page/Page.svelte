<script lang="ts">
	export let children: typeof import('svelte').SvelteComponent | null = null;
</script>

<svelte:head>
	<title>Payto Money — Decentralized transfer of Assets</title>
	<meta name="description" content="The Payto URI generator transfers Assets decentralized via a link or a redirect." />
	<meta property="twitter:title" content="Payto Money — Decentralized transfer of Assets" />
	<meta property="twitter:description" content="The Payto URI generator transfers Assets decentralized via a link or a redirect." />
	<meta property="twitter:image" content="https://payto.money/icons/android-chrome-512x512.png" />
	<meta property="og:title" content="Payto Money — Decentralized transfer of Assets" />
	<meta property="og:description" content="The Payto URI generator transfers Assets decentralized via a link or a redirect." />
	<meta property="og:image" content="https://payto.money/icons/android-chrome-512x512.png" />
</svelte:head>

<div>
	{#if children}
		<svelte:component this={children} />
	{/if}
</div>
