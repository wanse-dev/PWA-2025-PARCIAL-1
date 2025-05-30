import express from "express";
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    giveLike
} from "../../controllers/post/";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.patch("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);
router.patch("/like/:postId", giveLike);

export default router;