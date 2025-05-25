# Remote IT Help Site

This repository contains the source for **Remote IT Help**, the landing page clients use to start a secure remote support session with IT Help San Diego. The site is built with [Astro](https://astro.build/) and styled with Tailwind CSS.

The main page instructs users to run a one‑line command that downloads a helper script and opens a screen‑sharing session. No tracking or session data is stored on the server.

## Development

```bash
npm install
npm run dev
```

Running `npm run dev` starts the local development server on `http://localhost:4321`.

## Building

To generate the static site, run:

```bash
npm run build
```

The output is written to the `dist` directory.

## Deployment

Deployments are handled automatically via GitHub Actions. Commits pushed to the `main` branch trigger the `deploy` workflow, which:

1. Builds the site with `npm run build`.
2. Syncs the contents of `dist` to the S3 bucket `remote-it-help.com`.
3. Invalidates the associated CloudFront distribution so changes go live immediately.

You can also serve the built site with any static hosting service by uploading the `dist` directory.
