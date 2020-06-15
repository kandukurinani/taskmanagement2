
var database = require('../module/database');
var ObjectId = require('mongodb').ObjectId;
let url = "mongodb://localhost:27017/";
const excelToJson = require('convert-excel-to-json'); 
const fs = require('fs');
const multer = require('multer');
const express = require('express');
let MongoClient = require('mongodb').MongoClient;
const mysql = require('mysql');
const readXlsxFile = require('read-excel-file/node');
const csv = require('fast-csv');
const app = express(); 
global.__basedir = __dirname; 
const path=require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});
const upload = multer({storage: storage});





createNewTask = (req, res) => {
    database.getConnection()
        .then(database => {
            database.collection('tasklist').insertOne(req.body)
                .then(insertedDocument => {
                    res.status(200).json({
                        data: insertedDocument.ops
                    })
                })
                .catch(error => {
                    res.status(400).json({
                        error
                    })
                });
        })
        .catch(error => {
            res.status(500).json({
                error
            })
        });
}

getTaskDetails = (req, res) => {
    let taskname = req.body.taskname;

    console.log(taskname)

    if (!taskname) {
        res.status(400).json({
            message: 'Valid input params required'
        })
    } else {
        database.getConnection()
            .then(database => {
                database.collection('tasklist').find({ "taskname": taskname }).toArray()
                    .then(docs => {
                        res.status(200).json({
                            docs
                        })
                    })
                    .catch(error => {
                        res.status(400).json({
                            error
                        })
                    })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    error
                })
            })
    }
}


TaskDetailsUpdate = (req, res) => {
    let id = req.params.id;
    database.getConnection()
        .then(db => {
            db.collection('tasklist').updateOne(
                { "_id": new ObjectId(id) },
                { $set: req.body },
                  { upsert: true }

            ).then(result => {
                res.status(200).json({
                    result
                })

            }).catch(err => {
                console.log(err);
                res.status(400).json({
                    err
                })

            })

        })
        .catch(err => {
            console.log(error);
            res.status(500).json({
                err
            })

        })

}


getAllTaskDetails = (req, res) => {
    database.getConnection()
        .then(database => {
            database.collection('tasklist').find({}).toArray()
                .then(result => {
                    res.status(200).json({
                        result
                    })
                })
                .catch(error => {
                    res.status(400).json({
                        error
                    })
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err
            })

        })

}


TaskDetailsUpdate = (req, res) => {
    let id = req.params.id;
    database.getConnection()
        .then(db => {
            db.collection('tasklist').updateOne(
                { "_id": new ObjectId(id) },
                { $set: req.body }
                //    { upsert: true }

            ).then(result => {
                res.status(200).json({
                    result
                })

            }).catch(err => {
                console.log(err);
                res.status(400).json({
                    err
                })

            })

        })
        .catch(err => {
            console.log(error);
            res.status(500).json({
                err
            })

        })

}

deleteTaskDetails = (req, res) => {
    let id = req.params.id;
    database.getConnection()
        .then(db => {
            db.collection('tasklist').remove(
                { "_id": new ObjectId(id) }
            ).then(result => {
                console.log(result);
                res.status(200).json({
                    result
                })

            })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({
                        err
                    })

                });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err
            })
        })

}
TaskDetailAggregation = (req, res) => {
    database.getConnection()
        .then(db => {
            var collection = db.collection('tasklist');
            collection.count({ 'status': 'inprogress' })
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        result
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({
                        err
                    })
                })

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err
            })
        })
}
const importExcelData2MongoDB = function (filePath) {
        const excelData = excelToJson({
            sourceFile: filePath,
            sheets:[{
    
                name: 'taskmanagement',
                header:{
                   rows: 1
                },
                columnToKey: {
                    A: 'sno',
                    B: 'taskname',
                    C: 'description',
                    D: 'status',
                    E:'creationdate',
                    F:'updateddate'
                }
            }]
        });
        console.log(excelData);   
        MongoClient.connect(url, {useUnifiedTopology: true ,useNewUrlParser: true }, (err, db) => {
            if (err) throw err;
            let dbo = db.db("Taskmanagement");
            dbo.collection("tasklist").insertMany(excelData.taskmanagement, (err, res) => {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
            });
        });
          
      //  fs.unlinkSync(filePath);
    }
  
    const importTextData2MongoDB= function(filePath){
        let stream = fs.createReadStream(filePath);
    let myData = [];
    let csvStream = csv
      .parse()
      .on("data", function (data) {
        myData.push({data});
      })
      .on("end", function () {
        myData.shift();
        var item="$";
        remove(myData,item);
        function remove(myData, item) {
            for (var i = myData.length; i--;) {
                if (myData[i] == item) {
                    myData.splice(i, 1);
                }
            }
        }
        MongoClient.connect(url, { useUnifiedTopology: true ,useNewUrlParser: true }, (err, db) => {
            if (err) throw err;
            let dbo = db.db("Taskmanagement")
           // myData.forEach((document) => dbo.tasklist.insertOne([{document}]),(err,res)=>{
           dbo.collection("tasklist").insertMany([{myData}],forceServerObjectId=true, (err, res) => {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
            });
        });
      });
      stream.pipe(csvStream);
    //  fs.unlink(filePath);
      }
module.exports = {
    createNewTask,
    getTaskDetails,
    TaskDetailsUpdate,
    getAllTaskDetails,
    deleteTaskDetails,
    TaskDetailAggregation,
    importExcelData2MongoDB,
    importTextData2MongoDB 
}
