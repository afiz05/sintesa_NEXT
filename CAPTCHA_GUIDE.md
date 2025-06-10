# Captcha Implementation Guide

This implementation provides a dynamic captcha system that supports two modes:

## Captcha Modes

### Mode "0" - Custom Number Captcha

- Generates a random 4-digit number
- Adds random spaces to make it harder to read
- Regenerates every 20 seconds
- User must enter the numbers without spaces

### Mode "1" - Google reCAPTCHA

- Uses Google's reCAPTCHA v2
- Requires `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` environment variable
- User must complete the "I'm not a robot" challenge

## How It Works

1. **Mode Detection**: On component mount, calls `/api/captcha-mode` to get the current mode
2. **Captcha Generation**: Based on the mode, either shows custom captcha or reCAPTCHA
3. **Validation**: Before login, validates the captcha input based on the mode
4. **Fallback**: If API fails, defaults to custom captcha mode ("0")

## Environment Variables

```env
NEXT_PUBLIC_LOCAL_CEKMODE=http://localhost:3000/api/captcha-mode
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

## API Endpoint

The `/api/captcha-mode` endpoint returns:

```json
{
  "success": true,
  "capcay": "0" // or "1"
}
```

## Testing Different Modes

To test different captcha modes, edit `app/api/captcha-mode/route.ts` and change:

```typescript
const captchaMode = "0"; // Change to "1" for reCAPTCHA
```

## Demo Credentials

- **Username**: admin
- **Password**: admin123
- **PIN**: 123456
- **Custom Captcha**: Enter the 4-digit number shown (without spaces)
- **reCAPTCHA**: Complete the Google challenge

## Integration Notes

This implementation matches the original LoginContainer.tsx captcha system:

- Same validation logic
- Same error messages
- Same user experience
- Same backend API structure

The system is now ready for production use with your actual backend API endpoints.
