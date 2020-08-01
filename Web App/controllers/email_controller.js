const User = require("../models/user_model.");
const sendEmail = require("./email.send");
const msgs = require("./email.msgs");
const templates = require("./email.templates");

exports.collectEmail = (req, res) => {
  const { name, email, aadhar_no, phone_no, pwd } = req.body;
  console.log(req.body);
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        User.create({ name, email, aadhar_no, phone_no, pwd })
          .then((newUser) =>
            sendEmail(newUser.email, templates.confirm(newUser._id))
          )
          .then(() => res.json({ msg: msgs.confirm }))
          .catch((err) => console.log(err));
      } else if (user && !user.confirmed) {
        sendEmail(user.email, templates.confirm(user._id)).then(() =>
          res.json({ msg: msgs.resend })
        );
      } else {
        res.json({ msg: msgs.alreadyConfirmed });
      }
    })
    .catch((err) => console.log(err));
};

exports.confirmEmail = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        res.json({
          msg: msgs.couldNotFind,
          name: "",
          email: "",
          aadhar_no: "",
          pwd: "",
          phone_no: "",
        });
      } else if (user && !user.confirmed) {
        User.findByIdAndUpdate(
          id,
          { confirmed: true },
          { useFindAndModify: false }
        )
          .then(() =>
            res.json({
              msg: msgs.confirmed,
              name: user.name,
              email: user.email,
              aadhar_no: user.aadhar_no,
              pwd: user.aadhar_no,
              phone_no: user.phone_no,
            })
          )
          .catch((err) => console.log(err));
      } else {
        res.json({
          msg: msgs.alreadyConfirmed,
          name: user.name,
          email: user.email,
          aadhar_no: user.aadhar_no,
          pwd: user.aadhar_no,
          phone_no: user.phone_no,
        });
      }
    })
    .catch((err) => console.log(err));
};
