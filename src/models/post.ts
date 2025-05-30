import mongoose, { Schema, Document, Types } from "mongoose";

interface Post extends Document {
  author: Types.ObjectId;
  title: string;
  content: string;
  likes: Types.ObjectId[]; // esto almacena todos los usuarios que dieron like en el post
  edited: boolean;
}

const PostSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // se toma como referencia el id de cada usuario que dió like
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