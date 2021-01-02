<script context="module" type='js'>

	import ApolloClient from "apollo-client";
	import { InMemoryCache } from "apollo-cache-inmemory";
	import { WebSocketLink } from "apollo-link-ws";
	import { split } from "apollo-link";
	import { HttpLink } from "apollo-link-http";
	import { getMainDefinition } from "apollo-utilities";
	import fetch from 'node-fetch';

	let client;

	export const preload = () => {

		const headers = {'content-type': 'application/json'};

		const getHeaders = () => {
		  return headers;
		};

		const cache = new InMemoryCache();

		const wsLink = process.browser ? new WebSocketLink({
		  uri: "ws://koordinator2.hasura.app/v1/graphql",
		  options: {
			reconnect: true,
			lazy: true,
			connectionParams: () => {
			  return { headers: getHeaders() };
			},
		  },
		}) : null;

		const httpLink = new HttpLink({
		  uri: "https://koordinator2.hasura.app/v1/graphql",
		  headers: getHeaders(),
		  fetch:fetch,

		});

		const link = process.browser ? split(
		  ({ query }) => {
			const { kind, operation } = getMainDefinition(query);
			return kind === "OperationDefinition" && (operation === "subscription" || operation === "mutation");
		  },
		  wsLink,
		  httpLink
		) : httpLink;

		client = new ApolloClient({
		  ssrMode: true,
		  link,
		  cache
		});
	};



</script>

<script type='js'>
	import { stores } from "@sapper/app";
	import PageReloadClock from "../components/PageReloadClock.svelte";
	import {setClient} from 'svelte-apollo';
	import {my_user} from '../my_user';
	import {onMount} from 'svelte';

	if (process.browser) {
		setClient(client);
		window.apollo_can_subscribe = true;
	}


	onMount(() =>
	{
		my_user.update((x) =>
		{
			let result;
			console.log(x);
			if (x)
				result = x;
			else
				result = {id: 1, name: 'me', email: 'me@me.me'}
			console.log(result);
			return result
		});
	});

	// You may not want to use `segment`, but it is passed for the time being and will
	// create a warning if not expected: https://github.com/sveltejs/sapper-template/issues/210
	// https://github.com/sveltejs/sapper/issues/824
	export let segment = "";
	// Silence unused export property warning
	if (segment) {};

	const { page } = stores();

	let path;
	$: path = $page.path.slice(1);

</script>








<svelte:head>

	<!--
	<link rel='stylesheet' href='/build/swiper-bundle.css'>
	-->

	<title>
		{path ? path.charAt(0).toUpperCase() + path.slice(1) : "Index"}
	</title>

</svelte:head>




<style>


	:global(.condition_is_fulfilled)	{
		background-color: lightgreen;
	}

	:global(.condition_is_not_fulfilled)	{
		background-color: orange;
	}


</style>



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



<hr>
	my_user.id = {$my_user && $my_user.id}.
<hr>
