import express from 'express'
import { getUsersession, login, logout, register } from '../controllers/authcontrollers.js';

import { verifyuser } from '../middlewares/userverify.js';

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.get('/getusersession',verifyuser,getUsersession)
export default router;