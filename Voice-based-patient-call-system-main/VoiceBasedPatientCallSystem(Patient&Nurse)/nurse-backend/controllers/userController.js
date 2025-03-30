const express = require("express");
const router = express.Router();
const app = express();

app.use(express.json());

const userService = require('../services/userServices');
const objVariables = require('../common/variables');
const objMessages = require('../common/messages');

//#region Create new user
const createNewUser = async (req, res) =>
{
    try 
    {
      const user = await userService.serCreateNewUser(req.body,res);
      return res; 
    } 
    catch (error) 
    {
       return res.status(objVariables.ServerErrorCode).json({ status : objMessages.Failure, message: objMessages.InternalServerError, error : error.message});
    }
}
//#endregion

//#region Verify user
const verifyUser = async(req, res) =>
{
    try 
    {
      const { username, password} = req.body;
      const user = await userService.serVerifyUser(username,password,res);
      return res;
    } 
    catch (error) 
    {
       return res.status(objVariables.ServerErrorCode).json({ status : objMessages.Failure, message: objMessages.InternalServerError, error : error.message});
    }
}
//#endregion

//#region  Get Nurse Profile Details
const getUserProfile = async(req, res) => {
  try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ status : objMessages.Failure, message: objMessages.TokenIsMandatory });
      }
      const intNurseID = await userService.serGetNurseIdFromToken(token);
      const userProfile = await userService.serGetUserProfile(intNurseID, res);
      return res.json(userProfile);
  } 
  catch (error) 
  {
      console.log(objMessages.ErrorFetchingUserProfile, error.message);
      return res.status(objVariables.ServerErrorCode).json({ status : objMessages.Failure, message: objMessages.InternalServerError, error : error.message});
  }
}
//#endregion

module.exports = {
  createNewUser,
  verifyUser,
  getUserProfile,
};