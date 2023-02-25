<script>
	import { Icon } from '$lib/icons';
</script>

<header class="[ grid place-content-center ] [ pbs-16 pbe-8 ]">
	<!-- <img src="/icons/favicon-32x32.png" alt="Payto scheme" width="32" height="32"> -->

	<div class="[ flex flex-col items-stretch ] [ container select-none ] [ lg:items-center ]">
		<h1
			class="[ flex flex-col items-start gap-2 ] [ text-green-500 text-5xl tracking-wide ] [ lg:text-6xl lg:flex-row ]"
		>
			<span class="[ font-bold ]">PAYTO</span>
			<span>Integrations</span>
		</h1>

		<a
			class="[ inline-flex items-center gap-2 ] [ group font-semibold text-gray-200 transition-all duration-200 ] [ visited:text-gray-200 hover:text-gray-300 ]"
			href="https://Payto.money/"
		>
			<span>visit</span>
			<span class="[ inline-flex items-end gap-2 ]">
				<span>PAYTO Money</span>
				<Icon.ArrowRight
					class="[ bs-5 is-5 transition-all duration-200 ] [ group-hover:translate-x-1 ]"
				/>
			</span>
		</a>
	</div>
</header>
