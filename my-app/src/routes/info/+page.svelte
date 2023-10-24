<script>
	import { onMount } from 'svelte';
	import { toasts } from 'svelte-toasts';
	import { Button, Spinner, Label, Input } from 'flowbite-svelte';

	let userid = '',
		username = '',
		loading = false;

	$: infoChanged = !(
		userid == localStorage.getItem('userid') && username == localStorage.getItem('username')
	);

	onMount(() => {
		userid = localStorage.getItem('userid');
		username = localStorage.getItem('username');
	});

	async function handleSubmit() {
		loading = true;
		if (infoChanged) {
			await fetch('/info', {
				method: 'POST',
				body: JSON.stringify({
					olduserid: localStorage.getItem('userid'),
					userid,
					username
				}),
				headers: {
					'content-type': 'application/json'
				}
			})
				.then(async (response) => {
					const info = await response.json();
					if (!response.ok) {
						throw new Error(info.message);
					}
					if (info.userid) {
						userid = info.userid;
						localStorage.setItem('userid', userid);
					}
					if (info.username) {
						username = info.username;
						localStorage.setItem('username', username);
					}
					toasts.add({
						title: 'Success!',
						description: 'Your info was updated succesfully.',
						type: 'success'
					});
				})
				.catch((err) => {
					toasts.add({
						title: 'An error occured',
						description: err,
						type: 'error'
					});
				})
				.finally(() => {
					loading = false;
				});
		} else {
			toasts.add({
				title: 'No changes made',
				description: 'The info entered was not updated.',
				type: 'info'
			});
			loading = false;
		}
	}
</script>

<div class="grid grid-rows-4 justify-items-center sm:space-y-1 md:space-y-2 m-1">
	<div>
		<Label for="user-key">User Key</Label>
		<Input name="user-key" id="user-key" type="text" maxlength="36" bind:value={userid} />
	</div>
	<div class="field">
		<Label for="user-name">Name</Label>
		<Input name="user-name" id="user-name" type="text" maxlength="25" bind:value={username} />
	</div>

	<div class="text-center">
		<small
			><em
				>If you started on another device you can take the User Key from that device and update it
				here. If you update your User Key your two devices will now be linked. You can also add your
				name for easier lookup.<br />
				If you clear your browser cache your user key will no longer be stored. Please save your key
				before doing so to prevent data loss.
			</em></small
		>
	</div>

	<div>
		<Button on:click={handleSubmit} disabled={loading || !infoChanged}>
			Submit
			{#if loading}
				<Spinner size="4" class="ml-1" />
			{/if}
		</Button>
	</div>
</div>
