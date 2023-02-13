<script>
	// Pull variables for debug info. Can be used in a contact form to signal which version of the site was deployed.
	const buildTag = import.meta.env.VITE_BUILD_TAG;
	const buildDate = import.meta.env.VITE_BUILD_DATE;
</script>

<div>
	{#if buildTag}
		{#if buildTag != 'main'}
			<p>Version: {buildTag}</p>
		{:else}
			<p>Staging {buildTag} branch</p>
		{/if}
		{#if buildDate}
			<p>Built on: {buildDate}</p>
		{/if}
	{:else}
		<p>Developement Version</p>
	{/if}
</div>
