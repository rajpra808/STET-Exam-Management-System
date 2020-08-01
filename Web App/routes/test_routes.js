const express = require("express");

const EmailCtrl = require("../controllers/email_controller");

const router = express.Router();

router.post("/email", EmailCtrl.collectEmail);

router.get("/email/confirm/:id", EmailCtrl.confirmEmail);

module.exports = router;
