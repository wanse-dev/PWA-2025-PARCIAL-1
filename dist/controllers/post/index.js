"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.giveLike = exports.deletePost = exports.updatePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const post_1 = __importDefault(require("../../models/post"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = new post_1.default(req.body);
        yield post.save();
        res.status(201).json({
            message: "Post created successfully",
            data: post,
            error: false,
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.find().populate("author").populate("likes");
        res.status(200).json({
            message: "Posts obtained successfully",
            data: posts,
            error: false,
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.getPosts = getPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield post_1.default.findById(id).populate("author").populate("likes");
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
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.getPostById = getPostById;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // irá como PATCH, se modifica solo el title, content y author
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;
        const post = yield post_1.default.findByIdAndUpdate(id, { title, content, author, edited: true }, { new: true });
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
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield post_1.default.findByIdAndDelete(id);
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
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.deletePost = deletePost;
const giveLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const { userId } = req.body;
        const post = yield post_1.default.findById(postId);
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
        const updatedPost = yield post_1.default.findByIdAndUpdate(postId, updateOperation, {
            new: true,
        });
        res.status(200).json({
            message: post.likes.includes(userId) ? "Like removed" : "Like given",
            data: updatedPost,
            error: false,
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.giveLike = giveLike;
