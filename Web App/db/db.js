const mongoose = require("mongoose");

mongoose
  .connect(
      "mongodb+srv://mobile_app:test@stet-osuvn.mongodb.net/Mongodb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;
module.exports = db;
// process.env.MONGODB_URI ||