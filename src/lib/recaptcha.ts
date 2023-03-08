interface RecaptchaVerificationResponse {
    success: boolean;
    score: number;
    action: string;
    challenge_ts: string;
    hostname: string;
    error_codes?: string[];
}

// Validate the reCaptcha token.
async function verifyRecaptchaV3(
    token: string,
    secretKey: string,
    minScore: number = 0.5,
    action: string = 'generic'
): Promise<boolean> {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const data: RecaptchaVerificationResponse = await response.json();

        const { success, score, action: responseAction } = data;

        if (!success || score < minScore || responseAction !== action) {
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error);
        return false;
    }
}

export { verifyRecaptchaV3 };