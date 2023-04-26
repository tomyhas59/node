/*import express from "express";
import session from "express-session";
const app = express();

app.set("port", 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "node=secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 5 * 60000,
    },
  })
);
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "1234" && password === "1234") {
    req.session.member = {
      email,
      password,
    };
    res.status(201).send({ message: "success" });
  } else {
    res.status(403).send({
      message: "failure",
      error: "아이디 혹은 비밀번호가 틀렸습니다",
    });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("로그아웃이 실행되었습니다.");
  });
  res.status(200).send({ message: "success" });
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번으로 서버 실행중`);
});
*/