<script>
	import { enhance, applyAction } from '$app/forms';
	import { PUBLIC_RECAPTCHA_V3_SITE_KEY } from '$env/static/public';

	export let form = {
		data: {
			token: '',
			fname: '',
			lname: '',
			email: '',
			message: ''
		},
		errors: {
			token: '',
			fname: '',
			lname: '',
			email: '',
			message: ''
		},
		fname: ''
	};

	export let placeholder = {
		message: null,
		classes: null
	};
</script>

<svelte:head>
	<script
		src="https://recaptcha.net/recaptcha/api.js?render={PUBLIC_RECAPTCHA_V3_SITE_KEY}"
		async
		defer
	></script>
</svelte:head>

<div class=" mx-auto my-20  border border-purple-500 bg-white">
	<div class="p-5 space-y-5 shadow-xl">
		<h4 class="text-center text-3xl">Contact Us</h4>

		{#if placeholder?.message}
			<h3 class={placeholder?.classes}>{placeholder?.message}</h3>
		{/if}

		<!-- svelte-ignore missing-declaration -->
		<form
			method="POST"
			use:enhance={async ({ form, data }) => {
				// This is the function that will be called when the form is submitted

				async function getCaptchaToken() {
					return /** @type {Promise<void>} */ (
						new Promise((resolve) => {
							// @ts-ignore - grecaptcha is a global variable
							grecaptcha.execute(PUBLIC_RECAPTCHA_V3_SITE_KEY).then(function (token) {
								data.append('token', token);
								resolve();
							});
						})
					);
				}

				await getCaptchaToken();

				return async ({ result, update }) => {
					// After form submission to server
					if (result.type === 'success') {
						placeholder = result?.data?.body;
						form.reset();
					}

					// On the backend, the fail() method is called with a message, which triggers a failure result.
					if (result.type === 'failure') {
						placeholder = result?.data?.body;
						await applyAction(result);
					}
					update();
				};
			}}
		>
			<!-- end of opening form tag with progressive enhancedment feature -->

			<div class="form-body">
				<div class="mb-4 text-gray-700">
					<label class="block mb-1" for="firstName">First Name</label>
					<input
						class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline
						 {form?.errors?.fname ? 'border-red-700' : ''}"
						type="text"
						id="fname"
						name="fname"
						aria-describedby="firstName"
						value={form?.fname ?? ''}
					/>
					{#if form?.errors?.fname}
						<span class="text-xs text-red-700" id="firstName">{form?.errors?.fname[0]}</span>
					{/if}
				</div>

				<div class="mb-4 text-gray-700">
					<label class="block mb-1" for="firstName">Last Name</label>
					<input
						class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline
						{form?.errors?.lname ? 'border-red-700' : ''}"
						type="text"
						id="lname"
						name="lname"
						aria-describedby="lastName"
						value={form?.data?.lname ?? ''}
					/>
					{#if form?.errors?.lname}
						<span class="text-xs text-red-700" id="lastName">{form?.errors?.lname[0]}</span>
					{/if}
				</div>

				<div class="mb-4 text-gray-700">
					<label class="block mb-1" for="firstName">Email address</label>
					<input
						class="w-full h-10 px-3 text-base placeholder-gray-600 rounded-lg focus:shadow-outline
						{form?.errors?.email ? 'border-red-700' : ''}"
						type="text"
						id="email"
						name="email"
						aria-describedby="email"
						value={form?.data?.email ?? ''}
					/>
					{#if form?.errors?.email}
						<span class="text-xs text-red-700">{form?.errors?.email[0]}</span>
					{/if}
				</div>
				<div class="mb-4 text-gray-700">
					<label class="block mb-1" for="firstName">Your message</label>
					<textarea
						rows="5"
						cols="50"
						class="w-full h-50 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline
						{form?.errors?.message ? 'border-red-700' : ''}"
						id="message"
						name="message"
						aria-describedby="message"
						value={form?.data?.message ?? ''}
					/>
					{#if form?.errors?.message}
						<span class="text-xs text-red-700">{form?.errors?.message[0]}</span>
					{/if}
				</div>
			</div>
			<input
				type="submit"
				value="Send Message"
				class="focus:outline-none mt-5 bg-purple-500 px-4 py-2 text-white font-bold w-full"
			/>
		</form>
	</div>
</div>

<style lang="postcss">
	.grecaptcha-badge {
		visibility: hidden;
	}
</style>
