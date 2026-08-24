# Holistic Impact Hub — Website + Content Editor

This is a **Jekyll** site (a static site generator). Instead of one giant HTML file, all your
editable text and images live in simple data files under `_data/`, and there's a built-in
editing dashboard at `/admin` powered by **Decap CMS** (free, open-source, no monthly fee).

## What you can edit without touching code

Go to `yourdomain.com/admin` once it's live, log in, and you can edit:
- Hero headline, subtext, buttons, hero photo, hero stat
- About section text, photo, bullet points, SDG badges
- "Theory of Change" steps
- All 6 program cards (title, description, photo)
- Impact numbers/stats
- Testimonials
- Get Involved options
- Contact details, emails, social links
- Footer tagline

Anything structural (adding whole new sections, changing the layout/design) still needs
a developer — but all day-to-day content updates can be done by anyone on your team, no
code required.

## One-time setup (about 10–15 minutes, using Netlify)

Netlify is the recommended host here: its free tier has no "personal use only" restriction
(unlike some competitors), and it has built-in tools that make the `/admin` editor work with
almost no configuration.

### 1. Push this project to GitHub
1. Create a new repository on GitHub (e.g. `holisticimpacthub-website`).
2. Upload/push all these files into it.

### 2. Deploy to Netlify
1. Go to https://app.netlify.com and sign up (free, no credit card required).
2. Click **"Add new site" → "Import an existing project"** and connect it to your GitHub repo.
3. Netlify auto-detects Jekyll. Build command: `bundle exec jekyll build`. Publish directory: `_site`.
4. Click **Deploy**. You'll get a live URL like `random-name-123.netlify.app` within a minute or two.
5. Once you're ready, go to **Site settings → Domain management** and add your custom domain
   (`holisticimpacthub.org`), then update your domain's DNS as Netlify instructs.

### 3. Turn on the editing dashboard (no OAuth app needed)
1. In your Netlify site dashboard, go to **Site settings → Identity → Enable Identity**.
2. Under **Identity → Registration**, set it to **"Invite only"** (so random people can't sign
   themselves up).
3. Scroll to **Services → Git Gateway** and click **Enable Git Gateway**. This is what lets the
   `/admin` dashboard save changes back to your repo — no GitHub OAuth app required.
4. Go to the **Identity** tab and click **"Invite users"** — invite yourself and anyone else who
   should be able to edit content. They'll get an email to set a password.
5. Open `admin/config.yml` in the repo and change the backend block from:
   ```yaml
   backend:
     name: github
     repo: YOUR-GITHUB-USERNAME/YOUR-REPO-NAME
     branch: main
   ```
   to:
   ```yaml
   backend:
     name: git-gateway
     branch: main
   ```
6. Visit `yourdomain.com/admin`, log in with the email/password from your invite, and you're in.

That's it — no OAuth app, no Vercel deploy, no client ID/secret. Netlify Identity + Git Gateway
handles all of it.

> **Note:** if you'd still rather use GitHub Pages instead of Netlify hosting, the original
> GitHub OAuth-based instructions are further down — but Netlify is the simpler and safer
> default for this project.



## Editing content directly (no dashboard)

If you're comfortable in GitHub, you can also just edit the `.yml` files under `_data/` right
in the GitHub website — every save automatically rebuilds and republishes the live site.

## Local preview (optional, for developers)

```bash
gem install bundler
bundle install
bundle exec jekyll serve
```
Then open `http://localhost:4000`.

## Folder structure

```
_data/site.yml          → most page text (hero, about, approach, impact, contact, footer)
_data/programs.yml      → the 6 program cards
_data/testimonials.yml  → testimonials
_layouts/default.html   → header/footer/page shell (rarely needs editing)
index.html              → homepage section order (rarely needs editing)
assets/css/style.css    → all styling
assets/js/main.js       → mobile menu, counters, form handling
assets/images/          → logo files
admin/                  → the Decap CMS dashboard
```
