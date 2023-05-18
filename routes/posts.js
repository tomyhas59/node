const express = require("express");

const { Post, Image, User, Comment } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

router.get("/", async (req, res, next) => {
  // = GET /posts
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      //초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    } //id가 lastId보다 작은 걸로 llimit개 불러와라
    const posts = await Post.findAll({
      where,
      limit: 10,
      //  offset: 0, //0~10  0에서 limit 만큼 가져와라

      include: [
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
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
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
      ],
      order: [["createdAt", "DESC"]], //DESC 내림차순 ASC 오름차순
    });
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
