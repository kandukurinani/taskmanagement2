const express = require("express");
const {
  createGroup,
  groupsByAdmin,
  getGroups,
  updateGroup,
  removegroupsByUser,
  removeusersfromGroup,
} = require("../controllers/group");
const { userById } = require("../controllers/user");

const router = express.Router();
router.route("/createnewgroup/:groupcreatedby").post(createGroup);
router.route("/getgroupsbyadmin/:groupcreatedby").get(groupsByAdmin);
router.route("/getallgroups").get(getGroups);
router.param("groupcreatedby", userById);
router.route("/updateGroupbyadmin").put(updateGroup);
//router.route("/addUsersToGroupbyAdmin").put(adduserstoGroup);
router.route("/removeUsersFromGroupbyAdmin").put(removeusersfromGroup);
router.route("/groupsdeleteByadmin/:groupcreatedby").delete(removegroupsByUser);

module.exports = router;






















// const express = require("express");
// const {
//   createGroup,
//   getAllGroups,
//   getgroupscreatedbyuser,
 
// } = require("../controllers/group");

// const router = express.Router();

// router.route("/creategroup").post(createGroup);
// router.route("/getallgroups").get(getAllGroups);
// router.route("/getgroupbyuser/:id").get(getgroupscreatedbyuser);

// module.exports = router;
