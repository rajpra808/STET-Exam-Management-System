exports.PORT = process.env.PORT || 5000;

exports.CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://stet-web-sih2020.herokuapp.com"
    : "http://localhost:8000";

//exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:8000";

// exports.DB_URL =
//   process.env.NODE_ENV === "production"
//     ? process.env.DB_URL
//     : "mongodb+srv://mobile_app:test@stet-osuvn.mongodb.net/Mongodb?retryWrites=true&w=majority";
