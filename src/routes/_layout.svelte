<script context="module" type='js'>
	export const preload = () => {};
</script>

<script>
	import { stores } from "@sapper/app";
	import PageReloadClock from "../components/PageReloadClock.svelte";

	// You may not want to use `segment`, but it is passed for the time being and will
	// create a warning if not expected: https://github.com/sveltejs/sapper-template/issues/210
	// https://github.com/sveltejs/sapper/issues/824
	export let segment: string = "";
	// Silence unused export property warning
	if (segment) {};

	const { page } = stores();

	let path: string;
	$: path = $page.path.slice(1);
</script>

<svelte:head>
	<title>
		{path ? path.charAt(0).toUpperCase() + path.slice(1) : "Index"}
	</title>
</svelte:head>


<nav>
	<PageReloadClock/>
	<a href=".">Welcome</a>
	<a href="causes">Causes</a>
	<a href="add_cause">Add Cause</a>
	<a href="campaigns">Campaigns</a>
	<a href="add_campaign">Add Campaign</a>
	<a href="notifications">Notifications</a>
	<a href="you">You</a>
	<a href="users">Users</a>
	<a href="auth0">Auth0</a>
</nav>

<slot />
