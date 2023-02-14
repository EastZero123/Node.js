var express = require("express")
var parseurl = require("parseurl")
var session = require("express-session") // 세션 구현에 필요한 라이브러리 불러온다

var app = express()

app.use(
  session({
    // 세션에 옵션을 더해 등록
    secret: "keyboard cat", // session 하이재킹을 방지해주는 구문 설정
    resave: false, // 기존 session에 변동이 없어도 다시 저장 여부
    saveUninitialized: true, // 새로 생성된 session에 아무런 작업이 없어도 저장 여부
  })
)

app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {} // views 라는 세션이 없으면 새로 만든다
  }

  // get the url pathname
  console.log(parseurl(req))
  var pathname = parseurl(req).pathname // pathname에 '/path명'이 들어간다

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1 // 최초값을 0으로 주고 이후 증가 시킨다

  next()
})

app.get("/foo", function (req, res, next) {
  // localhost:3000/foo 로 접속하면
  res.send("you viewed this page " + req.session.views["/foo"] + " times") // 세션이 생겨서 누적해서 증가한다
})

app.get("/bar", function (req, res, next) {
  // localhost:3000/bar 로 접속하면
  res.send("you viewed this page " + req.session.views["/bar"] + " times") // 세션이 생겨서 누적해서 증가한다
})

app.listen(3000, function () {
  console.log("3000!")
})
