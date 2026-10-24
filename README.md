# VillagKart Official Web Platform

Full, exact clone of the [VillagKart](https://villagkart.com) website including all pages, blogs, styles, scripts, and high-resolution banner assets.

## Overview

VillagKart is a technology-driven rural commerce platform transforming how villages access products, services, and business opportunities across India through Mandal-level business hubs, ONDC digital marketplace integration, and last-mile delivery networks.

## Features & Pages Included

- **Home (`/`)**: Dynamic banner slider, animated statistics counters, interactive features showcase, product categories grid, community highlights, and call-to-action sections.
- **About Us (`/about`)**: Story, vision, mission, and company values.
- **Hub & Spoke Model (`/model`)**: Mandal hub infrastructure, logistics flow, and village spoke operational architecture.
- **Ecosystem (`/ecosystem`)**: Digital platform overview, ONDC network connection, and MSME integration.
- **Partners (`/partners`)**: Retail partners, hub operators, delivery partners, and supplier onboarding sections.
- **Blog & Articles (`/blog`)**:
  - `mini-dmart-mandal-hub-success`: Mini D-Mart Evolution & Mandal Hub Success Story.
  - `ondc-integration-rural-commerce-india`: How ONDC Integration is Changing Rural Commerce in India.
  - `villagkart-launches-hub-spoke-model`: Hub & Spoke Distribution Model Launch.
  - `fpo-farmers-digital-markets`: Empowering FPOs and Farmers with Digital Marketplaces.
  - `empowering-rural-women-entrepreneurs`: Empowering Rural Women Entrepreneurs.
- **Contact Us (`/contact`)**: Interactive contact form with automated feedback and support channels.

## Project Structure

```text
villagkart-web/
├── index.html
├── about.html
├── model.html
├── ecosystem.html
├── partners.html
├── blog.html
├── contact.html
├── about/index.html
├── model/index.html
├── ecosystem/index.html
├── partners/index.html
├── blog/
│   ├── index.html
│   ├── mini-dmart-mandal-hub-success.html
│   ├── ondc-integration-rural-commerce-india.html
│   ├── villagkart-launches-hub-spoke-model.html
│   ├── fpo-farmers-digital-markets.html
│   ├── empowering-rural-women-entrepreneurs.html
│   └── [slug]/index.html
├── contact/index.html
├── static/
│   ├── style.css
│   ├── banner.css
│   ├── main.js
│   ├── logo.png
│   ├── favicon.png
│   └── banners/
│       ├── banner1.jpg
│       ├── banner2.jpg
│       ├── banner3.jpg
│       ├── banner4.jpg
│       └── banner5.jpg
├── package.json
├── server.mjs
└── vercel.json
```

## Running Locally

To run the local development server:

```bash
npm run dev
```

or:

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

- **Vercel / Netlify**: Ready out of the box with `vercel.json` configured for clean URLs.
- **Static Hosting**: Directory-based `index.html` structure allows immediate deployment to GitHub Pages, AWS S3, Cloudflare Pages, or any static host.
