import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';



import { setAuthenticationCookies } from '$lib/cookies';
import { findByEmail } from '$lib/services/users';

import pkg from 'bcryptjs';
const { compareSync } = pkg;

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        const user = await findByEmail(String(email));

        if (!compareSync(String(password), String(user?.password)))
            return fail(400, { password, incorrect: true });

        if (user)
            setAuthenticationCookies(cookies, user.uuid);

        throw redirect(302, '/dashboard');
    }
}