/*import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const app = express();

app.set("port", 3000);
app.use(cookieParser("secret"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();
app.post("/setcookie", (req, res, next) => {
  try {
    res.cookie(
      "token",
      { token: "token", expired: 5 * 60000 },
      {
        maxAge: 5 * 60000,
        httpOnly: true,
        // secure: true,
        //  signed: true,
      }
    );
    res.send({ massage: "success" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.get("/showcookie", (req, res) => {
  res.send(req.cookies.token);
});

app.post("/clearcookie", (req, res) => {
  res.clearCookie("token");
  res.send({ massage: "success" });
});

app.post("/jwtsetcookie", (req, res, next) => {
  try {
    const token = jwt.sign(
      { email: req.body.email },
      process.env.SECRET_JWT_TOKEN_KEY
    );
    res.cookie("access_token", token, { httpOnly: true });
    res.header("authorize", token);
    res.send({ message: "success" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.get("/jwtshowcookie", (req, res) => {
  const token = req.cookies.access_token;
  console.log(jwt.verify(token, process.env.SECRET_JWT_TOKEN_KEY));
  res.send(req.cookies.access_token);
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번으로 서버 실행중`);
});
*/