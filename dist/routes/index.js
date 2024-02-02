"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes\index.ts
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./products"));
const variants_1 = __importDefault(require("./variants"));
const router = express_1.default.Router();
router.use('/products', products_1.default);
router.use('/variants', variants_1.default);
module.exports = router;
