import { con } from "../controller/blogController.js";
import { Router } from 'express';
const router = Router();


router.get('/', con.allBlogs);
router.get('/new', con.renderNew);
router.get('/:id', con.oneBlog);
router.get('/:id/edit', con.editBlog);
router.post('/', con.createNewBlog);
router.put('/:id', con.updateBlog);
router.delete('/:id', con.deleteBlog);


export default router;
