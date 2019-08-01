import { Router } from 'express';
import UserController from './user.controller';

const router = new Router();
const user = new UserController();

router.post( '/login', user.login );
router.post( '/create', user.create );

module.exports = router;

