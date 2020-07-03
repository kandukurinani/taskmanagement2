const mongoose = require("mongoose");

const mongoURI = 'mongodb+srv://nani_kandukuri:jVOQ6wnBiIs5pqz2@cluster0-q6vvk.mongodb.net/user-module?retryWrites=true&w=majority';

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false })
  .then((result) => console.log("Database connection Succefully estalished"))
  .catch((err) =>
    console.log(
      "Error while connecting MongoDB : " + JSON.stringify(err, undefined, 2)
    )
  );