"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainRouter = require("./routes/index");
const cors = require("cors");
const app = (0, express_1.default)();
const PORT = 8080;
const router = express_1.default.Router();
app.use(express_1.default.json());
app.use(cors());
app.use("/", mainRouter);
app.listen(PORT, () => {
    console.log("App running on port " + PORT);
});
module.exports = { app };
