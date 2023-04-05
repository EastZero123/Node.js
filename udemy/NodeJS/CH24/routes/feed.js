const express = require("express")

const feedController = require("../controller/feed")

const router = express.Router()

router.get("/posts", feedController.getPosts)

router.post("/post", feedController.createPost)

module.exports = router
