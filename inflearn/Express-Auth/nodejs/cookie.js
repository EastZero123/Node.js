var http = require("http")
var cookie = require("cookie") // 쿠키 모듈

http
  .createServer(function (request, response) {
    var cookies = cookie.parse(request.headers.cookie) // 쿠키 읽어오기
    response.writeHead(200, {
      "Set-Cookie": [
        "something=something",
        `Permanent; Age=${60 * 60}`,
        "Secure=Secure; Secure",
        "HttpOnly=HttpOnly; HttpOnly",
        "Path=Path; Path=/cookie",
        "Domain=Domain; Domain=o2.org",
      ],
    })

    response.end("Cookie!!")
  })
  .listen(3000)
