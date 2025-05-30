import express from "express";
import userRouter from "./user/";
import PostRouter from "./post/";

const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", PostRouter);

export default router;