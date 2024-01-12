<script>
	import { Card, Table, TableHead, TableHeadCell } from 'flowbite-svelte';
	export let open = false;
</script>

{#if open}
	<Card class="absolute">
		<Table>
			<TableHead>
				<TableHeadCell />
			</TableHead>
		</Table>
	</Card>
{/if}
