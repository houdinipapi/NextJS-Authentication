import mongoose, { Schema } from "mongoose";

// MongoDB connection URI from environment variable
const MONGODB_URI = process.env.MONGODB_URI;

// Check if MONGODB_URI is provided
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Mongoose connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Singleton pattern for mongoose connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Define User schema with validation
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create User model if it doesn't exist
const User = mongoose.models.User || mongoose.model("User", userSchema);

export { connectToDatabase, User };
