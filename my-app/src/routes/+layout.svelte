<script>
	import '../app.postcss';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { ToastContainer, FlatToast } from 'svelte-toasts';
	import {
		Navbar,
		NavLi,
		NavUl,
		NavHamburger,
		NavBrand,
		Dropdown,
		DropdownItem
	} from 'flowbite-svelte';

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

	$: activeUrl = $page.url.pathname;
</script>

<Navbar class="bg-secondary-500 text-white">
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>My Sports Career</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi
			activeClass="text-primary-500"
			nonActiveClass="text-light hover:text-primary-500"
			href="/">Home</NavLi
		>
		<NavLi activeClass="text-primary-500" nonActiveClass="text-light hover:text-primary-500"
			>Baseball</NavLi
		>
		<Dropdown>
			<DropdownItem href="/baseball/game">Play Game</DropdownItem>
			<DropdownItem href="/baseball/stats">Scoreboard</DropdownItem>
			<DropdownItem href="/baseball/tutorial">Tutorial</DropdownItem>
		</Dropdown>
		<NavLi
			activeClass="text-primary-500"
			nonActiveClass="text-light hover:text-primary-500"
			href="/info">Info</NavLi
		>
	</NavUl>
</Navbar>

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
