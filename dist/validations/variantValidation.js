"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantSchema = void 0;
// validations/variantValidation.ts
const zod_1 = require("zod");
exports.variantSchema = zod_1.z.object({
    name: zod_1.z.string(),
    sku: zod_1.z.string(),
    additionalCost: zod_1.z.number(),
    stockCount: zod_1.z.number(),
});
