// express 서버
const express = require("express");
// 서버경로

const path = require("path");

// mongoose모듈설치후
const mongoose = require("mongoose");
const { Todo } = require("./model/Todomodel.js");
// 개발 인증관련
const config = require("./config/key.js");

const app = express();
// 포트번호
const port = 5000;
// 고정된 path경로를 설정한다
app.use(express.static(path.join(__dirname, "../client/build/")));
// /req이 들어오면json 사용및 yrl인코팅 진행해줌
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 서버가 req을 받아들기기 위해서 대기중
app.listen(port, () => {
  // MOGODB 관련
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log("DB 연결 성공");
      console.log(`Example app listening on port ${port}`);
    })
    .catch((err) => {
      console.log(`DB 연결 실패 ${err}`);
    });
});
// req:Request
// 응답:Response
app.get("/", (req, res) => {
  // 파일을 보여줌
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
// 테스트 req이 들어왔다

// req:Request
// res:Response


// 할일등록
app.post("/api/post/submit", (req, res) => {
  // console.log(req.body);
  let temp = req.body;
  const todoPost = new Todo(temp);
  todoPost
    .save()
    .then(() => {
      // 데이터저장이 성공한
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      // 데이터저장이 실패한
      console.log(err);
      res.status(400).json({ status: false });
    });
});
// 목록 읽어오기
app.post("/api/post/list", (req, res) => {
  console.log("전체목록 호출");
  Todo.find({})
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({ success: true, initTodo: doc });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false });
    });
});
