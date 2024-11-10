<script lang="ts">
	import '../app.postcss';
	import { Header, Footer } from './components';
</script>

<article class="[ flex flex-col ] [ is-full ] [ h-screen justify-between ]">
	<Header />

	<main class="[ lg:pli-8 ] [ mx-auto ]">
		<slot />
	</main>

	<Footer />
</article>
