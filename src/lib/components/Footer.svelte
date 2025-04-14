<script>
	import BuildInfo from './BuildInfo.svelte';
</script>

<footer class="bg-gray-800 text-white py-6">
	<div class="grid-container">
		<div class="grid-x grid-margin-x">
			<div class="cell medium-4">
				<h3 class="text-xl font-bold mb-4">About Us</h3>
				<p class="text-gray-300">Your company description or mission statement goes here.</p>
			</div>
			<div class="cell medium-4">
				<h3 class="text-xl font-bold mb-4">Quick Links</h3>
				<ul class="list-none">
					<li class="mb-2"><a href="/" class="text-gray-300 hover:text-white">Home</a></li>
					<li class="mb-2"><a href="/contact" class="text-gray-300 hover:text-white">Contact</a></li>
					<li class="mb-2"><a href="/dashboard" class="text-gray-300 hover:text-white">Dashboard</a></li>
				</ul>
			</div>
			<div class="cell medium-4">
				<h3 class="text-xl font-bold mb-4">Contact Info</h3>
				<address class="text-gray-300 not-italic">
					<p>123 Main Street</p>
					<p>City, State 12345</p>
					<p>contact@example.com</p>
				</address>
			</div>
		</div>
		<div class="grid-x grid-margin-x mt-8">
			<div class="cell">
				<div class="text-center text-gray-400">
					<BuildInfo />
					<p class="mt-2">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
				</div>
			</div>
		</div>
	</div>
</footer> 