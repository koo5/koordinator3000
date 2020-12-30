<script context="module">
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

	<!-- CodeMirror -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.17.0/codemirror.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.17.0/codemirror.css"/>

	<!-- Firepad -->
	<link rel="stylesheet" href="https://firepad.io/releases/v1.5.10/firepad.css"/>
	<script src="https://firepad.io/releases/v1.5.10/firepad.min.js"></script>

	<title>
		{path ? path.charAt(0).toUpperCase() + path.slice(1) : "Index"}
	</title>
</svelte:head>

<PageReloadClock/>

<nav>
	<a href=".">Welcome</a>
	<a href="causes">Causes</a>
	<a href="add_cause">Add Cause</a>
	<a href="actions">Actions</a>
	<a href="add_action">Add Action</a>
	<a href="notifications">Notifications</a>
	<a href="you">You</a>
	<a href="users">Users</a>
</nav>

<slot />
