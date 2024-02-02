import bodyParser from "body-parser";
import express from "express";
const mainRouter =  require("./routes/index")
const cors = require("cors");
const app = express();
const PORT  = 8080;
const router = express.Router();

app.use(express.json());
app.use(cors());

app.use("/",mainRouter)

app.listen(PORT, () => {
    console.log("App running on port " + PORT);
  });
 module.exports = { app};

  
