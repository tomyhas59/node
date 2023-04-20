const express = require("express");

const { Post } = require("../models");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const comment = require("../models/comment");

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      userId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User,
          attributes: ["id", "email"],
        },
      ],
    });
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다");
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      userId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User,
          attributes: ["id", "email"],
        },
      ],
    });
    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
module.exports = router;
