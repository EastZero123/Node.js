# [FE] 개발팀 코드 리뷰 - 1주차

## 목차

1. [소개](#소개)
2. [인증?](#nodejs)
3. [인증 예시 코드](#nodejs-선행학습)
4. [passport.js?](#모듈module)
5. [passport.js 인증](#동기synchronous-비동기asynchronous)

## 소개

- 인프런의 'Node.js - Express' 강의 '인증','passport'파트를 참고했습니다
- [강의 주소](https://www.inflearn.com/course/node-js-express)
- [소스코드](https://github.com/web-n/web6-nodejs-passportjs-multi-user)

## 인증?

- 보호된 리소스에 접근 권한을 주기 전 검증하는 프로세스.
- 클라이언트 측 인증은 사용자명/암호 조합을 필두로 여러 기술을 사용
- 서버 측 인증은 인증서를 사용

## 인증 예시 코드

```javascript
// 로그인 처리 과정
var authData = {
  email: "egoing777@gmail.com",
  password: "111111",
  nickname: "egoing",
}

router.post("/login_process", function (request, response) {
  var post = request.body
  var email = post.email
  var password = post.pwd
  if (email === authData.email && password === authData.password) {
    response.send("Welcome!")
  } else {
    response.send("Who?")
  }
  response.redirect(`/`)
})
```

## passport.js?

- Express.js 애플리케이션에 간단하게 사용자 인증 기능을 구현하게 도와주는 패키지이다.
- 유저 세션 관리 및 다양한 로그인 방식 추가할 수 있다.

## passport.js 인증

```javascript
var authData = {
  email: "egoing777@gmail.com",
  password: "111111",
  nickname: "egoing",
}

var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "pwd",
    },
    function (username, password, done) {
      console.log("LocalStrategy", username, password)
      if (username === authData.email) {
        console.log(1)
        if (password === authData.password) {
          console.log(2)
          return done(null, authData)
        } else {
          console.log(3)
          return done(null, false, {
            message: "Incorrect password.",
          })
        }
      } else {
        console.log(4)
        return done(null, false, {
          message: "Incorrect username.",
        })
      }
    }
  )
)
```

## passport 세션

```javascript
app.use(passport.initialize()) //passport 구동
app.use(passport.session()) // 세션 연결

passport.serializeUser(function (user, done) {
  console.log("serializeUser", user)
  done(null, user.email)
})

passport.deserializeUser(function (id, done) {
  console.log("deserializeUser", id)
  done(null, authData)
})
```
