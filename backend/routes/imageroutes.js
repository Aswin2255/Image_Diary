import express from "express";
import { Imageupload, getallimage } from "../controllers/imagecontroller.js";
import { verifyuser } from "../middlewares/userverify.js";
const router = express.Router()
router.post('/upload',verifyuser,Imageupload)
router.get('/allimage',verifyuser,getallimage)
export default router;