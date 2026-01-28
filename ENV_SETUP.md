# Environment Variables Setup

## 🎯 Overview

This project uses different environment variable prefixes for **frontend** and **backend** to ensure proper configuration across different deployment platforms.

---

## 📋 Environment Variables Reference

### Frontend (Vite)

All frontend environment variables **must** be prefixed with `VITE_` to be exposed to the browser.

```env
VITE_APP_MODE=website
VITE_SUPABASE_URL=https://deuxfoajfapcgmmewygf.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Usage in code:**

```javascript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

### Backend (Node.js/Express)

Backend environment variables do **not** use the `VITE_` prefix.

```env
SUPABASE_URL=https://deuxfoajfapcgmmewygf.supabase.co
SUPABASE_KEY=your_anon_or_service_key_here
WA_TOKEN=your_whatsapp_token
WA_PHONE_NUMBER_ID=your_phone_number_id
MY_VERIFY_TOKEN=your_verify_token
PORT=3000
```

**Usage in code:**

```javascript
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);
```

---

## 🚀 Deployment

### GitHub Actions (Frontend)

Set these as repository secrets or in your workflow:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Render (Backend)

Set these in the Render dashboard environment variables:

- `SUPABASE_URL`
- `SUPABASE_KEY`
- `WA_TOKEN`
- `WA_PHONE_NUMBER_ID`
- `MY_VERIFY_TOKEN`
- `PORT` (usually auto-set by Render)

---

## 🛠️ Local Development

1. **Copy the example file:**

   ```bash
   cp .env.example .env
   ```

2. **Fill in your actual values** in `.env`

3. **Run the development servers:**

   **Frontend:**

   ```bash
   npm run dev
   ```

   **Backend (in separate terminal):**

   ```bash
   cd server
   node index.js
   ```

---

## ⚠️ Important Notes

- ✅ `.env` is already in `.gitignore` - never commit it!
- ✅ Use `.env.example` as a template for new developers
- ✅ Frontend variables need `VITE_` prefix
- ✅ Backend variables do NOT need `VITE_` prefix
- ✅ Both can coexist in the same `.env` file for local development
