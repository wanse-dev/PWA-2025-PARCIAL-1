import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  username: string;
  email: string;
  isActive: boolean;
}

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model<User>("User", UserSchema);

export default User;