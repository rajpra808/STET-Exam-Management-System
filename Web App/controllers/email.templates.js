const { CLIENT_ORIGIN } = require("../config");

module.exports = {
  confirm: (id) => ({
    subject: "React Confirm Email",
    html: `
      <p>Enter the Number : 3765 </p>
    `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`,
  }),
};
