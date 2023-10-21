<script>
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { ToastContainer, FlatToast } from 'svelte-toasts';

	onMount(async () => {
		if (localStorage.getItem('userid') === null) {
			const response = await fetch('/createUser', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				}
			});

			let userid = await response.json();
			userid = userid.insert_users_one.userid;

			localStorage.setItem('userid', userid);
		}
	});
</script>

<div class="navbar">
	<a href="/">Home</a>
	<div class="dropdown">
		<button class="dropbtn"
			>Baseball
			<i class="fa fa-caret-down" />
		</button>
		<div class="dropdown-content">
			<a href="/baseball/game">Play Game</a>
			<a href="/baseball/stats">Scoreboard</a>
			<a href="/baseball/tutorial">Tutorial</a>
		</div>
	</div>
	<a href="/info">Info</a>
</div>

<ToastContainer duration="5000" showprogress="true" theme="dark" placement="top-right" let:data>
	<FlatToast {data} />
</ToastContainer>

<div>
	<slot />
</div>

<style>
	.navbar {
		overflow: hidden;
		background-color: #333;
		font-family: Arial;
	}

	/* Links inside the navbar */
	.navbar a {
		float: left;
		font-size: 16px;
		color: white;
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
	}

	/* The dropdown container */
	.dropdown {
		float: left;
		overflow: hidden;
	}

	/* Dropdown button */
	.dropdown .dropbtn {
		font-size: 16px;
		border: none;
		outline: none;
		color: white;
		padding: 14px 16px;
		background-color: inherit;
		font-family: inherit; /* Important for vertical align on mobile phones */
		margin: 0; /* Important for vertical align on mobile phones */
	}

	/* Add a red background color to navbar links on hover */
	.navbar a:hover,
	.dropdown:hover .dropbtn {
		background-color: #ff5722;
	}

	/* Dropdown content (hidden by default) */
	.dropdown-content {
		display: none;
		position: absolute;
		background-color: #f9f9f9;
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 1;
	}

	/* Links inside the dropdown */
	.dropdown-content a {
		float: none;
		color: black;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
		text-align: left;
	}

	/* Add a grey background color to dropdown links on hover */
	.dropdown-content a:hover {
		background-color: #ddd;
	}

	/* Show the dropdown menu on hover */
	.dropdown:hover .dropdown-content {
		display: block;
	}
</style>
