# SvelteKit Prisma Foundation Boilerplate

A modern, full-stack web application boilerplate built with SvelteKit 5, Prisma, and Foundation Sites. This template provides a solid foundation for building scalable web applications with authentication, database integration, and modern UI components.

## Features

- 🚀 **Svelte 5 via SvelteKit** - Latest version with improved reactivity and performance
- 🎨 **Foundation Sites** - Professional UI framework with responsive grid system
- 🔐 **Authentication** - JWT-based authentication system (not yet implemented)
- 📝 **Prisma ORM** - Type-safe database queries and migrations
- 📧 **Contact Form** - Integrated contact form with SendGrid and reCAPTCHA
- 🎯 **TypeScript** - Full type safety throughout the application
- 🎨 **TailwindCSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Mobile-first approach with Foundation Sites
- 🔍 **SEO Ready** - Built-in meta tags and SEO optimization (not yet implemented)
- 🧪 **Testing** - Playwright for E2E and Vitest for unit testing

## Prerequisites

- Node.js (v18 or higher), althrough I prefer Bun.
- MySQL database
- SendGrid account (for contact form)
- Google reCAPTCHA v3 keys

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/maietta/SvelteKit-Prisma-Foundation-Boilerplate.git
   cd SvelteKit-Prisma-Foundation-Boilerplate
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration values.

4. Set up the database:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/dbname"

# Authentication
JWT_SECRET="your-secret-key"

# Contact Form
SENDGRID_API_KEY="your-sendgrid-api-key"
EMAIL_DESTINATION="your@email.com"
EMAIL_REPLY_TO="no-reply@yourdomain.com"

# reCAPTCHA
PUBLIC_RECAPTCHA_V3_SITE_KEY="your-site-key"
RECAPTCHA_V3_SECRET_KEY="your-secret-key"
```

## Project Structure

```
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable UI components
│   │   ├── foundation/     # Foundation Sites configuration
│   │   └── utils/         # Utility functions
│   ├── routes/
│   │   ├── (auth)/        # Authentication routes
│   │   ├── (dashboard)/   # Protected dashboard routes
│   │   └── contact/       # Contact form route
│   └── app.html           # Base HTML template
├── prisma/
│   └── schema.prisma      # Database schema
└── static/                # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type-check the codebase
- `npm run test` - Run E2E tests
- `npm run test:unit` - Run unit tests
- `npm run lint` - Lint the codebase
- `npm run format` - Format the codebase

## Deployment

This project can be deployed to various platforms:

- Vercel
- CapRover (Recommended)
- Coolify (Also a great recommendation)
- Any Node.js hosting platform

For Vercel deployment:

1. Push your code to GitHub
2. Import the project in Vercel
3. Set up environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [SvelteKit](https://kit.svelte.dev/)
- [Prisma](https://www.prisma.io/)
- [Foundation Sites](https://get.foundation/sites.html)
- [TailwindCSS](https://tailwindcss.com/)
