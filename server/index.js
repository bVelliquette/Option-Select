const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const scheduleRouter = require("./routes/schedule");
const gameRouter = require("./routes/game");

//Connect Mongoose ((OBSURE ATLAS URI BEFORE LAUNCHING))
mongoose.connect(
  "mongodb+srv://visitor:3X6s7MWVbcVkblYV@cluster0.ndph3.mongodb.net/OptionSelect?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/schedule", scheduleRouter);
app.use("/api/game", gameRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
