
var router = require('express').Router();
var express=require('express');
var TaskController = require('./controller');
//const multer = require('multer');
const excel = require("../Taskmanagement/controller.js");

// global.__basedir = __dirname; 
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, __basedir + '/uploads/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
//     }
// });
//const upload = multer({storage: storage});

router.post('/addtask', TaskController.createNewTask);
router.post('/getTaskById', TaskController.getTaskDetails);
router.put('/updateTaskById/:id', TaskController.TaskDetailsUpdate);
router.put('/updateTaskByStatus/:id', TaskController.TaskDetailsUpdate);
router.get('/getallTasks', TaskController.getAllTaskDetails);
router.delete('/deleteTaskById/:id', TaskController.deleteTaskDetails);
router.get('/aggregate',TaskController.TaskDetailAggregation);
router.post('/upload',(req,res)=>{
  let filepath = req.files.uploadfile.tempFilePath;
  TaskController.importExcelData2MongoDB(filepath);
  res.json({
          msg: "File uploaded/import successfully!",
          file: req.file,
        });
})
// router.post("/uploadfile", upload.single("uploadfile"), (req, res) => {
//     TaskController.importExcelData2MongoDB(__basedir + "/uploads/" + req.file.filename);
//     res.json({
//       msg: "File uploaded/import successfully!",
//       file: req.file,
//     });
//   });
router.post('/text/upload',(req,res)=>{
  let filepath = req.files.uploadfile.tempFilePath;
  TaskController.importTextData2MongoDB(filepath);
  res.json({
          msg: "File uploaded/import successfully!",
          file: req.file,
        });
})


  // router.post("/text/uploadfile", upload.single("uploadfile"), (req, res) => {
  //   TaskController.importTextData2MongoDB(__basedir + "/uploads/" + req.file.filename);
  //   res.json({
  //     msg: "File uploaded/import successfully!",
  //     file: req.file,
  //   });
  // });

//   router.post("/text/uploadfile", upload.single("uploadfile"), (req, res) => {
//     TaskController.importTextData2MongoDB(__basedir + "/uploads/" + req.file.filename);
//     res.json({
//       msg: "File uploaded/import successfully!",
//       file: req.file,
//     });
//   });
module.exports = router