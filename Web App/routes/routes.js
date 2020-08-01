const express = require("express");

const AppCtrl = require("../controllers/app_controller");

const router = express.Router();

router.post("/academic", AppCtrl.createAcademic);
router.post("/personal", AppCtrl.createPersonal);
router.get("/academicdetails", AppCtrl.getAcademic);
router.post("/uploadAadhar", AppCtrl.uploadAadhar);
router.post("/uploadTenth", AppCtrl.uploadTenth);
router.post("/uploadTwelveth", AppCtrl.uploadTwelveth);
router.post("/uploadSubject", AppCtrl.uploadSubject);
router.post("/uploadSign", AppCtrl.uploadSignature);
router.post("/uploadPhoto", AppCtrl.uploadPhoto);
router.post("/uploadBirth", AppCtrl.uploadBirth);
router.post("/uploadGradCir", AppCtrl.uploadGradCir);
router.post("/uploadGradMark", AppCtrl.uploadGradMark);
router.post("/uploadComm", AppCtrl.uploadTenth);
router.get("/pay", AppCtrl.razorPay);
router.post("/signup", AppCtrl.createUser);
router.post("/login", AppCtrl.verifyUser);
router.post("/registration", AppCtrl.registerUser);
router.get("/registrationdetails", AppCtrl.getRegistration);

module.exports = router;
