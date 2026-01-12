# Deploying Ignite Medical App to Vercel

## Overview
This guide will help you deploy both the frontend (React/Vite) and backend (Node.js/Express) to Vercel.

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- Git repository (push your code to GitHub, GitLab, or Bitbucket)
- MongoDB Atlas account for production database

---

## Part 1: Deploy Backend (API)

### Step 1: Prepare Backend Environment Variables
You'll need to set these environment variables in Vercel:
- `MONGODB_URI` - Your MongoDB connection string (use MongoDB Atlas)
- `JWT_SECRET` - Your JWT secret key
- `NODE_ENV` - Set to "production"

### Step 2: Deploy Backend to Vercel

**Option A: Using Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to server directory
cd /Users/5oh4m/Desktop/ignite_proj/Ignite_project/server

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - Project name? ignite-api (or your preferred name)
# - Directory? ./
# - Override settings? No

# After deployment, set environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET

# Redeploy with environment variables
vercel --prod
```

**Option B: Using Vercel Website**
1. Go to https://vercel.com/new
2. Import your repository
3. Select the `server` directory as the root
4. Vercel will auto-detect it as a Node.js project
5. Add environment variables in the settings:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
6. Click "Deploy"

**Note your backend URL** (e.g., `https://ignite-api.vercel.app`)

---

## Part 2: Deploy Frontend (Client)

### Step 1: Update API URLs in Frontend
Before deploying, you need to update your API base URL:

1. Create/update your API configuration file
2. Replace `http://localhost:5001` with your Vercel backend URL

### Step 2: Deploy Frontend to Vercel

**Option A: Using Vercel CLI**
```bash
# Navigate to client directory
cd /Users/5oh4m/Desktop/ignite_proj/Ignite_project/client

# Deploy
vercel

# Follow the prompts
# After successful deployment, deploy to production
vercel --prod
```

**Option B: Using Vercel Website**
1. Go to https://vercel.com/new
2. Import your repository (if not already imported)
3. Select the `client` directory as the root
4. Framework Preset: Vite
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Add environment variables if needed (e.g., `VITE_API_URL`)
8. Click "Deploy"

---

## Part 3: Database Setup (MongoDB Atlas)

Since you can't use localhost MongoDB in production:

### Step 1: Create MongoDB Atlas Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (Free tier is fine)
4. Create a database user
5. Whitelist all IP addresses (0.0.0.0/0) or specific IPs
6. Get your connection string

### Step 2: Update Connection String
Your connection string should look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/medlink?retryWrites=true&w=majority
```

Add this as `MONGODB_URI` in your Vercel backend environment variables.

---

## Part 4: Final Configuration

### Update CORS Settings
In your backend `server.js`, update CORS to allow your Vercel frontend:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend-app.vercel.app'
  ],
  credentials: true
}));
```

---

## Quick Deployment Checklist

- [ ] Push code to GitHub/GitLab/Bitbucket
- [ ] Create MongoDB Atlas cluster
- [ ] Get MongoDB connection string
- [ ] Deploy backend to Vercel
- [ ] Add environment variables to backend
- [ ] Note backend URL
- [ ] Update frontend API configuration with backend URL
- [ ] Deploy frontend to Vercel
- [ ] Test the deployed application
- [ ] Update CORS settings if needed

---

## Alternative: Deploy Backend Elsewhere

If you prefer, you can deploy the backend to:
- **Render.com** (Free tier available, better for long-running servers)
- **Railway.app** (Easy deployment for Node.js apps)
- **Heroku** (Paid only now)
- **DigitalOcean App Platform**

Vercel is optimized for serverless functions, so traditional backends might work better on other platforms.

---

## Troubleshooting

### Common Issues:

1. **API calls failing**: Check CORS settings and API URL configuration
2. **Database connection errors**: Verify MongoDB Atlas connection string and IP whitelist
3. **Build failures**: Check build logs in Vercel dashboard
4. **Environment variables not working**: Redeploy after adding env vars
5. **Routes not working**: Make sure `vercel.json` is properly configured

---

## Need Help?

If you encounter issues during deployment, let me know and I can help troubleshoot!
