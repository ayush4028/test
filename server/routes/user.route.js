import { Router } from "express";
import { Next,Submit, getPercentage } from "../controllers/user.controller.js";
import upload from "../middlewars/multer.middleware.js";
const router =Router();

router.post('/first-level',Next);
router.post('/second-level/:id',upload.single("file"),Submit);
router.get('/get/:id', getPercentage);


export default router;