import express from "express";

const router = express.Router();

router.post("/register", (req, res, next) => {
  res.json("register");
});
export default router;
