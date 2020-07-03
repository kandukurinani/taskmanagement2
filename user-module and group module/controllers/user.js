const db=require('mongoose')
const User = require("../models/UserSchema");

// const transporter=nodemailer.createTransport(sendgridTransport({
//   auth:{
//     api_key: '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'
//   }

// }))

exports.getUsers = (req, res) => {
  User.find()
    .select(
      "firstname lastname mobile email address state pincode country dob active createdAt"
    )
    .then((user) => {
      res.status(200).json({
        message: "success",
        user,
      });
    });
};
exports.Usersgetbyid = (req, res) => {
  User.find({ _id: req.params.id })
    .select(
      "firstname lastname mobile email address state pincode country dob active createdAt"
    )
    .then((user) => {
      res.status(200).json({
        message: "success",
        user,
      });
    });
};
exports.getUsersbyids = (req, res) => {
  var array1 = req.body.userIds;
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
  res.status(200).json({
    message: "success",
    user,
  });
});
}
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user; 
    next();
  });
};
exports.createUser = async (req, res, next) => {
  const {
    firstname,
    email,
    mobile,
    lastname,
    address,
    country,
    state,
    pincode,
    dob,
    username,
  } = req.body;
  let newUser = {
    firstname: firstname,
    email: email,
    mobile: mobile,
    lastname: lastname,
    address: address,
    country: country,
    state: state,
    pincode: pincode,
    dob: dob,
    username: username,
  };
  User.create(newUser)
 
    .then((User) => {
      res.status(201).json({
        message: `user created sucessfully and password is ${User.password}`,
      })
    //  return transporter.sendMail({
    //     to:'User.email',
    //     from:'kandukurinani@test.com',
    //     subject:'Sign up Succeess',
    //     html:'<h1>you sucessfully signed up</h1>'
    //   })
     
    })
    .catch((err) => {
      next(err);
    });
};
exports.updateMe = (req, res) => {
  if (req.body.email) {
    delete req.body.email;
    res.status(400).json({ message: "sorry you dont have permission to update the mail" });
  } else {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    }).select(
      "firstname lastname mobile email address state pincode country dob active createdAt"
    )
    .then((user) => {
      if(user.active==true){
        res.status(200).json({
          result: user,
        })}
        else {
      res.status(401).json({
        msg:"user account removed"
      })
    }
    });
  }
};
exports.deleteUser = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { active: false },
    { new: true }
  ).then((user) => {
    if (!user) {
      next(err);
    }
    res.status(400).json({ message: "user account deleted check it once" });
  });
};

exports.login = (req, res) => {
  let username=req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let conditions = !!username ? {username: username,password:password} : {email: email,password:password};
  User.findOne(conditions)
  .select(
    "firstname lastname mobile email address state pincode country dob active createdAt"
  )
    .then((user) => {
      if (user.active === false) {
        res.status(200).json({
          message: "please create new account",
        });
      } else {
        
        res.status(200).json({
          message: "you are sucessfully logined",
          user,
        
        },
        );
      }
    })
    .catch((err) => {
      res.status(401).send({
        msg: "please enter valied username and password.",
      });
    });
};

exports.forgot = (req, res) => {
  let email = req.body.email;
  User.findOne({ email: email }).then((user) => {
    res.status(200).send({
      msg: `your password is ${user.password}`,
    });
  });
};
