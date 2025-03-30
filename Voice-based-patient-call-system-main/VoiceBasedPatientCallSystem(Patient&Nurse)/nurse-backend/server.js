const express =require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


const objVariables = require('./common/variables');
const objMessages = require('./common/messages');

const app = express()
app.use(express.json())
app.use(cors())

//#region DB Connection
mongoose
  .connect(objVariables.BackEndURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(objMessages.MongoDbConnectedSuccessfully))
  .catch((err) => console.error(objMessages.MongoDbConnectionError, err));
//#endregion

//#region  API routes
app.use("/api", require("./routes/nurseRoutes"));
//#endregion

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});


app.listen(objVariables.MongoPort,() =>{
    console.log(objMessages.ServerIsRunningAndConnectedToDbHospital)
})