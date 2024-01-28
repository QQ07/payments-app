const express = require("express");
const cors = require("cors");
const APIrouter = require("./routes");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/", APIrouter);

app.get("/", (req, res) => {
  res.send("payments app Backend");
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log("http://localhost:" + (process.env.PORT || 3000));
});
