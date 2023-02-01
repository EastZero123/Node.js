# Code Guide

# Express.js?

- https://expressjs.com
- 웹 및 모바일 애플리케이션을 위한 강력한 기능 세트를 제공하는 최소한의 유연한 Node.js 웹 **애플리케이션 프레임워크[1](#footnote1)**.

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

app.METHOD[2](#footnote2)('Something', function(req,res){
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

<a name="footnote1">1</a> - https://namu.wiki/w/%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC

- 프레임워크(Framework)는 Frame + work라는 두 단어가 합쳐진 단어.
- **Frame**(틀) + **work**(일하다) = 틀을 가지고 일하다.
- 웹 프레임워크 -> '웹 서버'를 구현하기 위한 목적으로 만들어진 프레임워크.
  <a name="footnote2">2</a> GET,POST,PUT,DELETE등 Http 요청 메소드를 의미한다
