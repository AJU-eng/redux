const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const router = express.Router();
const {
  register,
  login,
  logout,
  loggedIn,
  getUser,
  userData,
  userDelete,
  findUser,
  UpdateUser,
  adminLogged,
  getImage,
} = require("../Controller/userController");
const upload = require("../middleware/image_upload");

router.post("/",upload.single("image"), register);
router.get('/userData',userData)
router.get("/logout", logout);
router.post('/findUser',findUser)
router.post("/login",login)
router.post("/userDelete",userDelete)
router.get("/logged", loggedIn);
router.get("/getData", getUser);
router.put("/updateUser",UpdateUser)
router.get("/adminLogged",adminLogged)
router.get("/getimage",getImage)

module.exports = router;
