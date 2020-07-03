const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema
const arrayUniquePlugin = require('mongoose-unique-array');



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
  return val.length <= 5;
}

module.exports = mongoose.model("Group", groupSchema);
