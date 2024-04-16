<script lang="ts">
	import { page } from '$app/stores';
	import { Row, Box, BoxContent, BoxTitle, Page } from '$lib/components';
</script>

<Page>
	<Row>
		<Box>
			<BoxTitle>
				{#if $page.status === 404}
					Page Not Found
				{:else if $page.status === 500}
					We have a problem!
				{:else}
					Error {$page.status}
				{/if}
			</BoxTitle>
			<BoxContent>
				{#if $page.status === 404}
					<div>We can't seem to find the page you're looking for.</div>
				{:else if $page.status === 500}
					<div>
						We're having trouble processing your request.
					</div>
					<div>
						Please,
						<a href="https://github.com/bchainhub/payto/issues" target="_blank" rel="noindex,nofollow">report the problem</a>
						and try again later.
					</div>
				{:else}
					<div>{$page.error?.message || 'Unexpected error.'}</div>
				{/if}
				<div>Remember - Payto protocol is always working, without any downtime.</div>
				<div>
					<a href="/">Go back home.</a>
				</div>
			</BoxContent>
		</Box>
	</Row>
</Page>
