require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db/db");
const appRouter = require("./routes/routes");
const emailRouter = require("./routes/test_routes");

const app = express();
const { PORT } = require("./config");
const apiPort = PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

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

app.use("/details", appRouter);
app.use("/confirmation", emailRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
