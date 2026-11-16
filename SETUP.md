# 90 — THE RESET · Supabase setup

Files: `index.html` (the app), `config.js` (your keys), `schema.sql` (database).
Put all three in your `90days` GitHub repo (replace the old `index.html`, `app.js`, `styles.css`), keeping `schema.sql` in a `supabase/` folder if you like.

## 1. Create the Supabase project
1. Sign up at supabase.com and create a new project (free plan is fine for building and beta). Choose a region close to your users, e.g. Mumbai.
2. Save the database password somewhere safe.

## 2. Create the tables
Open **SQL Editor**, paste all of `schema.sql`, and run it. It creates:
- `user_data`: one row per user with their planner data. Row-level security means each person can read and write only their own row.
- `entitlements`: paid-access records. Users can read only their own; nothing in the browser can write to it. Your server will write it after verifying a Razorpay payment (December step).

## 3. Configure login
Under **Authentication**:
- **URL configuration**: set the Site URL to your live address (for example `https://app.createrepeat.in`) and add that address, plus `http://localhost:8000`, to the allowed redirect URLs.
- **Email provider**: keep email + password on. Keep "confirm email" on for real users.
- **Password rules**: set the minimum length to 8 to match the app.
- **Email sending**: Supabase's built-in email sender is meant for testing and is rate-limited. Before launch, connect your own SMTP sender (for example from your domain's email provider) so confirmation and reset emails reliably reach buyers. Check Supabase's current docs for limits.

## 4. Add your keys
In **Project Settings → API**, copy the Project URL and the **anon / public** key into `config.js`.
- The anon key is meant to be public; the row-level security in `schema.sql` is what protects data.
- **Never** put the `service_role` key in `config.js` or any browser file. It bypasses all security.

## 5. Test locally
In the repo folder run `python -m http.server 8000`, open `http://localhost:8000`, then:
- Create an account, confirm via the email link, sign in.
- Set up your reset, tick a habit, wait a second, then check the `user_data` table in Supabase for your row.
- Sign out and sign back in (also from a second browser): your data should come back.
- Create a second account and confirm it sees none of the first account's data.
- Try "Forgot password?" end to end.

## 6. Deploy
Connect the GitHub repo to a static host (Cloudflare Pages, Netlify or Vercel), then point `app.createrepeat.in` (or your chosen address) at it. Re-check the Site URL and redirect URLs in step 3 to match.

## How it behaves
- Empty `config.js` = local-only mode (browser storage, no login), handy for design work.
- With keys set, login is required; data is saved to the cloud about a second after each change and also kept in the browser.
- If cloud loading fails, the app will not overwrite your saved cloud data.
- First sign-in on a device that already has local progress and an empty cloud account uploads that progress.

## Not done yet
- Payment gating (access only for paying users): planned for Dec 6–10, with Razorpay verification on a server writing to `entitlements`.
- Verified against a real Supabase project: not yet. I tested the flow with a simulated Supabase client, so run the step 5 checks before inviting anyone.
