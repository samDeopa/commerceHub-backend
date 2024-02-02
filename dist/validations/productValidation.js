"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
// validations/productValidation.ts
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    variants: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        sku: zod_1.z.string(),
        additionalCost: zod_1.z.number(),
        stockCount: zod_1.z.number(),
    })),
});
