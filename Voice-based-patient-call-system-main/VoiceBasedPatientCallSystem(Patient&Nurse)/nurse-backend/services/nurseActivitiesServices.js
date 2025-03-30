const objVariables = require('../common/variables');
const objMessages = require('../common/messages');
const objPatientRequest = require("../models/patientRequests");
const jwt = require("jsonwebtoken");

//#region Nurse -Patient Task
const serCreatePatientRequest = async (patientID, nurseID, request,reqstatus, res) => {
    try 
    {
        const newRequest = new objPatientRequest({patientID,nurseID,request,reqstatus});
        await newRequest.save();
        return res.status(objVariables.CreatedSuccessCode).json({ status : objMessages.Success , message :objMessages.PatientRequestCreatedSucessfully});
    } 
    catch (error) 
    {
        console.log(objMessages.ServiceError, error.message);
        return res.status(objVariables.ServerErrorCode).json({ status : objMessages.Failure, message: objMessages.SomethingWentWrong, error : error.message});
    }
};

const serUpdatePatientRequestStatus = async (requestId, reqstatus, intNurseID,res) => {
    try 
    {
        const updatedRequest = await objPatientRequest.findByIdAndUpdate(requestId, { status: reqstatus }, { new: true });
        return res.status(objVariables.SuccessCode).json({ status : objMessages.Success , message :objMessages.PatientRequestUpdatedSuccessfully });
    } 
    catch (error) 
    {
        console.log(objMessages.ServiceError, error.message);
        return res.status(objVariables.ServerErrorCode).json({ status : objMessages.Failure, message: objMessages.SomethingWentWrong, error : error.message});
    }
};

const serGetPatientRequests = async (intNurseID,res) => {
    try 
    {
        const requests = await objPatientRequest.find({ nurseID: intNurseID });
        return requests;
    } 
    catch (error) 
    {
        console.log(objMessages.ServiceError, error.message);
        return res.status(objVariables.ServerErrorCode).json({ status : objMessages.Failure, message: objMessages.SomethingWentWrong, error : error.message});
    }
};
//#endregion

module.exports = {
    serCreatePatientRequest,
    serUpdatePatientRequestStatus,
    serGetPatientRequests,
};
