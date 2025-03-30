const express = require("express");
const userController = require("../controllers/userController");
const nurseController = require("../controllers/nurseActivitiesController");

const router = express.Router();

router.post("/user/verifyUser",userController.verifyUser);
router.post("/user/createNewUser",userController.createNewUser);
router.get("/user/getUserProfile",userController.getUserProfile);
router.get("/nurse/getPatientRequests", nurseController.getPatientRequests);
router.put("/nurse/updatePatientRequests", nurseController.updatePatientRequestStatus);
router.post("/nurse/createPatientRequests", nurseController.createPatientRequest);

module.exports = router;