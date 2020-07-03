const express = require("express");
const app = express();
const errorHandler = require("./middleware/error");
const port = 5000;
const dbconnection=require("./dbConcetion");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const group=require("./routes/group")

app.use(bodyParser.json());

app.use("/usermodule", user);
app.use("/groupmodule",group)

app.use(errorHandler);

app.listen(port, () =>{
  console.log(`server is listening at http://localhost:${port}`)
}
);

