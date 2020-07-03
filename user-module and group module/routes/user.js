const express = require("express");
const {
  createUser,
  getUsers,
  userById,
  deleteUser,
  updateMe,
  login,
  forgot,
  getUsersbyids,
  Usersgetbyid,
} = require("../controllers/user");

const router = express.Router();

router.route("/getalluserdetails").get(getUsers);
router.route("/getalluserdetailsByIds").get(getUsersbyids);
router.route("/getuserdetailsById/:id").get(Usersgetbyid);
router.route("/createUser").post(createUser);
//router.route("/getUserDetailsById/:id").get(userById);
router.route("/forgotpassword").post(forgot);
router.route("/deleteById/:id").delete(deleteUser);
router.route("/updateById/:id").put(updateMe);
router.route("/login").post(login);
module.exports = router;
