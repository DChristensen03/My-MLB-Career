<script>
	import Modal from './Modal.svelte';
	export let isOpen = false,
		offers = [];
</script>

<Modal showModal={isOpen}>
	<div class="row" slot="header">
		<h2>
			Offseason Contracts <br />
			<small>View your offseason contract offers</small>
		</h2>
	</div>

	<div class="row">
		<table data-table="responsive striped">
			<tr>
				<th>Team</th>
				<th>Salary</th>
				<th>Years</th>
			</tr>
			{#each offers as offer}
				<tr>
					<th>{offer.team}</th>
					<th>{offer.salary > 10 ? offer.salary / 10 + 'M' : offer.salary * 100 + 'k'}</th>
					<th>{offer.years}</th>
				</tr>
			{/each}
		</table>
	</div>

	<div class="row">
		<div data-col="4">
			<button class="center-center">Offer A</button>
		</div>
		<div data-col="4">
			<button class="center-center">Offer B</button>
		</div>
		<div data-col="4">
			<button class="center-center">Current Team</button>
		</div>
	</div>
</Modal>
