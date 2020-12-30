<script type='js'>
	import { client } from '../apollo';
    import gql from 'graphql-tag';
    //import { subscribe } from 'svelte-apollo';
	import Campaign from '../components/Campaign.svelte';


  const causeList = process.browser ? subscribe(client, { query:
	  gql`
		subscription {
		  causes(order_by: [{id: asc}]) {
			id,
			title,
			description,
			campaigns,
		  }
		}
	  `
  }) : null;

</script>




Causes are higher-level than actions. A cause can have multiple associated actions. It states the problem and the goal.




<ul>
  {#await $causeList}
    <li>Loading...</li>
  {:then result}
    {#each result.data.causes as cause (cause.id)}

      <li><h4>{cause.id} - {cause.title}</h4></li>
      <p>{cause.description}</p>

      {#each cause.campaigns as campaign (campaign.id)}
		  <Campaign {campaign} />
      {/each}

    {:else}
      <li>No causes found</li>
    {/each}
  {:catch error}
    <li>Error loading causes: {error}</li>
  {/await}
</ul>


