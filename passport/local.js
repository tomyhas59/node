const passport = require("passport");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { Strategy: LocalStrategy } = require("passport-local");
const passportConfig = {
  usernameField: "email", //req.body.email 과 같음
  passwordField: "password",
};

const passportVerify = async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return done(null, false, {
        error: "가입된 이메일이 없습니다",
      });
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      return done(null, user); //두번째 인자가 성공or실패, 성공하면 정보 넘겨줌
    } else {
      return (
        done(null, false),
        {
          error: "비밀번호가 올바르지 않습니다",
        }
      );
    }
  } catch (error) {
    console.log(error);
    return done(error);
  }
};

module.exports = () => {
  passport.use("local", new LocalStrategy(passportConfig, passportVerify));
};
