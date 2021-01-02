<style>


	.slide	{
		background-color: orange;
		width: 600;
	}


</style>


<script type='js'>
	import gql from 'graphql-tag';
	import { subscribe } from 'svelte-apollo';
	import Campaign from '../components/Campaign.svelte';
	import { my_user } from '../my_user';
	import { onMount } from "svelte";


	let ProgressBar;
	let series = [20,16];





	onMount(async () => {
		ProgressBar = (await import("@okrad/svelte-progressbar")).default;
	});


	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import SwiperCore, { EffectFade } from 'swiper';
	import 'swiper/swiper-bundle.css';
	SwiperCore.use([EffectFade]);


	const CAMPAIGN_LIST = gql`
    subscription ($_user_id: Int) {
      campaigns(order_by: [{id: asc}], where: {smazano: {_eq: false}}) {
        id,
        title,
        description,
        suggested_lowest_threshold,
        suggested_highest_threshold,
        suggested_optimal_threshold,
        participations(order_by: [{threshold: asc}]) {
          id
          threshold
          user {
            id
            name
          }
          confirmed
          condition_is_fulfilled
        },
        my_participations: participations(where: {user_id: {_eq: $_user_id}}) {
          id
          threshold
          condition_is_fulfilled
        }
      }
    }
  `;

	$: apollo_can_subscribe = process.browser && window.apollo_can_subscribe;

	function maybe_subscribe(my_user)
	{
		var my_user_id;
		if (my_user)
			my_user_id = my_user.id
		else
			my_user_id = 0;
		const result = apollo_can_subscribe ? subscribe(
			CAMPAIGN_LIST,
			{
				variables: {
					_user_id: my_user_id
				}
			}
		) : 123;
		console.log("maybe_subscribe:");
		console.log(result);
		return result
	}
	let campaigns;
	$: campaigns = maybe_subscribe($my_user);

</script>

<!--
{#if apollo_can_subscribe === true}
<Swiper effect="fade">
  <SwiperSlide>Slide 1</SwiperSlide>
  <SwiperSlide>Slide 2</SwiperSlide>
  <SwiperSlide>Slide 3</SwiperSlide>
</Swiper>
{/if}
-->

{#if apollo_can_subscribe === true}
	<ul>
		{#if $campaigns.loading}
			<li>Loading...</li>
		{:else if $campaigns.data}
			{#each $campaigns.data.campaigns as campaign (campaign.id)}
				{campaign.id}:
				<div>
					<!-- this should show, relative to your set threshold (100%), number of cofirmed and number of unconfirmed participants: -->
					<svelte:component this={ProgressBar} {series} height={5} showProgressValue={false} />

					spaceBetween={50}
					grabCursor={true}
					watchOverflow={true}
					speed={1500}
					effect={'fade'}

				<Swiper
					initialSlide={1}
					slidesPerView={1}

					on:slideChange={(x) => console.log(x)}
					on:swiper={(e) => console.log(e.detail)}>
					  <SwiperSlide  let:data={{ isActive }} >
							<div class="slide">
						  <div>Current slide is { isActive ? 'active' : 'not active' }</div>
						  <div>DISMISSed</div>
							</div>
					  </SwiperSlide>

					<SwiperSlide  let:data={{ isActive }} >
						<div class="slide">
						  <div>
							  <div>Current slide is { isActive ? 'active' : 'not active' }</div>
							  bla bla
							{JSON.stringify(campaign)}
							  bla.
						  </div>
						</div>
					  </SwiperSlide>

					  <SwiperSlide  let:data={{ isActive }} >
						<div class="slide">
						  <div>Current slide is { isActive ? 'active' : 'not active' }</div>
						  <div>PARTICIPATEd</div>
						</div>
					  </SwiperSlide>

				</Swiper>


				</div>
			{:else}
				<li>No campaigns found</li>
			{/each}
		{:else}
			error
		{/if}
	</ul>
<hr>


{:else}
	loading..
{/if}
