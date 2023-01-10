<script>
	import './styles.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="app has-sticky-footer">
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</div>
