import { Router } from 'express';
import UserController from '../controller/UserController.js';

const router = new Router();
const user = new UserController();

router.post( '/login', user.login );
router.post( '/create', user.create );

module.exports = router;

