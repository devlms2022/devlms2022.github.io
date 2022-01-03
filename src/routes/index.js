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
const { verifyToken, uploads } = require("../core/middleware");
const refreshToken = require("../controllers/refreshToken");
const upload = uploads('registrasi');

const router = new Router();

router.get("/ping", (req, res) => {
  res.send("PONG");
});

router.get("/user/", verifyToken, getAll);

router.post(
  "/register",
  upload.fields([
    { name: "proof_teacher_grade", maxCount: 1 },
    { name: "identity_card", maxCount: 1 },
    { name: "grades", maxCount: 1 },
  ]),
  insert
);
router.post("/auth", auth);
router.delete("/logout", logout);

router.get("/token", refreshToken);

module.exports = router;
