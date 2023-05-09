const express = require("express");

const { Post, Image, User, Conmment } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // = GET /posts
  try {
    const posts = await Post.findAll({
      //where: { id: lastId },
      limit: 2,
      //  offset: 0, //0~10  0에서 limit 만큼 가져와라

      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Conmment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
              order: [["createdAt", "DESC"]],
            },
          ],
        },
        {
          model: User,
          through: "Like",
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
