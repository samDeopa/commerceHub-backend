// routes\index.ts
import  express   from "express";
import productRouter from "./products";
import variantRouter from "./variants"
const router = express.Router();

router.use('/products', productRouter);
router.use('/variants', variantRouter);
module.exports  = router;
