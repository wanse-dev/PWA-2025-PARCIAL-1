"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = require("../../controllers/post/");
const router = express_1.default.Router();
router.post("/", post_1.createPost);
router.get("/", post_1.getPosts);
router.get("/:id", post_1.getPostById);
router.patch("/update/:id", post_1.updatePost);
router.delete("/delete/:id", post_1.deletePost);
router.patch("/like/:id", post_1.giveLike);
exports.default = router;
