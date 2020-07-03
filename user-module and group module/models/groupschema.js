const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema



const groupSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: true,
  },
  groupdescription: {
            type: String,
            required: true,
            minlength: [5, 'Minimum length of group description must be 5 characters'], 
          },

  groupCreatedBy: {
    type: ObjectId,
    ref: "users",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  groupusers: {
  type:[
    {
      type: ObjectId,ref:"users",unique:true,
      // groupCreatedBy: { type: ObjectId, ref: "users" },
    }],
    validate: [arrayLimit, '{PATH} exceeds the limit of 25']
},
  grouptype:{
      type:String,
      required:true
  }
});
function arrayLimit(val) {
  return val.length <= 25;
}

module.exports = mongoose.model("Group", groupSchema);































// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;


// var GroupSchema = new Schema({
//     groupname: {
//         type: String,
//         required: "true",
//         minlength: [3, 'Minimum length of groupname must be 3 characters'],
//         maxlength: [20, 'Maximum length of groupname must be 6 characters'],
//         unique: [true,"group name alredy exists"]
//       },
//       groupdescription: {
//         type: String,
//         required: true,
//         minlength: [5, 'Minimum length of group description must be 5 characters'], 
//       },
//       groupcreatedby: {
//          type: Schema.Types.ObjectId, ref: 'users' ,
//       },
//     groupusers :{ 
//         type:[ { type: Schema.Types.ObjectId, ref: 'users',unique: true}, ],
//         validate: [arrayLimit, '{PATH} exceeds the limit of 25'],
//     },
//     grouptype:{
//       type:String,
//     },
//   });
//   function arrayLimit(val) {
//     return val.length <= 25;
//   }

//   module.exports = mongoose.model("Group",GroupSchema );