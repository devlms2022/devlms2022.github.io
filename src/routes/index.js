/**
 * Routers Index
 */

const { Router } = require("express");
const { getAll, insert } = require("../controllers/usersController");
const {
  auth,
  refreshToken,
  logout,
  registrasi,
} = require("../controllers/authContoller");
const { verifyToken, uploads } = require("../core/middleware");
const upload = uploads("registrasi");

const router = new Router();

router.get("/ping", (req, res) => {
  res.send("PONG");
});

router.post("/user/", verifyToken, getAll);

router.post(
  "/register",
  upload.fields([
    { name: "proof_teacher_grade", maxCount: 1 },
    { name: "identity_card", maxCount: 1 },
    { name: "grades", maxCount: 1 },
  ]),
  registrasi
);
router.post("/auth", auth);
router.post("/logout", logout);
router.post("/token", refreshToken);

module.exports = router;
