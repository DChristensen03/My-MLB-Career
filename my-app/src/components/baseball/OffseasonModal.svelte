<script>
	import Modal from '../Modal.svelte';
	import baseball_info from '../../info/baseball_info.json';
	import { createEventDispatcher } from 'svelte';
<<<<<<< Updated upstream
=======
	import {
		Table,
		TableBody,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Modal,
		Button
	} from 'flowbite-svelte';
	import MyTableBodyCell from '$lib/MyTableBodyCell.svelte';
>>>>>>> Stashed changes

	const dispatch = createEventDispatcher();

	export let offers = [],
		teamNumber,
		salary,
		years;

	let isOpen;

	function selectTeam(offerNum) {
		if (offerNum != 2) {
			teamNumber = offers[offerNum].number;
			years = offers[offerNum].years;
			salary = offers[offerNum].salary;
		} else {
			years = 1;
		}
		closeModal();
	}

	function closeModal() {
		dispatch('message', {
			text: 'contractSelected'
		});
		isOpen = false;
	}

	export const open = () => (isOpen = true);
</script>

{#if isOpen}
<<<<<<< Updated upstream
	<Modal showModal={isOpen}>
		<div data-grid="row" slot="header">
			<h2>
				Offseason Contracts <br />
				<small>View your offseason contract offers</small>
			</h2>
		</div>

		<div data-grid="row">
			<table data-table="responsive striped">
				<tr>
					<th>Team</th>
					<th>Salary</th>
					<th>Years</th>
				</tr>
				{#each offers as offer}
					<tr>
						<th>{baseball_info.teams[offer.number].name}</th>
						<th>{offer.salary > 9 ? offer.salary / 10 + 'M' : offer.salary * 100 + 'k'}</th>
						<th>{offer.years}</th>
					</tr>
				{/each}
			</table>
=======
	<Modal dismissable={false} bind:open={isOpen}>
		<div class="flex flex-col">
			<div data-grid="row">
				<h2>
					Offseason Contracts <br />
					<small>View your offseason contract offers</small>
				</h2>
			</div>
		</div>

		<div class="flex flex-row items-stretch">
			<Table class="table-auto" striped={true} shadow>
				<TableHead>
					<TableHeadCell>Team</TableHeadCell>
					<TableHeadCell>Salary</TableHeadCell>
					<TableHeadCell>Years</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each offers as offer}
						<TableBodyRow>
							<MyTableBodyCell>{baseball_info.teams[offer.number].name}</MyTableBodyCell>
							<MyTableBodyCell
								>{offer.salary > 9
									? offer.salary / 10 + 'M'
									: offer.salary * 100 + 'k'}</MyTableBodyCell
							>
							<MyTableBodyCell>{offer.years}</MyTableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
>>>>>>> Stashed changes
		</div>

		<form class="form">
			<div data-grid="row">
				<div data-col="4">
					<button
						class="button small center-center"
						on:click={() => {
							selectTeam(0);
						}}>Offer A</button
					>
				</div>
				<div data-col="4">
					<button
						class="button small center-center"
						on:click={() => {
							selectTeam(1);
						}}>Offer B</button
					>
				</div>
				<div data-col="4">
					<button
						class="button small center-center"
						on:click={() => {
							selectTeam(2);
						}}>Current Team</button
					>
				</div>
			</div>
		</form>
	</Modal>
{/if}

<style>
	@media (max-width: 720px) {
		table {
			display: block;
			width: 100%;
			overflow-x: auto;
		}

		table th,
		table td {
			display: table-cell;
		}

		table thead {
			display: table-header-group;
		}

		table tbody {
			display: table-row-group;
		}
	}
</style>
