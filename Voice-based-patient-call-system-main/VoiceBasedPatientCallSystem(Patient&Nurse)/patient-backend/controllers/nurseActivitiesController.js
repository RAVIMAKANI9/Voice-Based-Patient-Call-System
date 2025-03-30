const express = require("express");
const router = express.Router();
const app = express();

app.use(express.json());

const objMessages = require('../common/messages');
const objVariables = require('../common/variables');
const nurseService = require('../services/nurseActivitiesServices');
const userService = require('../services/userServices');

//#region Nurse - Patient Task 
const createPatientRequest = async (req, res) => {
    try 
    {
        const { patientID, request, nurseID } = req.body;
        const token = req.headers.authorization;
        if (!token) {
          return res.status(objVariables.NotFound).json({ status : objMessages.Failure, message: objMessages.TokenIsMandatory });
        }
        const intNurseID = await userService.serGetNurseIdFromToken(token);
        const newRequest = await nurseService.serCreatePatientRequest(patientID, nurseID, request,"pending",res);
        return res;
    } 
    catch (error) 
    {
        return res.status(objVariables.ServerErrorCode).json({ status : objMessages.Failure, message: objMessages.InternalServerError, error : error.message});
    }
};

const updatePatientRequestStatus = async (req, res) => {
    try 
    {
        const { requestId, status } = req.body;
        const token = req.headers.authorization;
        if (!token) {
          return res.status(objVariables.NotFound).json({status : objMessages.Failure, message: objMessages.TokenIsMandatory });
        }
        const intNurseID = await userService.serGetNurseIdFromToken(token);
        const updatedRequest = await nurseService.serUpdatePatientRequestStatus(requestId, status,intNurseID,res);
        return res
    } 
    catch (error) 
    {
        return res.status(objVariables.ServerErrorCode).json({ status : objMessages.Failure, message: objMessages.InternalServerError, error : error.message});
    }
};

const getPatientRequests = async (req, res) => {
    try 
    {
        const token = req.headers.authorization;
        if (!token) {
          return res.status(objVariables.NotFound).json({ status : objMessages.Failure,message: objMessages.TokenIsMandatory });
        }
        const intNurseID = await userService.serGetNurseIdFromToken(token);
        const requests = await nurseService.serGetPatientRequests(intNurseID);
        res.json(requests);
    } 
    catch (error) 
    {
        return res.status(objVariables.ServerErrorCode).json({ status : objMessages.Failure, message: objMessages.InternalServerError, error : error.message});
    }
};
//#endregion

module.exports = {
    createPatientRequest,
    updatePatientRequestStatus,
    getPatientRequests,
};
