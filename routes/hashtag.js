const express = require("express");
const { Hashtag, Post, Image, User, Comment } = require("../models");
const router = express.Router();
const { Op } = require("sequelize");

router.get("/:hashtag", async (req, res, next) => {
  // = GET /hashtag/노드
  try {
    if (parseInt(req.query.lastId, 10)) {
      //초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    } //id가 lastId보다 작은 걸로 llimit개 불러와라
    const posts = await Post.findAll({
      limit: 10,
      //  offset: 0, //0~10  0에서 limit 만큼 가져와라

      include: [
        {
          model: Hashtag,
          where: { name: decodeURIComponent(req.params.hashtag) },
        },
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
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
      order: [["createdAt", "DESC"]], //DESC 내림차순 ASC 오름차순
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
