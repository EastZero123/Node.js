const { response } = require("express");
const express = require("express");
const User = require("../schemas/user");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.render("mongoose", { users });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
