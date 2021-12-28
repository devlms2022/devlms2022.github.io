/**
 * Routers Index
 */

const { Router } = require("express");
const { getAll } = require("../controllers/usersController");

const router = new Router();

router.get("/ping", (req, res) => {
  res.send("PONG");
});

router.get("/users/", getAll);

module.exports = router;
