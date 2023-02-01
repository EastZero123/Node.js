# Code Guide

## Routing

- 라우팅 은 응용 프로그램이 URI(또는 경로) 및 특정 HTTP 요청 메서드(GET, POST 등)인 특정 끝점에 대한 클라이언트 요청에 응답하는 방법을 결정.
- 각 경로에는 경로가 일치할 때 실행되는 하나 이상의 핸들러 함수가 있을 수 있다.

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

- 페이지 구현

```js
const express = require('express')
const app = express()

app.METHOD[1](#footnote1)('Something', function(req,res){
    // 함수 구문
})
```

- 동적페이지의 param 구하기

```js
const express = require("express")
const app = express()

app.get("/test/:params", function (req, res) {
  console.log(req.params)
  // http://localhost:3000/test/123123로 접속하면
  // { params: '123123' } 가 콘솔 출력된다
})
```

---

<a name="footnote1">1</a> GET,POST,PUT,DELETE등 Http 요청 메소드를 의미한다
