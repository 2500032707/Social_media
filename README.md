# Connectly — Social Media Platform

A responsive React + Vite social media application built for a college project.

## Features
- React + Vite project structure
- Signup and login with Local Storage persistence
- Role-based User and Admin modules
- User feed: create posts, attach an image URL, like posts, comment, share post text
- Explore and community member pages
- User profiles and editable bio
- Admin dashboard: view platform stats, remove users, and moderate posts
- Responsive desktop and mobile UI

## Demo accounts
- User: `alex@connectly.demo` / `demo123`
- Admin: `admin@connectly.demo` / `admin123`

New signups are automatically assigned the `user` role. Admin access is provided by the demo admin account.

## Run locally
1. Install Node.js (LTS).
2. Extract this folder and open it in VS Code.
3. Open the terminal in this folder and run:

```bash
npm install
npm run dev
```

4. Open the local URL shown by Vite (usually `http://localhost:5173`).

## Build check
```bash
npm run build
```
The production website is generated in the `dist` folder.

## Deploy to Vercel
1. Push this project to a GitHub repository.
2. Sign in to Vercel using GitHub and choose **Add New → Project**.
3. Import your `social-media-platform` repository.
4. Framework preset: **Vite**.
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**.

## Push to GitHub
Create an empty repository on GitHub, then run these commands in this project folder:

```bash
git init
git add .
git commit -m "Initial social media platform"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/social-media-platform.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Important project note
This is a frontend academic demo. Local Storage is browser-specific and is not secure authentication. The demo passwords and role data are stored in the browser. For a real production social network, use a backend, database, secure password hashing, and server-side authorization.