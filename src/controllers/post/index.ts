import Post from "../../models/post";
import User from "../../models/user";
import { Request, Response } from "express";

const createPost = async (req: Request, res: Response) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json({
      message: "Post created successfully",
      data: post,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("author").populate("likes");
    res.status(200).json({
      message: "Posts obtained successfully",
      data: posts,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author").populate("likes");
    if (!post) {
      res.status(404).json({
        message: "Post not found",
        error: true,
      });
      return;
    }
    res.status(200).json({
      message: "Post obtained successfully",
      data: post,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  // irá como PATCH, se modifica solo el title, content y author
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;
    const post = await Post.findByIdAndUpdate(
      id,
      { title, content, author, edited: true },
      { new: true }
    );
    if (!post) {
      res.status(404).json({
        message: "Post not found",
        error: true,
      });
      return;
    }
    res.status(200).json({
      message: "Post updated successfully",
      data: post,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      res.status(404).json({
        message: "Post not found",
        error: true,
      });
      return;
    }
    res.status(200).json({
      message: "Post deleted successfully",
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const giveLike = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const { userId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({
        message: "Post not found",
        error: true,
      });
      return;
    }

    const updateOperation = post.likes.includes(userId)
      ? { $pull: { likes: userId } } // si ya dio like, quitarlo
      : { $addToSet: { likes: userId } }; // si no dio like, agregarlo (y evitar duplicado)

    const updatedPost = await Post.findByIdAndUpdate(postId, updateOperation, {
      new: true,
    });

    res.status(200).json({
      message: post.likes.includes(userId) ? "Like removed" : "Like given",
      data: updatedPost,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export { createPost, getPosts, getPostById, updatePost, deletePost, giveLike };
