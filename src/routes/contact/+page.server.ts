
import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit"


import z from "zod"
import sgMail from "@sendgrid/mail/index";
// THE FOLLOWING TWO LINES ARE NOT WORKING. STILL WORKING ON THIS.
// import { env } from '$env/dynamic/private';
// const { SENDGRID_API_KEY, SENDGRID_EMAIL_FROM, VITE_CONTACT_EMAIL } = env;

// This needs to be picked up from the .env file. I'm not sure how to do this. Seems broken at the moment.
const SENDGRID_API_KEY = "<EXAMPLE_KEY>";
const SENDGRID_EMAIL_FROM = "no-reply@example.com";
const VITE_CONTACT_EMAIL = "username+contactform@example.com";

// Refer to https://zod.dev/ for building a desired data schema for the data we want to parse and optionally.
const contactSchema = z.object({
    fname: z.string({ required_error: "First name is required" }).min(1),
    lname: z.string({ required_error: "Last name is required" }).min(1),
    email: z.string({ required_error: "Valid email address required" }).email(),
    message: z.string({ required_error: "Please summarize your reason for contact." }).min(1),
});

export const actions: Actions = {
    default: async ({ request }) => {

        sgMail.setApiKey(SENDGRID_API_KEY);

        const formData = Object.fromEntries(await request.formData());

        // Remove empty fields from the form data.
        Object.keys(formData).forEach(key => formData[key] === '' && delete formData[key]);

        const form = contactSchema.safeParse(formData);
        const { ...rest } = formData;

        // If there is a problem with the form data, return the error.
        if (!form.success) {
            return fail(400, {
                data: rest,
                errors: form.error.flatten().fieldErrors,
                body: {
                    message: 'Please review the form and try again.',
                    classes: 'text-2xl text-red-500'
                }
            });
        }

        try {
            await sgMail.send({
                to: VITE_CONTACT_EMAIL, // Destination email address (Who is responsible responding to emails)
                replyTo: form.data.email, // Email of visitor requesting contact.
                from: SENDGRID_EMAIL_FROM, // Email of sender (verified email address or domain at SendGrid)
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
                    data: rest,
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