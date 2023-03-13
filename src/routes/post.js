import express from "express";
import PostService from "../service/post.js";
import { isLoggedin } from "../middleware/auth.js";
const router = express.Router();

router.put("/", isLoggedin, PostService.update);
router.post("/", isLoggedin, PostService.create);
router.get("/all", PostService.readAll);
router.get("/:postId", PostService.read);
router.delete("/:postId", isLoggedin, PostService.delete);

export default router;
