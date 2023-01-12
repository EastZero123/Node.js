# [FE] 개발팀 코드리뷰 2주차

## 목차

1. [소개](#소개)
2. [mysql 모듈 설치하기](#mysql-모듈-설치하기)
3. [DB 접속 및 쿼리 실행](#db-접속-및-쿼리-실행)
4. [SQL Injection?](#sql-injection)

## 소개

- 인프런의 'WEB2 Node.js-MySQL' 강의 리뷰.
- [강의 주소](https://www.inflearn.com/course/web2-node-js-mysql)
- [유튜브 재생목록](https://www.youtube.com/playlist?list=PLuHgQVnccGMAicFFRh8vFFFtLLlNojWUh)
- [소스코드](https://github.com/web-n/node.js-mysql/releases/tag/1)

## mysql 모듈 설치하기

- https://www.npmjs.com/package/mysql

```cmd
npm install mysql
```

### 기타 DMBS 모듈 설치하기

- MariaDB: https://www.npmjs.com/package/mariadb

```cmd
npm install mariadb
```

- SQL Server: https://www.npmjs.com/package/mssql

```cmd
npm install mssql
```

## DB 접속 및 쿼리 실행

```javascript
const mysql = require("mysql")
const db = mysql.createConnection({
  host: "10.10.10.200",
  user: "happyict",
  password: "happyict1!",
  database: "nodejs",
  // port: 3306 -> 기본 설정값
})

db.connect()

db.query("SELECT * FROM topic", function (error, topics) {
  console.log(topics)
})

db.end()

// 쿼리 파라미터 처리
db.query(
  `INSERT INTO topic (title, description) VALUES(?, ?)`,
  [post.title, post.description],
  function (error, result) {
    console.log(result)
  }
)
```

## SQL Injection?

- SQL 삽입, SQL 주입
- https://namu.wiki/w/SQL%20injection
- multipleStatements는 사용하지 않는것을 권장.

```javascript
const db = mysql.createConnection({
  host: "10.10.10.200",
  user: "happyict",
  password: "happyict1!",
  database: "nodejs",
  // 기본값은 false로 되어 있음.
  multipleStatements: false,
})
```
