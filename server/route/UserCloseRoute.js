import { Router } from 'express';

import UserController from '../controller/UserController.js';
import RouteUtils from './RouteUtils.js';

const router = new Router();
const user = new UserController();

router.use( RouteUtils.authChecker );
router.post( '/edit', user.edit );

module.exports = router;

