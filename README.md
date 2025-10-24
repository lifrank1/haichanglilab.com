# Dr. Haichang Li Lab Website

A professional academic website for Dr. Haichang Li, Assistant Professor at The Ohio State University College of Veterinary Medicine.

## Features

- **Home Page**: Research overview and impact statement
- **People Page**: Principal investigator profile with contact information
- **Publications Page**: Searchable and sortable research publications
- **Contact Page**: Direct contact information
- **Responsive Design**: Optimized for all devices
- **OSU Branding**: Consistent Ohio State University theming

## Technology Stack

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Static Site Generation** for GitHub Pages deployment

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment Steps

1. **Configure GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"
   - The workflow will automatically deploy on push to main

2. **Custom Domain Setup** (Namecheap):
   - Add CNAME file: `yourdomain.com`
   - Configure DNS:
     - A Record: `@` → `185.199.108.153`
     - CNAME: `www` → `yourusername.github.io`

3. **SSL Certificate**:
   - Automatically provided by GitHub Pages
   - Enable "Enforce HTTPS" in Pages settings

## Project Structure

```
├── app/
│   ├── components/     # Reusable components
│   ├── people/         # People page
│   ├── publications/   # Publications page
│   ├── contact/        # Contact page
│   └── page.tsx        # Home page
├── data/               # Static data (publications)
├── public/             # Static assets
└── .github/workflows/  # GitHub Actions
```

## Contact

For questions about this website, contact Dr. Haichang Li at li.3714@osu.edu