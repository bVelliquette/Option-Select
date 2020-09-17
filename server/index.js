const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const scheduleRouter = require("./routes/schedule");
const gameRouter = require("./routes/game");
var history = require('connect-history-api-fallback');
//const config = require("./config");


mongoose.connect(process.env.URI || config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(history());

app.use("/api/schedule", scheduleRouter);
app.use("/api/game", gameRouter);

//Handle Production
if (process.env.NODE_ENV === "production") {
  //Static folder
  app.use(express.static(__dirname + "/public"));

  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "public/index.html"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
