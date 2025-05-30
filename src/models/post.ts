import mongoose, { Schema, Document } from "mongoose";
import User from "./user";

interface Post extends Document {
  author: User;
  title: string;
  content: string;
  likes: User[]; // esto almacena todos los usuarios que dieron like en el post
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
            likes: [{ type: Schema.Types.ObjectId, ref: "User" }] // se toma como referencia el id de cada usuario que dió like
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