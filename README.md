# [FE] 개발팀 코드 리뷰 - 1주차

## 목차

1. [개요](#개요)
2. [Node.js?](#nodejs)
3. [Node.js 선행학습](#nodejs-선행학습)
4. [모듈(Module)](#모듈module)
5. [동기(Synchronous), 비동기(Asynchronous)](#동기synchronous-비동기asynchronous)
6. [Node.js에서 GET, POST 사용하기](#nodejs에서-get-post-사용하기)
7. [Package Manager?](#package-manager)
8. [API?](#api)

## 개요

- 인프런의 'WEB2 - Node.js' 강의를 참고했습니다
- [강의 주소](https://www.inflearn.com/course/web2-node-js)
- [유튜브 재생목록](https://www.youtube.com/playlist?list=PLuHgQVnccGMA9QQX5wqj6ThK7t2tsGxjm)
- [소스코드](https://github.com/web-n/Nodejs)

## Node.js 선행학습

- JavaScript. 강의 내용 중간중간에 JavaScript 강의가 있으므로 참고한다.
- JSON
- [구조분해할당](https://ko.javascript.info/destructuring-assignment)

## Node.js?

- Node.js는 확장성 있는 네트워크 애플리케이션(특히 서버 사이드) 개발에 사용되는 소프트웨어 플랫폼이다.
- 웹 서버에서 아파치 등의 별도의 소프트웨어 없이 동작하는 것이 가능.

```javascript
// http 서버 생성
const http = require("http") // http라는 이름의 라이브러리 모듈을 http라는 상수에 저장한다

const app = http.createServer((request, response) => {
  let _url = request.url //url 정보를 담아온다
  let pathname = url.parse(_url, true).pathname // url정보를 쪼개어 그중에 pathname을 가져와 저장한다

  if (pathname === "/") {
    res.writeHead(200)
    res.end("Hello World")
  }
})
```

## 모듈(Module)?

- 독립된 기능을 갖는 것(함수, 파일)들의 모임.
- 절차지향으로 모든 기능을 써내려 가는 것보다, 기능별로 함수를 만들어 함수를 호출하는 방식. 유지보수가 편해짐.
- 외장 모듈

  - 일반 Node.js 개발자들이 만들어 놓은 모듈(라이브러리).
  - 외장 모듈을 사용하기 위해서는 npm(Node Package Manager)을 사용.

- 내장 모듈

  - Node.js를 설치하고 나면 그 안에 이미 제공되어지는 모듈.
  - 내장 모듈은 이미 Node.js를 설치할 때 존재하기 때문에 npm을 사용하지 않음.

```javascript
// 모듈 생성 (예시 파일 경로: ./lib/template.js)
module.exports = {
  HTML: function (title, list, body, control) {
    return `
  <!DOCTYPE html>
  <html lang="ko">
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}      
      ${body}
    </body>
  </html>`
  },
}

// 모듈 호출
const template = require("./lib/template")

// 모듈 실행
const html = template.HTML(
  // template.js에 있는 HTML메서드를 사용한다
  title,
  list,
  `<h2>${title}</h2><p>${description}</p>`,
  `<a href="/create">create</a>`
)
```

## 동기(Synchronous), 비동기(Asynchronous)

- [동기, 비동기 처리](https://velog.io/@daybreak/%EB%8F%99%EA%B8%B0-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%B2%98%EB%A6%AC)
- WEB API, 파일 읽기 등과 같이 소요시간이 있는 상황에서는 병렬적으로 수행하기 때문에 로직 상 문제가 생길 수 있으면 동기화를 시켜야 한다.

- 이해를 돕기 위한 이미지
<p>
  <img src="./async1.png" align="center" width="49%"><img src="./async2.png" align="center" width="49%">
</p>

## Node.js에서 GET, POST 사용하기

### GET

```javascript
let queryData = url.parse(_url, true).query // url 정보를 쪼개어 그 중에 query의 정보를 꺼내어 저장한다

// queryData.XXX -> XXX에서 url에서 파라미터 변수를 지정
let id = queryData.id
```

### POST

- https://nodejs.org/ko/docs/guides/anatomy-of-an-http-transaction/

```javascript
// 'data'는 데이터를 가공
request.on("data", function (data) {
  body += data
})

// 'end'는 가장 마지막에 수행할 작업
request.on("end", function () {
  const post = qs.parse(body)
  const title = post.title
  const description = post.description
})
```

## Package Manager?

- 패키지를 다루는 작업을 편리하고 안전하게 수행하기 위해 사용되는 툴.
- 패키지를 다루는 작업이란 패키지를 설치, 업데이트, 수정, 삭제하는 작업을 의미.

### npm

- [PM2](https://pm2.keymetrics.io)
  - 무중단 서비스 라이브러리
    - pm2 start/stop/monit 등등으로 무중단 서비스 관리할 수 있다
- [sanitize-html](https://www.npmjs.com/package/sanitize-html)
  - XSS 방어
    - XSS란? 악의적인 사용자가 공격하려는 사이트에 스크립트를 넣는 기법을 말한다. 공격에 성공하면 사이트에 접속한 사용자는 삽입된 코드를 실행하게 되며, 보통 의도치 않은 행동을 수행시키거나 쿠키나 세션 토큰 등의 민감한 정보를 탈취한다.
