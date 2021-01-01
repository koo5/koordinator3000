<script lang='js'  type='js'>

	import {
	  Auth0Context,
	  authError,
	  authToken,
	  idToken,
	  isAuthenticated,
	  isLoading,
	  login,
	  logout,
	  userInfo,
	} from '@dopry/svelte-auth0';


</script>


{#if process.browser}




<Auth0Context
	domain="dev-koord11.eu.auth0.com"
	client_id="GjHr32K9lxNsmzoBBdoFE44IDXg24btf">
		<button on:click|preventDefault='{() => login() }'>Login</button>
		<button on:click|preventDefault='{() => logout() }'>Logout</button><br />
		<pre>isLoading: {$isLoading}</pre>
		<pre>isAuthenticated: {$isAuthenticated}</pre>
		<pre>authToken: {$authToken}</pre>
		<pre>idToken: {$idToken}</pre>
		<pre>userInfo: {JSON.stringify($userInfo, null, 2)}</pre>
		<pre>authError: {$authError}</pre>
</Auth0Context>



{:else}
	loading..
{/if}
