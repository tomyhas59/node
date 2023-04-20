const express = require("express");
const { User, Post } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");

const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.error);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        //["id", "nickname", "email"], <- 이것만 가져오겠다
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: "Followings",
          },
          {
            model: User,
            as: "Followers",
          },
        ],
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});
router.post("/", isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용 중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3060");
    res.status(200).send("ok"); //200 성공, 201 잘 생성됨
  } catch (error) {
    console.error(error);
    next(error); //status 500임
  }
});

router.post("/logout", isLoggedIn, (req, res, next) => {
  console.logg(req.user);
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
