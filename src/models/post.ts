import mongoose, { Schema, Document } from "mongoose";
import User from "./user";

interface Post extends Document {
  author: User;
  title: string;
  content: string;
  likes: User[];
  edited: boolean;
}

const PostSchema = new Schema(
    {
        author: {
            type: User
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        likes: {
            likes: [{ type: Schema.Types.ObjectId, ref: "User" }]
        },
        edited: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
    timestamps: true,
  }
);

const Post = mongoose.model<Post>("Post", PostSchema);

export default Post;