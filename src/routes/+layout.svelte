<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	
	import TopBarNav from '$lib/components/TopBarNav.svelte';
	import CustomOffCanvasMenu from '$lib/components/CustomOffCanvasMenu.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import '../app.css';
	import '$lib/foundation/foundation.scss';

	let jQuery: any;
	
	onMount(async () => {
		if (browser) {
			jQuery = (await import('jquery')).default;
			await import('foundation-sites/dist/js/foundation.js');
			jQuery(document).foundation();
		}
	});
</script>

<svelte:head>
	<title>Coming soon!</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-slate-400">
	<div class="off-canvas-wrapper flex-grow">
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
			<div class="off-canvas-content z-10 flex flex-col min-h-full" data-off-canvas-content>
				<TopBarNav />
				<main class="flex-grow">
					<div class="grid-container">
						<slot />
					</div>
				</main>
			</div>
		</div>
	</div>
	<Footer />
</div>
