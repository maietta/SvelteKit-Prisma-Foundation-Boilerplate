<script lang="ts">
	import jQuery from 'jquery'; // jQuery (Don't use import, it will break foundation.js)

	import '$lib/foundation/foundation.scss';
	import 'foundation-sites/dist/js/foundation.js';

	import TopBarNav from '$lib/components/TopBarNav.svelte';
	import CustomOffCanvasMenu from '$lib/components/CustomOffCanvasMenu.svelte';

	import { onMount } from 'svelte';
	onMount(() => {
		jQuery(document).foundation();
	});

	import '../app.css';
</script>

<svelte:head>
	<title>Coming soon!</title>
</svelte:head>

<div class="off-canvas-wrapper">
	<div class="off-canvas-wrapper-inner" data-off-canvas-wrapper>
		<div class="off-canvas position-left" id="offCanvasLeft" data-off-canvas>
			<CustomOffCanvasMenu />
		</div>
		<div
			class="off-canvas position-right"
			id="offCanvasRight"
			data-off-canvas
			data-position="right"
		/>
		<div class="off-canvas-content bg-slate-400 z-10" data-off-canvas-content>
			<TopBarNav />
			<div class="grid-container">
				<slot />
			</div>
		</div>
	</div>
</div>
