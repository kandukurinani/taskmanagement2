const db=require('mongoose')
const User = require("../models/UserSchema");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('3');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'knani.smart9@gmail.com',
    pass: 'nani@9618073566'
  }
});



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
      let password=User.password;
      let email=User.email;
      let decryptedString = cryptr.decrypt(password);
      console.log(decryptedString)
      res.status(201).json({
        message: `user created sucessfully and please check your email for password`,
      })
    var mailOptions = {
      from: 'knani.smart9@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js',
      text: 'Sucessfully registered your password is '+decryptedString
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
     
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
      if(user.active){
        res.status(200).json({
          result: user,
        })}
        else {
      res.status(404).json({
        msg:"user account removed"
      })
    }
    }).catch((err)=>{
      res.status(401).json({
        err
      })
    })
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
    res.status(200).json({ message: "user account deleted check it once" });
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
      if (user.active) {
        res.status(200).json({
          message: "you account is closed please create new account",
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
        err,
      });
    });
};

exports.forgot = (req, res) => {
  let email = req.body.email;
  User.findOne({ email: email })
  .then((user) => {
    let password=user.password;
    let email=user.email;
    console.log(email)
    const decryptedString = cryptr.decrypt(password);
    res.status(200).send({
      msg: `your password is ${decryptedString}`,
    });
    var mailOptions = {
      from: 'knani.smart9@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js',
      text: 'you are sucessfully registered your password is '+decryptedString
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }).catch((err)=>{
    res.status(404).json({
      msg:'user not found',
      err
    })
  })
};
