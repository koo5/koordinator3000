<script type='js'>
  import gql from 'graphql-tag';
  import { client } from '../apollo';
  import { impersonate } from '../my_user.js';
  //import { subscribe } from 'svelte-apollo';

  const USER_LIST = gql`
    subscription {
      users(order_by: [{id: asc}]) {
        id,
        name,
        email
      }
    }
  `;
  var userList = process.browser ? subscribe(client, { query: USER_LIST }) : null;

</script>

<style>

  .button {
     line-height: 1em;
     height:1em;
  }

</style>

<ul>
  {#if $userList}
    {#await $userList}
      <li>Loading...</li>
    {:then result}
      {#each result.data.users as user (user.id)}
        <li>{user.id} - {user.name} - {user.email}
        <button class="button" on:click={() => impersonate(user.id)}>
          Impersonate
        </button>
        </li>
      {:else}
        <li>No users found</li>
      {/each}
    {:catch error}
      <li>Error loading users: {error}</li>
    {/await}
    {/if}
</ul>

