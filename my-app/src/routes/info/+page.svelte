<script>
	import { onMount } from 'svelte';
	import { toasts } from 'svelte-toasts';

	let userid = '',
		username = '',
		loading = false;

	onMount(() => {
		userid = localStorage.getItem('userid');
		username = localStorage.getItem('username');
	});

	async function handleSubmit() {
		loading = true;
		if (
			!(userid == localStorage.getItem('userid') && username == localStorage.getItem('username'))
		) {
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

<form class="form" on:submit|preventDefault={handleSubmit}>
	<div class="row" data-grid="center-center">
		<div class="field" data-col="4">
			<label for="user-key">User Key</label>
			<input name="user-key" id="user-key" type="text" maxlength="36" bind:value={userid} />
		</div>
		<div class="field" data-col="4">
			<label for="user-name">Name</label>
			<input name="user-name" id="user-name" type="text" maxlength="25" bind:value={username} />
		</div>
	</div>

	<div class="row" data-grid="center-center">
		<div class="col-6 align-center">
			<small
				><em
					>If you started on another device you can take the User Key from that device and update it
					here. If you update your User Key your two devices will now be linked. You can also add
					your name for easier lookup.
				</em></small
			>
		</div>
	</div>

	<div data-grid="row">
		<div class="col-12 align-center">
			<input disabled={loading} class="cta-button {loading ? 'loading' : ''}" type="submit" />
		</div>
	</div>
</form>

<style>
	.loading {
		background-color: #ffffff;
		background-image: url('https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif');
		background-size: 15px 15px;
		background-position: right center;
		background-repeat: no-repeat;
	}

	.cta-button {
		display: inline-block;
		background-color: #ff5722;
		color: #fff;
		text-align: center;
		padding: 15px 30px;
		margin-top: 20px;
		text-decoration: none;
		border-radius: 5px;
		font-size: 20px;
		transition: background-color 0.3s;
	}

	.cta-button:hover {
		background-color: #e64a19;
	}
</style>
