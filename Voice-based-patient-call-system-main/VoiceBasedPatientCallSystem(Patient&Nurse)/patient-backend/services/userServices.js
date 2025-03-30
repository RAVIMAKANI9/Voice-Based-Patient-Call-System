const objVariables = require('../common/variables');
const objMessages = require('../common/messages');
const objNurseData = require("../models/nurses");
const objUserData  = require("../models/users");

const jwt = require("jsonwebtoken");

//#region  Create New User
const serCreateNewUser = async (user,res) =>
{
    try 
    {
      const newUser = new objUserData(user);
      await newUser.save();
      return res.status(objVariables.CreatedSuccessCode).json({ status : objMessages.Success , message: objMessages.UserCreatedSuccessfully });
    } 
    catch (error) 
    {
      return res.status(objVariables.ServerErrorCode).json({ status : objMessages.Failure, message: objMessages.SomethingWentWrong, error : error.message});
    }
}
//#endregion

//#region Verify User and Create Token
const serVerifyUser = async (strUserName, strPassword,res) =>
{
    try 
    {
        strUserName = strUserName.trim();
        strPassword = strPassword.trim();
        if (!strUserName || !strPassword) 
              return res.status(objVariables.NotFound).json({ status : objMessages.Failure , message: objMessages.MissingUsernameOrPassword });
        else
        {
            // Find user 
            const user = await objUserData.findOne({
                username: { $regex: new RegExp(`^${strUserName}$`, "i") }, // Case-insensitive search
                password: strPassword,
            });
    
            if (!user) {
                console.log(`Login failed: User with name "${strUserName}" .\n`);
                return res.status(objVariables.NotFound).json({ status : objMessages.Failure, message: objMessages.UserNotFoundOrIncorrectDetails });
            }
    
            console.log(`User found: ${user.username}\n`);
    
            // Generate JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });
  
            return res.json({ status : objMessages.Success , message: objMessages.LoginSuccessfully, token, user });
        }
    } 
    catch (error) 
    {
        console.log(objMessages.ErrorInLoginUser, error); 
        return res.status(objVariables.ServerErrorCode).json({ status : objMessages.Failure, message: objMessages.SomethingWentWrong, error : error.message});
    }
}
//#endregion

//#region Get User profile details
const serGetUserProfile = async (intNurseID, res) => {
  try 
  {
      const nurseDetails = await objNurseData.findOne({nurseID: intNurseID});
      res.json(nurseDetails);
  } 
  catch (error) 
  {
      return res.status(objVariables.ServerErrorCode).json({ status : objMessages.Failure, message: objMessages.SomethingWentWrong, error : error.message});
  }
};
//#endregion

//#region Get Nurse ID from token
const serGetNurseIdFromToken = async(strToken,res) =>
{
  try
  {  
    const token = strToken.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    const user = await objUserData.findById(decoded.id);
    if (!user) {
        return res.status(objVariables.NotFound).json({status : objMessages.Failure, message: objMessages.UserNotFoundOrIncorrectDetails});
    }
    return user.nurseID;
  }
  catch (error) 
  {
    console.log(objMessages.ErrorFetchingUserProfile, error.message);
    return res.status(objVariables.ServerErrorCode).json({ status : objMessages.Failure, message: objMessages.SomethingWentWrong, error : error.message});
  }
}
//#endregion

module.exports = {
    serCreateNewUser,
    serVerifyUser,
    serGetUserProfile,
    serGetNurseIdFromToken,
  };