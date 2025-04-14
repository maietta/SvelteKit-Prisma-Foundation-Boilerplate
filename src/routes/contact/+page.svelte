<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { PUBLIC_RECAPTCHA_V3_SITE_KEY } from '$env/static/public';

	type FormData = {
		token: string;
		fname: string;
		lname: string;
		email: string;
		message: string;
	};

	type FormErrors = {
		token?: string[];
		fname?: string[];
		lname?: string[];
		email?: string[];
		message?: string[];
	};

	type PlaceholderData = {
		message: string | null;
		classes: string | null;
	};

	let formData = $state<FormData>({
		token: '',
		fname: '',
		lname: '',
		email: '',
		message: ''
	});

	let formErrors = $state<FormErrors>({});
	let placeholder = $state<PlaceholderData>({
		message: null,
		classes: null
	});
</script>

<svelte:head>
	<script
		src="https://recaptcha.net/recaptcha/api.js?render={PUBLIC_RECAPTCHA_V3_SITE_KEY}"
		async
		defer
	></script>
</svelte:head>

<div class="mx-auto my-20 border border-purple-500 bg-white">
	<div class="p-5 space-y-5 shadow-xl">
		<h4 class="text-center text-3xl">Contact Us</h4>

		{#if placeholder.message}
			<h3 class={placeholder.classes}>{placeholder.message}</h3>
		{/if}

		<form
			method="POST"
			use:enhance={async ({ formData: fd }) => {
				async function getCaptchaToken() {
					return new Promise<void>((resolve) => {
						// @ts-ignore - grecaptcha is a global variable
						grecaptcha.execute(PUBLIC_RECAPTCHA_V3_SITE_KEY).then(function (token) {
							fd.append('token', token);
							resolve();
						});
					});
				}

				await getCaptchaToken();

				return async ({ result, update }) => {
					if (result.type === 'success') {
						placeholder = result.data?.body as PlaceholderData;
						formData = {
							token: '',
							fname: '',
							lname: '',
							email: '',
							message: ''
						};
					}

					if (result.type === 'failure') {
						placeholder = result.data?.body as PlaceholderData;
						await applyAction(result);
					}
					update();
				};
			}}
		>
			<div class="form-body">
				<div class="mb-4 text-gray-700">
					<label class="block mb-1" for="firstName">First Name</label>
					<input
						class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline
						 {formErrors.fname ? 'border-red-700' : ''}"
						type="text"
						id="fname"
						name="fname"
						aria-describedby="firstName"
						bind:value={formData.fname}
					/>
					{#if formErrors.fname}
						<span class="text-xs text-red-700" id="firstName">{formErrors.fname[0]}</span>
					{/if}
				</div>

				<div class="mb-4 text-gray-700">
					<label class="block mb-1" for="lastName">Last Name</label>
					<input
						class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline
						{formErrors.lname ? 'border-red-700' : ''}"
						type="text"
						id="lname"
						name="lname"
						aria-describedby="lastName"
						bind:value={formData.lname}
					/>
					{#if formErrors.lname}
						<span class="text-xs text-red-700" id="lastName">{formErrors.lname[0]}</span>
					{/if}
				</div>

				<div class="mb-4 text-gray-700">
					<label class="block mb-1" for="email">Email address</label>
					<input
						class="w-full h-10 px-3 text-base placeholder-gray-600 rounded-lg focus:shadow-outline
						{formErrors.email ? 'border-red-700' : ''}"
						type="text"
						id="email"
						name="email"
						aria-describedby="email"
						bind:value={formData.email}
					/>
					{#if formErrors.email}
						<span class="text-xs text-red-700">{formErrors.email[0]}</span>
					{/if}
				</div>
				<div class="mb-4 text-gray-700">
					<label class="block mb-1" for="message">Your message</label>
					<textarea
						rows="5"
						cols="50"
						class="w-full h-50 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline
						{formErrors.message ? 'border-red-700' : ''}"
						id="message"
						name="message"
						aria-describedby="message"
						bind:value={formData.message}
					></textarea>
					{#if formErrors.message}
						<span class="text-xs text-red-700">{formErrors.message[0]}</span>
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
