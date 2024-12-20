import { con } from "../controller/userController.js";
import { Router } from 'express';
const router = Router();


router.get('/:id', con.userHome);

export default router;
