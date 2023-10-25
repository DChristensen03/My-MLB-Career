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
