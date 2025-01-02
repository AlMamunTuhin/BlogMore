import { con } from "../controller/authController.js";
import { Router } from 'express';
const router = Router();

router.get('/', con.a);
router.get('/login', con.b);
router.get('/signup', con.c);   
router.post('/logout', con.e);
router.post('/login', con.d);
router.post('/signup', con.f);

export default router;
