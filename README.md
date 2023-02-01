# Express Guide

## Routing

- 라우팅 은 응용 프로그램이 URI(또는 경로) 및 특정 HTTP 요청 메서드(GET, POST 등)인 특정 끝점에 대한 클라이언트 요청에 응답하는 방법을 결정.
- 각 경로에는 경로가 일치할 때 실행되는 하나 이상의 핸들러 함수가 있을 수 있다.

```js
/*
Basic routing 구조
METHOD: 소문자로 된 HTTP 요청 메서드 (GET, POST, PUT, DELETE 등)
PATH: 서버 경로
HANDLER: 경로가 일치할 때 실행되는 함수
*/
app.METHOD(PATH, HANDLER);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('Got a POST request');
});

app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user');
});

app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user');
});
```

- 경로 매개변수 처리하기

```js
/*
Route path: /users/:userId
Request URL: http://localhost:3000/users/7
req.params: { "userId": "7"}
*/
app.get('/users/:userId', (req, res) => {
  res.send(req.params);
});
```

- 하이픈( -)과 점( .)으로 경로 매개변수 처리하기

```js
/*
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/GMP-KIX
req.params: { "from": "GMP", "to": "KIX" }
*/
app.get('/flights/:from-:to', (req, res) => {
  res.send(req.params);
});

/*
Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Brassica.rapa
req.params: { "genus": "Brassica", "species": "rapa" }
*/

app.get('/plantae/:genus.:species', (req, res) => {
  res.send(req.params);
});
```

- 단일 콜백 함수

```js
app.get('/example/a', (req, res) => {
  res.send('Hello from A!');
});
```

- 둘 이상 콜백 함수

```js
app.get(
  '/example/b',
  (req, res, next) => {
    console.log('the response will be sent by the next function ...');
    next();
  },
  (req, res) => {
    console.log('호출');
    res.send('Hello from B!');
  }
);
```

- 콜백 함수의 배열

```js
const cb0 = function (req, res, next) {
  console.log('CB0');
  next();
};

const cb1 = function (req, res, next) {
  console.log('CB1');
  next();
};

const cb2 = function (req, res) {
  res.send('Hello from C!');
};

app.get('/example/c', [cb0, cb1, cb2]);
```

- 독립 함수 + 함수 배열 조합

```js
const cb0 = function (req, res, next) {
  console.log('CB0');
  next();
};

const cb1 = function (req, res, next) {
  console.log('CB1');
  next();
};

app.get(
  '/example/d',
  [cb0, cb1],
  (req, res, next) => {
    console.log('the response will be sent by the next function ...');
    next();
  },
  (req, res) => {
    res.send('Hello from D!');
  }
);
```

### 응답 방법

| 방법             | 설명                                                                 |
| ---------------- | -------------------------------------------------------------------- |
| res.download()   | 파일을 다운로드하라는 메시지를 표시합니다.                           |
| res.end()        | 응답 프로세스를 종료합니다.                                          |
| res.json()       | JSON 응답을 보냅니다.                                                |
| res.jsonp()      | JSONP 지원으로 JSON 응답을 보냅니다.                                 |
| res.redirect()   | 요청을 리디렉션합니다.                                               |
| res.render()     | 뷰 템플릿을 렌더링합니다.                                            |
| res.send()       | 다양한 유형의 응답을 보냅니다.                                       |
| res.sendFile()   | 파일을 옥텟 스트림으로 보냅니다.                                     |
| res.sendStatus() | 응답 상태 코드를 설정하고 해당 문자열 표현을 응답 본문으로 보냅니다. |

```js
// 자주사용하는 redirect 예시
res.redirect('/foo/bar');
res.redirect('http://example.com');
res.redirect(301, 'http://example.com');
res.redirect('../login');
```

### app.route()

- app.route()를 사용하여 한번에 다양한 경로를 처리할 수 있다.

```js
app
  .route('/book')
  .get((req, res) => {
    res.send('Get a random book');
  })
  .post((req, res) => {
    res.send('Add a book');
  })
  .put((req, res) => {
    res.send('Update the book');
  });
```

### express.Router

- express.Router를 사용하여 다양한 경로를 정의할 수 있다.

```js
// index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('index');
});

module.exports = router;

// hello.js
const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  res.send('hello');
});

module.exports = router;

// app.js
const express = require('express');
const app = express();
const port = 3000;
const indexRouter = require('./index');
const helloRouter = require('./hello');

app.use(indexRouter);
app.use(helloRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/*
'/', '/hello'에 대한 요청을 처리할 수 있다.q
*/
```

### Express.js에서 정적파일 처리하기

- 이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하려면 express.staticExpress에 내장된 미들웨어 기능을 사용해야 한다.

```js
/*
root: root 디렉터리 설정
options: https://expressjs.com/en/4x/api.html#express.static 참고
*/
express.static(root, [options]);

/*
프로젝트 최상단의 'public'디렉터리에서 아래의 파일 접근 가능
http://localhost:3000/js/app.js
http://localhost:3000/css/style.css
http://localhost:3000/images/momona.png
http://localhost:3000/hello.html
*/
app.use(express.static('public'));

// 여러가지 디렉터리에서 정적리소스 사용가능
app.use(express.static('public'));
app.use(express.static('files'));
```

```js
/*
가상 경로 접두사를 활용하여 정적 디렉터리 접근 가능
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
*/
app.use('/static', express.static('public'));
```

### 절대경로 사용 시

- express.static에서 제공하는 경로는 루트 디렉터리에 상대적이므로 절대 경로를 사용하는 것이 더 안전하다.

```js
const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')));
```
