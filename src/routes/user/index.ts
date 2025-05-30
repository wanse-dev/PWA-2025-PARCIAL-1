import express from "express";
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    disableUser
} from "../../controllers/user/";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.patch("/disable/:id", disableUser);

export default router;