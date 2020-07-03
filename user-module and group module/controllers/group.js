const Group = require("../models/groupSchema");
const User=require("../models/UserSchema")
const ObjectId = require('mongodb').ObjectID;

exports.createGroup = (req, res, next) => {
    let grouptype=req.body.grouptype;
    if(grouptype=="public"||grouptype=="private"){
  let group = new Group(req.body);
  group.groupCreatedBy = req.profile;
  group.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.status(200).json({
      message: "group created by user",
      result,
    });
  });
}else{
    res.status(400).json({ message: "group type is required and it must be public or private" });
}
}

exports.groupsByAdmin = (req, res) => {
  Group.find({ groupCreatedBy: req.profile._id })
    .populate("groupCreatedBy", "_id firstname email")
    .populate('groupusers.groupuser',"_id fistname")
    .exec((err, groups) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(groups);
    });
};
exports.groupsdeleteByUser = (req, res) => {
    Group.findOneAndDelete({ groupCreatedBy: req.profile._id })
      .exec((err, groups) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        res.json({
            msg:"group deleted sucessfully"
        });
      });
  };

exports.getGroups = (req, res) => {
  let groups = Group.find()
    .populate("groupCreatedBy", "_id firstname email")
    .then((groups) => {
      res.json(groups);
    });
};

exports.getUsersbyids = (req, res) => {
    var array1 = req.body.groupusers;
  var array2 = [] 
  array1.forEach(function(stringId){
  array2.push(new ObjectID(stringId))
  console.log((new ObjectID(stringId)))
  })
  User.find({
    _id: {
        $in: array2
    }
  })
  .select(
    "firstname lastname mobile email address state pincode country dob active createdAt"
  )
  .then((user) => {
    let users = user;
    console.log("users",users)
  });
  }


  exports.updateGroup = async (req, res) => {
    let group = await Group.find({ groupname: req.body.groupname }).select("_id").then((data) => data);
    let usergroup = await Group.findByIdAndUpdate(
     group,req.body,
      { new: true },
    )
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        res.json(result);
      }
    })
  };


  exports.removeusersfromGroup = async (req, res) => {
    var array1 = req.body.groupusers;
    var array2 = [] 
    array1.forEach(function(stringId){
    array2.push(new ObjectID(stringId))
    })
    console.log(array)
    let group = await Group.find({ groupname: req.body.groupname }).select("_id").then((data) => data);
   // console.log(group);
    let usergroup= await Group.findByIdAndUpdate(
      group,
     {$pull: {groupusers:{
         $in:array2
     }}},
      { new: true },
    ).exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        res.json(result);
      }
    })
  };


  exports.adduserstoGroup = async (req, res) => {
    var array1 = req.body.groupusers;
    var array2 = [] 
    array1.forEach(function(stringId){
    array2.push(new ObjectID(stringId))
    console.log((new ObjectID(stringId)))
    })
    console.log(array2)
    let user = await User.find({
        _id: {
            $in: array2
        }
      }).select("firstname email phonenumber").then((data) => data);
     console.log("user", user);

     let group = await Group.find({ groupname: req.body.groupname }).select("_id").then((data) => data);
     //console.log(group)
    let groupuser = await Group.findByIdAndUpdate(
      group,
      { $addToSet: { groupusers: user } },
      { new: true },
    ).exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        res.json(result);
      }
    })
  };
































// const db=require('mongoose')
// const Group = require("../models/groupschema");
// const User = require("../models/UserSchema");

// exports.createGroup = async (req, res, next) => {
//     const {
//       groupname,
//       groupdescription,
//       groupcreatedby,
//       groupusers,
//       grouptype,
//     } = req.body;
//     let newGroup = {
//       groupname: groupname,
//       groupdescription: groupdescription,
//       groupcreatedby: groupcreatedby,
//       groupusers: groupusers,
//       grouptype: grouptype,
//     };
//     Group.create(newGroup)
//     .then((Group) => {
//         res.status(201).json({
//           message: "group created sucessfully",
//         }).then().catch()
//       })
//       .catch((err) => {
//         next(err);
//         console.log(err)
//       });
//   };
//   exports.getAllGroups = (req, res, next) => {
//     Group.find({})
//     .populate('users')
//       .then((Group) => {
//         res.status(200).json({
//           result: Group,
        
//       })
//         })
//       .catch((err) => {
//         next(err);
//       });
//   };
//   exports.getgroupscreatedbyuser = (req, res) => {
//       var id=req.params.id;
//       const friends = await User.findById({"_id":id})
//     .populate('Group')
//     .exec((error,result)=>{
//         if(error){
//             res.status(400).json({
//                 error
//             });
//         }
//             else
//             {
//                 res.status(200).json({
//                     result
//                 })
//             }
//         }
//     )
 
//   };