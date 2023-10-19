<script>
	import { onMount } from 'svelte';

	export let stats = {},
		mvps,
		allStarAppearances,
		worldSeries,
		totalSalary;

	let name = '';

	onMount(() => {
		console.log('end of career');
		checkHOFStats();
	});

	function checkHOFStats() {
		const mvpRecord = checkMVPs(mvps);
		console.log(mvpRecord);
		// array.push({ name, num });
		// 	localStorage.setItem('MVPs', JSON.stringify(array));
	}

	function checkMVPs(num) {
		const MVPs = localStorage.getItem('careerMVPS');
		let array = JSON.parse(MVPs);
		if (num > 0) {
			if (!array) {
				return true;
			} else if (array.length < 5) {
				return true;
			}
		}

		if (array) {
			array = array.sort(function (a, b) {
				return parseInt(a.num) - parseInt(b.num);
			});
			if (num > array.slice(-1).num) return true;
		}

		return false;
	}

	function reset() {
		window.location.reload();
	}
</script>

<form on:submit|preventDefault={reset}>
	<div data-grid="row">
		<div class="col-12">
			<input class="red" type="submit" value="Reset" />
		</div>
	</div>
</form>
