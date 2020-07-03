const express = require("express");
const {
  createGroup,
  groupsByAdmin,
  getGroups,
  updateGroup,
  groupsdeleteByUser,
  adduserstoGroup,
  removeusersfromGroup,
} = require("../controllers/group");
const { userById } = require("../controllers/user");

const router = express.Router();
router.route("/createnewgroup/:groupcreatedby").post(createGroup);
router.route("/getgroupsbyadmin/:groupcreatedby").get(groupsByAdmin);
router.route("/grtallgroups").get(getGroups);
router.param("groupcreatedby", userById);
router.route("/updateGroupbyadmin").put(updateGroup);
router.route("/addUsersToGroupbyAdmin").put(adduserstoGroup);
router.route("/removeUsersFromGroupbyAdmin").put(removeusersfromGroup);
router.route("/groupsdeleteByadmin/:groupcreatedby").delete(groupsdeleteByUser);

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