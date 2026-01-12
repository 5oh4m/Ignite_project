# 🔧 Authentication Fix Guide

## Problem Identified
Your backend API is crashing with a **500 INTERNAL_SERVER_ERROR** because:
1. ❌ **Missing Environment Variables** - MONGODB_URI and JWT_SECRET are not set in Vercel
2. ❌ **Backend Cannot Start** - The serverless function fails to initialize without database connection
3. ❌ **CORS Errors** - Secondary issue once backend is fixed

## Error Details
```
Status: 500 INTERNAL_SERVER_ERROR
Code: FUNCTION_INVOCATION_FAILED
CORS Error: Access to XMLHttpRequest blocked - No 'Access-Control-Allow-Origin' header
```

---

## 🚀 How to Fix (Step-by-Step)

### Step 1: Add Environment Variables in Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your backend project**: `ignite-project-nu9h` (or whatever you named it)
3. **Click "Settings" tab**
4. **Click "Environment Variables" in the left sidebar**
5. **Add the following variables:**

#### Variable 1: MONGODB_URI
- **Name**: `MONGODB_URI`
- **Value**: `mongodb+srv://tejugeeta746_db_user:YOUR_PASSWORD@cluster0.txffgyi.mongodb.net/medlink?retryWrites=true&w=majority&appName=Cluster0`
- **Environment**: Select all (Production, Preview, Development)
- **Replace `YOUR_PASSWORD`** with your actual MongoDB Atlas password

#### Variable 2: JWT_SECRET
- **Name**: `JWT_SECRET`
- **Value**: `eb0d2c184d7e701a74b865cbb1c01d0ee1fcddad2e3dcb074d64b4f150160836dd9497b94e849573cc90d4a46aafd09d65b182e6064b31f52815853c4479dd2f`
- **Environment**: Select all (Production, Preview, Development)

#### Variable 3: NODE_ENV (Optional but recommended)
- **Name**: `NODE_ENV`
- **Value**: `production`
- **Environment**: Production only

6. **Click "Save"** after adding each variable

### Step 2: ⚠️ CRITICAL: Allow All IPs (Fix Timeout Error)
**Error: `buffering timed out` means Vercel cannot reach MongoDB.**

1. Go to **MongoDB Atlas**: https://cloud.mongodb.com
2. Click on **Network Access** in the left sidebar
3. ❌ If you only see your current IP, **IT WILL FAIL**.
4. ✅ Click **"Add IP Address"**
5. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
6. Click **"Confirm"** and wait for it to become "Active" (green)

### Step 3: Redeploy Your Backend

After adding the environment variables, you MUST redeploy:

**Option A: Via Vercel Dashboard**
1. Go to your backend project in Vercel
2. Click on the **"Deployments"** tab
3. Find the latest deployment
4. Click the **three dots (⋮)** menu
5. Select **"Redeploy"**
6. Confirm the redeployment

**Option B: Via CLI**
```bash
cd /Users/5oh4m/Desktop/ignite_proj/Ignite_project/server
npx vercel --prod
```

**Option C: Push to GitHub (Triggers Auto-Deploy)**
```bash
cd /Users/5oh4m/Desktop/ignite_proj/Ignite_project
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

### Step 4: Verify the Fix

After redeployment (wait 1-2 minutes):

1. Visit: https://ignite-project-nu9h.vercel.app/
   - **Expected**: You should see "MedLink API is running..."
2. Visit: https://ignite-project-hl6e.vercel.app/auth
   - **Try to register** a new account
   - **Try to login**

---

## 📋 Quick Checklist

- [ ] Add MONGODB_URI to Vercel environment variables
- [ ] Add JWT_SECRET to Vercel environment variables
- [ ] Add NODE_ENV to Vercel environment variables (optional)
- [ ] Verify MongoDB Atlas allows 0.0.0.0/0 IP access
- [ ] Redeploy backend on Vercel
- [ ] Wait 1-2 minutes for deployment
- [ ] Test backend at https://ignite-project-nu9h.vercel.app/
- [ ] Test authentication at https://ignite-project-hl6e.vercel.app/auth

---

## 🔍 How to Check Vercel Logs (If Still Failing)

1. Go to Vercel Dashboard → Your Backend Project
2. Click **"Deployments"** tab
3. Click on the latest deployment
4. Click **"Functions"** tab
5. Click on any function to see logs
6. Look for error messages about missing variables or database connection

---

## ✅ Expected Behavior After Fix

- ✅ Backend API responds with "MedLink API is running..."
- ✅ Registration creates new user accounts
- ✅ Login authenticates users successfully
- ✅ No CORS errors in browser console
- ✅ No 500 errors

---

## 🆘 If Issues Persist

Check:
1. MongoDB password is correct (no special characters that need encoding)
2. MongoDB database name is `medlink` in connection string
3. All environment variables are saved and deployment was triggered after adding them
4. MongoDB Atlas cluster is active (not paused)
