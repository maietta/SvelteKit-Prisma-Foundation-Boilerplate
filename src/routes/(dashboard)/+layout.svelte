<script lang="ts">
	import '../../app.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	//import 'flowbite/dist/flowbite.css';
</script>

{#if children}{@render children()}{:else}<!-- optional fallback -->{/if}
