const express = require("express");

const AppCtrl = require("../controllers/app_controller");

const router = express.Router();

router.post("/academic", AppCtrl.createAcademic);
router.post("/personal", AppCtrl.createPersonal);
router.get("/academicdetails", AppCtrl.getAcademic);

router.get("/pay", AppCtrl.razorPay);
router.post("/signup", AppCtrl.createUser);
router.post("/login", AppCtrl.verifyUser);
router.post("/registration", AppCtrl.registerUser);
router.get("/registrationdetails", AppCtrl.getRegistration);
router.post(
  "/uploadTenth",
  AppCtrl.uploadTenth.single("upload"),
  AppCtrl.uploadTenthFun
);
router.post(
  "/uploadTwelveth",
  AppCtrl.uploadTwelveth.single("upload"),
  AppCtrl.uploadTwelvethFun
);
router.post(
  "/uploadSubject",
  AppCtrl.uploadSubject.single("upload"),
  AppCtrl.uploadSubjectFun
);
router.post(
  "/uploadSign",
  AppCtrl.uploadSignature.single("upload"),
  AppCtrl.uploadSignatureFun
);
router.post(
  "/uploadPhoto",
  AppCtrl.uploadPhoto.single("upload"),
  AppCtrl.uploadPhotoFun
);
router.post(
  "/uploadGradCir",
  AppCtrl.uploadGradCir.single("upload"),
  AppCtrl.uploadGradCirFun
);
router.post(
  "/uploadGradMark",
  AppCtrl.uploadGradMark.single("upload"),
  AppCtrl.uploadGradMarkFun
);
router.post(
  "/uploadComm",
  AppCtrl.uploadComm.single("upload"),
  AppCtrl.uploadCommFun
);
router.post(
  "/uploadBirth",
  AppCtrl.uploadBirth.single("upload"),
  AppCtrl.uploadBirthFun
);
router.post(
  "/uploadAadhar",
  AppCtrl.uploadAadhar.single("upload"),
  AppCtrl.uploadAadharFun
);

module.exports = router;
