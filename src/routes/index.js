/**
 * Routers Index
 */

const { Router } = require("express");
const {
  getAll,
  auth,
  insert,
  logout,
} = require("../controllers/usersController");
const { verifyToken } = require("../core/middleware");
const refreshToken = require("../controllers/refreshToken");

const router = new Router();

router.get("/ping", (req, res) => {
  res.send("PONG");
});

router.get("/user/", verifyToken, getAll);

router.post("/register", insert);
router.post("/auth", auth);
router.delete("/logout", logout);

router.get("/token", refreshToken);

module.exports = router;
