<script>
//	import BytemdEditor from "../components/BytemdEditor.svelte";
	import FirepadEditor from "../components/FirepadEditor.svelte";
	import RemarkableEditor from "../components/RemarkableEditor.svelte";
	import { onMount } from "svelte";

	let timer = 0;
	onMount(() => {
		setInterval(() => {
			timer++;
		}, 1000);
	});

</script>

<style>

</style>

{timer.toString()}

<h1>FirepadEditor:</h1>
<FirepadEditor />


<br><hr><hr><hr><hr><hr><hr><hr><hr><br>
<h1>RemarkableEditor:</h1>
<RemarkableEditor />


<br><hr><hr><hr><hr><hr><hr><hr><br>

<!--<BytemdEditor
	title="🌐 Opinionated Sapper project base"
	paragraph="This is an example route and component to make sure everything's working." />
-->

<!--
<hr>
<div class:centerer={true}> Here's how you could extract conditional class groups with @apply
	xxx
</div>
-->
