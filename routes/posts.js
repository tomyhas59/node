const express = require("express");

const { Post, Image, User, Conmment } = require("../models");
const { json } = require("sequelize");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      //where: { id: lastId },
      limit: 10,
      offset: 0, //0~10  0에서 limit 만큼 가져와라

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
            },
          ],
        },
      ],
    });
    console.log(posts);
    res.status(200), json(posts);
  } catch (erorr) {
    console.error(erorr);
    next(erorr);
  }
});

module.exports = router;
