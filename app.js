const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const cors = require("cors");
const express = require("express");

const app = express();
const db = require("./models");
const passportConfig = require("./passport");

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
passportConfig();

app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use(express.json()); //req.body의 데이터를 보내는 역할
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/", (req, res) => {
  res.send("hello api");
});

app.get("/posts", (req, res) => {
  res.json([{ id: 1, content: "hello" }]);
});

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행중");
});
