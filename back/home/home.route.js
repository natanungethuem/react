import { Router } from 'express';

import UserController from '../user/user.controller';
import RouteUtils from '../utils/RouteUtils';

const router = new Router();
const user = new UserController();

router.use( RouteUtils.authChecker );
router.post( '/home', user.edit );

module.exports = router;