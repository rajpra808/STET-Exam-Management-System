require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require("path");
const db = require("./db/db");
const appRouter = require("./routes/routes");
const emailRouter = require("./routes/test_routes");
// const cookieSession = require("cookie-session");

const app = express();
const { PORT } = require("./config");
const apiPort = PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1', 'key2']
// }));

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
}

app.use("/api/details", appRouter);
app.use("/api/confirmation", emailRouter);

var server = app.listen(apiPort, function () {
  var port = server.address().port;
  console.log(server.address().host);
  console.log(server.address());
  console.log("App now running on port", port);
});