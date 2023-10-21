<script>
	import baseball_info from '../../info/baseball_info.json';
	import { createEventDispatcher } from 'svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Modal,
		Button
	} from 'flowbite-svelte';

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
	<Modal bind:open={isOpen}>
		<div class="flex flex-col">
			<div data-grid="row">
				<h2>
					Offseason Contracts <br />
					<small>View your offseason contract offers</small>
				</h2>
			</div>
		</div>

		<div class="flex flex-row items-stretch">
			<Table class="table-fixed" striped={true} shadow>
				<TableHead>
					<TableHeadCell>Team</TableHeadCell>
					<TableHeadCell>Salary</TableHeadCell>
					<TableHeadCell>Years</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each offers as offer}
						<TableBodyRow>
							<TableBodyCell>{baseball_info.teams[offer.number].name}</TableBodyCell>
							<TableBodyCell
								>{offer.salary > 9
									? offer.salary / 10 + 'M'
									: offer.salary * 100 + 'k'}</TableBodyCell
							>
							<TableBodyCell>{offer.years}</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>

		<form>
			<div class="flex flex-cols-3 justify-around">
				<div>
					<Button
						size="sm"
						on:click={() => {
							selectTeam(0);
						}}>Offer A</Button
					>
				</div>
				<div>
					<Button
						size="sm"
						on:click={() => {
							selectTeam(1);
						}}>Offer B</Button
					>
				</div>
				<div>
					<Button
						size="sm"
						on:click={() => {
							selectTeam(2);
						}}>Current Team</Button
					>
				</div>
			</div>
		</form>
	</Modal>
{/if}
