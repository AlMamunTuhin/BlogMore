import { con } from "../controller/restBlogController.js";
import { Router } from 'express';
const router = Router();


router.get('/', con.a);
router.get('/:id', con.b);

export default router;
