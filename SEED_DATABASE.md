# 🌱 How to Populate Your Database (Hospitals & Doctors)

Your database is currently empty, which is why "No Hospitals" are showing.
I have created a script to fill it with sample data (5 Hospitals, 1 Admin, 5 Doctors).

## Step 1: Run the Seed Command

Open your terminal in VS Code (ensure you are in `Ignite_project` folder) and run this command:

**⚠️ IMPORTANT: Replace `YOUR_REAL_PASSWORD` with the actual password you set in MongoDB Atlas!**

```bash
cd server
MONGODB_URI="mongodb+srv://tejugeeta746_db_user:YOUR_REAL_PASSWORD@cluster0.txffgyi.mongodb.net/medlink?retryWrites=true&w=majority&appName=Cluster0" npm run seed
```

## Step 2: Verify Success

You should see output like:
```
🌱 Seeding data...
✅ MongoDB Connected: ...
✅ Hospital seeded: City General Hospital
✅ Hospital seeded: Westside Medical Center
...
🎉 Seeding complete!
```

## Step 3: Refresh Your App

1. Go to your live website.
2. Refresh the page.
3. Try "Book Appointment" again - you should see hospitals in the dropdown!
