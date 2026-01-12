# Frontend Deployment Quick Guide

## ✅ Backend Deployed Successfully!
**Backend URL**: https://ignite-project-nu9h.vercel.app/

## 🚀 Deploy Frontend Now

### Step 1: Push Production Config (if needed)
```bash
cd /Users/5oh4m/Desktop/ignite_proj/Ignite_project
git add .
git commit -m "Add production environment config"
git push origin main
```

### Step 2: Deploy Frontend to Vercel

#### Option A: Via Vercel Website (Recommended)
1. Go to https://vercel.com/new
2. Import your repository: `5oh4m/Ignite_project`
3. Configure the project:
   - **Project Name**: `ignite-frontend` (or your choice)
   - **Root Directory**: `client` ⚠️ **IMPORTANT**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://ignite-project-nu9h.vercel.app/api`
5. Click **Deploy**

#### Option B: Via CLI
```bash
cd client
npx vercel

# When prompted:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - Project name? ignite-frontend
# - Directory? ./
# - Override settings? No

# After deployment, add environment variable
npx vercel env add VITE_API_URL
# Enter: https://ignite-project-nu9h.vercel.app/api

# Deploy to production
npx vercel --prod
```

## 📝 Environment Variables Reference

### Frontend (.env.production - already created ✅)
```
VITE_API_URL=https://ignite-project-nu9h.vercel.app/api
```

### Backend (in Vercel Dashboard)
- `MONGODB_URI`: mongodb+srv://tejugeeta746_db_user:PASSWORD@cluster0.txffgyi.mongodb.net/medlink?retryWrites=true&w=majority&appName=Cluster0
- `JWT_SECRET`: supersecret_jwt_key_change_in_production
- `NODE_ENV`: production

## 🔒 Security: Update CORS (Optional - After Frontend Deployed)

Once frontend is deployed, you can update backend CORS to be more secure:

In `server/src/server.js`, change:
```javascript
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://your-frontend-domain.vercel.app'
    ],
    credentials: true,
}));
```

## ✅ Checklist
- [x] Backend deployed
- [x] Created .env.production for frontend
- [ ] Deploy frontend to Vercel
- [ ] Test the deployed application
- [ ] (Optional) Update CORS with frontend URL

## 🎯 Next: Deploy your frontend using one of the methods above!
