import express from "express";
import passwordRouter from "./password.api.js"
import emailRouter from "./email.api.js"
import controlUserRouter from "./control.api.js"
import thirdPartyRouter from "./thirdparty.api.js"

const router = express.Router();

router.use('/email', emailRouter);
router.use('/password', passwordRouter);
router.use('/thirdparty', thirdPartyRouter);
router.use('/control', controlUserRouter);


export default router;