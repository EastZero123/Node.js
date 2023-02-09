# [FE] 개발팀 코드 리뷰 - 4주차

## 목차

1. 개요
2. 쿠키? 세션?
3. 쿠키 구현
4. 사용 가능한 쿠키옵션
5. 세션 구현
6. 미들웨어 body parser
7. 세션 스토어

## 개요

- 인프런의 'Node.js - Express' 강의 '쿠키와 인증', '세션과 인증' 파트를 참고했습니다.
- [강의 주소](https://www.inflearn.com/course/node-js-express)

## 쿠키? 세션?

- 쿠키란?<br/>
  쿠키는 클라이언트(브라우저) 로컬에 저장되는 키와 값이 들어있는 작은 데이터 파일<br/>
  유효시간이 있으면 유효시간 내 브라우저에 재접속해도 쿠키의 기능은 유효하다<br/>

- 세션이란?<br/>
  세션은 서버측에서 관리하는 클라이언트 정보 파일<br/>
  클라이언트를 구분하기 위해서 ID를 부여하며 브라우저를 종료할 때까지 기능은 유효하다<br/>

## 쿠키 구현

- 쿠키 생성<br/>

```js
var http = require("http")
http
  .createServer(function (request, response) {
    response.writeHead(200, {
      // http 응답코드가 200이 뜨면
      "Set-Cookie": ["name=choi", "age=25"], // 다음과 같은 쿠키를 생성한다
    })
  })
  .listen(3000)
```

개발자도구 > 애플리케이션 > 쿠키 > localhost:3000에 들어가보면 쿠키가 생성된것을 확인할 수 있다.
<br/>

- 쿠키 읽기<br/>

```js
var http = require("http")
var cookie = require("cookie") // 쿠키를 다루는데 필요한 라이브러리 불러오기
http
  .createServer(function (request, response) {
    console.log(request.headers.cookie) // name=choi; age=25
    var cookies = {} // 쿠키를 담기 위한 그릇
    if (request.headers.cookie !== undefined) {
      // 쿠키가 존재하면
      cookies = cookie.parse(request.headers.cookie) // 쿠키를 파싱해서 그릇에 담는다
    }
    console.log(cookies.name) // choi
  })
  .listen(3000)
```

쿠키는 Http헤더<sup>[1](#footnote1)</sup>에 입력해 넣어 서버에 전송하기 때문에 request.headers로 Http헤더에 접근하면 cookie가 존재할 수 있다<br/>

## 사용 가능한 쿠키옵션

```js
var http = require("http")
var cookie = require("cookie")
http
  .createServer(function (request, response) {
    response.writeHead(200, {
      "Set-Cookie": [
        "name=choi",
        "age=25",
        `Permanent=cookies; Max-Age=${60 * 60 * 24 * 30}`, //시간 제한 생성
        "Secure=Secure; Secure", // HTTPS일 경우에만 쿠키가 전송된다
        "HttpOnly=HttpOnly; HttpOnly", // JS로 접근할수없게 하는 기능
        "Path=Path; Path=/cookie", // /cookie가 붙은 모든 주소 적용
        "Doamin=Domain; Domain=test.o2.org", // 지정한 경로로 이동시 쿠키 적용
      ],
    })
  })
  .listen(3000)
```

쿠키 옵션을 활용하면 다양한 기능을 구현할 수 있게 된다(ex - 자동 로그인, 일정 시간 팝업 차단 등)<br />

## 세션 구현

```js
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
```

세션을 구현하면 삭제하지 않는 이상 창을 닫기 전까지 삭제되지 않고 계속 유지된다<br />
창을 닫는 것이 아닌 탭단위로 닫아도 세션은 계속 유지된다<br />

## 세션 스토어

```js
var express = require("express")
var parseurl = require("parseurl")
var session = require("express-session")
var FileStore = require("session-file-store")(session) // 세션 스토어를 사용하는데 필요한 라이브러리 불러오기

var app = express()

app.use(
  session({
    secret: "asadlfkj!@#!@#dfgasdg",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(), // 세션 스토어는 세션 옵션에서 등록 가능하다
  })
)

app.listen(3000, function () {
  console.log("3000!")
})
```

세션 스토어를 사용한 파일과 같은 디렉토리상에 sessions 폴더가 생성되고 그안에 별도의 세션을 파일로 저장시킨다<br />

저장 시킬 다양한 수단은 express-session npm 사이트에 수록 되어있다(mysql, mariadb, firestore등)[express-session npm사이트](https://www.npmjs.com/package/express-session) <br/>

저장된 세션 파일을 열어보면 작성자의 파일 기준으로 {"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"\_\_lastAccess":1675927329295} 으로 작성되어있다.

---

<u><a name="footnote1">1</a></u>HTTP 헤더는 클라이언트와 서버가 요청 또는 응답으로 부가적인 정보를 전송할 수 있도록 해줍니다<br/>
