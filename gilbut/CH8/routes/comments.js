const express = require("express");
const Comment = require("../schemas/comment");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(comment);
    const result = await Comment.populate(comment, { path: "commenter" });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router
  .route("/:id")
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update(
        {
          _id: req.params.id,
        },
        {
          comment: req.body.comment,
        }
      );
      res.json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.remove({ _id: req.params.id });
      res.json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = router;
