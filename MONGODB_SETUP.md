# MongoDB Setup Guide for MedLink

## Issue
The error `ECONNREFUSED ::1:27017` means MongoDB is not running on your local machine.

## Solution Options

### Option 1: Install & Start MongoDB Locally (Recommended for Development)

#### Install MongoDB on macOS:
```bash
# Install MongoDB using Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB as a service
brew services start mongodb-community@7.0

# Verify MongoDB is running
mongosh
```

### Option 2: Use MongoDB Atlas (Cloud - Free Tier Available)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (Free M0 tier)
4. Get your connection string
5. Update `server/.env`:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/medlink?retryWrites=true&w=majority
   ```

### Option 3: Use Docker

```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# To stop
docker stop mongodb

# To start again
docker start mongodb
```

## After MongoDB is Running

1. Seed the database:
   ```bash
   cd server
   npm run seed
   ```

2. Start the server:
   ```bash
   npm run dev
   ```

## Verify Connection
If seeding is successful, you'll see:
```
🌱 Seeding data...
MongoDB Connected: localhost
✅ Hospital seeded
✅ Admin user seeded
✅ Doctor user seeded
✅ Doctor profile seeded
🎉 Seeding complete!
```
