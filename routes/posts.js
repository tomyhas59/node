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

      order: [
        ["createdAt", "DESC"],
        [Conmment, "createdAt", "DESC"], //최신 게시글부터 로드 <-> ASC
      ],

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
          model: User, //게시글 작성자
          attributes: ["id"],
        },
        {
          model: User,
          as: "Likers",
          attributes: ["id", "nickname"],
        },
        //좋아요 누른 사람
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
