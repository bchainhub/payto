<script>
	import '../app.postcss';

	import { Header, Footer } from './components';
</script>

<article class="[ flex flex-col ] [ is-full ]">
	<Header />

	<main class="[ lg:pli-8 ]">
		<slot />
	</main>

	<Footer />
</article>
