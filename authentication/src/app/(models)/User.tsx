import mongoose, { Schema } from "mongoose";


// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";
// mongoose.connect(MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise;

const userSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;