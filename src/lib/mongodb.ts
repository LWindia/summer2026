// lib/mongodb.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI! || 'mongodb://localhost:27017/nextjs-mongodb'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

interface ConnectionCache {
  isConnected?: number;
}

const cache: ConnectionCache = {}

async function dbConnect(): Promise<typeof mongoose> {
  if (cache.isConnected) {
    return mongoose
  }

  try {
    const db = await mongoose.connect(MONGODB_URI)
    cache.isConnected = db.connections[0].readyState
    return db
  } catch (error) {
    throw new Error('Error connecting to MongoDB')
  }
}

export default dbConnect







