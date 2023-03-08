// This file is a SvelteKit action that is called when the contact form is submitted.
import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit"

// Form specific imports
import z from "zod"
import sgMail from "@sendgrid/mail/index";

// Import the SendGrid API key and email addresses from the private environment variables.
import { SENDGRID_API_KEY, EMAIL_DESTINATION, EMAIL_REPLY_TO, RECAPTCHA_V3_SECRET_KEY } from '$env/static/private';

import { verifyRecaptchaV3 } from '$lib/recaptcha';

// Refer to https://zod.dev/ for details about how to setup a validation schema.
const contactFormSchema = z.object({
    token: z.string({ required_error: "reCaptcha token is missing!" }).min(64),
    fname: z.string({ required_error: "First name is required" }).min(1),
    lname: z.string({ required_error: "Last name is required" }).min(1),
    email: z.string({ required_error: "Valid email address required" }).email(),
    message: z.string({ required_error: "Please summarize your reason for contact." }).min(1),
});

export const actions: Actions = {
    default: async ({ request }) => {

        const formData = Object.fromEntries(await request.formData());
        const form = contactFormSchema.safeParse(formData);

        // If there is a problem with the form data, return the error.
        if (!form.success) { // If not successful, return the error.

            // If there was an error with the token, return a generic error message.
            if (form.error.flatten().fieldErrors.token) {
                return fail(400, {
                    data: formData,
                    errors: form.error.flatten().fieldErrors,
                    body: {
                        message: 'reCaptcha token is not present. Bots are not allowed to use this form.',
                        classes: 'text-2xl text-red-500'
                    }
                });
            }

            return fail(400, {
                data: formData,
                errors: form.error.flatten().fieldErrors,
                body: {
                    message: 'Please review the form and try again.',
                    classes: 'text-2xl text-red-500'
                }
            });
        }

        // Verify the reCaptcha token.
        try {
            await verifyRecaptchaV3(form.data.token, RECAPTCHA_V3_SECRET_KEY, 0.5, 'contact');
            console.log('reCaptcha verified.');
        } catch (err: any) {
            // There was a problem. Return the error.
            return fail(400, {
                data: formData,
                body: {
                    message: "reCaptcha Error: " + err.message,
                    classes: 'text-2xl text-red-500'
                }
            });
        }

        try {
            sgMail.setApiKey(SENDGRID_API_KEY);

            await sgMail.send({
                to: EMAIL_DESTINATION, // SendGrid verified email or domain where email is send "from". This could be a reply-to address, or a sales, support, or other address.
                from: EMAIL_REPLY_TO,  // The email address that will be displayed as the sender.
                replyTo: form.data.email, // The email provided provided by the visitor.
                subject: 'Contat form submission',
                text: 'First Name: ' + form.data.fname + '\n' +
                    'Last Name: ' + form.data.lname + '\n' +
                    'Email: ' + form.data.email + '\n' +
                    'Message: ' + form.data.message,
                // html: '<strong>' + text + '</strong>',
            });

        } catch (err: any) {
            if (err.response) {
                console.error(err.response.body?.errors)
                return fail(400, {
                    data: formData,
                    body: {
                        message: "Upstream Error: " + err.response.body?.errors[0]?.message,
                        classes: 'text-2xl text-red-500'
                    }
                });
            }
        }

        // If this point is reached, the email was sent successfully.
        return {
            status: 200,
            body: {
                message: 'Your message has been sent. Thank you!',
                classes: 'text-center text-2xl text-green-500'
            }
        };
    },
};