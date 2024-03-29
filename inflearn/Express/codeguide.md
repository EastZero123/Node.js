# Code Guide

# Express.js?

- https://expressjs.com
- Node.js를 위한 빠르고 개방적인 간결한 **웹 프레임워크**[1](#footnote1).

- Express 기본 사용법

```js
/*
express 호출
*/
const express = require("express")
const app = express()

/*
호출 한 express 사용
*/
app.XXX()
```

XXX에는 express 내장함수를 사용할수 있다

- 페이지 구현

```js
const express = require("express")
const app = express()

app.METHOD("Something", function (req, res) {
  // 함수 구문
})
```

METHOD[2](#footnote2)

- 동적페이지의 param 구하기

```js
const express = require("express")
const app = express()

app.get("/test/:params", function (req, res) {
  console.log(req.params)
})
```

http://localhost:3000/test/123123로 접속하면
{ params: '123123' } 가 콘솔 출력된다

- 미들웨어[3](#footnote3) body parser

```js
const express = require("express")
const app = express()
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))
app.METHOD1()
app.METHOD2()
```

기존에 undefined로 뜨던 req.body를 접근할수 있게 만들어준다
METHOD1로 접근을 하던 METHOD2로 접근을 하던 위에서 아래로 진행되는 특성상 app.use로 사용되는 bodyParser는 무조건 실행된다
urlencoded의 extended는 qs모듈(추가적인 보안 기능이 있는 파싱) 사용 여부를 선택한다(사용할 시 qs npm 라이브러리 추가 설치 필요)

- 라우터[4](#footnote4)
  공통적으로 겹치는 주소를 하나로 묶어서 하나의 파일에 코드가 길게 쓰이는 것을 막을수있다

```js
const express = require("express")
const app = express()

app.get("test/c", function () {})
app.get("test/r", function () {})
app.get("test/u", function () {})
app.get("test/d", function () {})
```

위의 코드를 라우터기능을 활용하면 다음과 같이 쓸 수 있다

```js
// ./index.js
const express = require("express")
const app = express()
var testRouter = require("./routes/test")

app.use("/test", testRouter)

// ./routes/test.js
const express = require("express")
const router = express.Router()

router.get("/c", function () {})
router.get("/r", function () {})
router.get("/u", function () {})
router.get("/d", function () {})
```

---

<a name="footnote1">1</a>

- https://namu.wiki/w/%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC
- 프레임워크(Framework)는 Frame + work라는 두 단어가 합쳐진 단어.
- **Frame**(틀) + **work**(일하다) = 틀을 가지고 일하다.
- 웹 프레임워크 -> '웹 서버'를 구현하기 위한 목적으로 만들어진 프레임워크.
  <a name="footnote2">2</a> GET,POST,PUT,DELETE등 Http 요청 메소드를 의미한다
  <a name="footnote3">3</a> HTTP 요청과 응답 사이에서 동작하는 함수이다
  <a name="footnote4">4</a> 라우터는 클라이언트의 요청 경로(path)를 보고 이 요청을 처리할 수 있는 곳으로 기능을 전달해주는 역할을 한다
