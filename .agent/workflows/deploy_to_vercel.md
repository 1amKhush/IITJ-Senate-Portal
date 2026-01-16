---
description: How to deploy the Next.js project to Vercel
---

# Deploying to Vercel

There are two main ways to deploy this Next.js project to Vercel: using the Vercel CLI or via Git Integration.

## Option 1: Vercel CLI (Recommended for quick testing)

1.  **Login to Vercel**
    If you haven't already, login to your Vercel account via the CLI:
    ```bash
    npx vercel login
    ```

2.  **Deploy**
    Run the deploy command from the root of your project:
    ```bash
    npx vercel
    ```
    - Follow the prompts:
        - Set up and deploy? **Y**
        - Which scope? (Select your account/team)
        - Link to existing project? **N** (unless you already created one)
        - Project name? (Press Enter for default `iitjsenateportal`)
        - In which directory is your code located? (Press Enter for `./`)
        - Want to modify these settings? **N** (Auto-detect is usually correct for Next.js)

3.  **Production Deployment**
    The command above creates a "Preview" deployment. For a production deployment, run:
    ```bash
    npx vercel --prod
    ```

## Option 2: Git Integration (Recommended for CI/CD)

1.  **Push your code** to a Git provider (GitHub, GitLab, or Bitbucket).
2.  **Go to the Vercel Dashboard** (https://vercel.com/dashboard).
3.  Click **"Add New..."** -> **"Project"**.
4.  **Import** your repository.
5.  Vercel will automatically detect that it is a Next.js project.
6.  Click **"Deploy"**.

Your project will now automatically redeploy whenever you push changes to your repository.
