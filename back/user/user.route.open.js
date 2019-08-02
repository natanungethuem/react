import { Router } from 'express';
import UserController from './user.controller';
import RouteUtils     from '../utils/RouteUtils';

const router = new Router();
const user = new UserController();

router.post( '/login', user.login );
router.post( '/create', user.create );
router.post( '/authChecker', RouteUtils.authChecker );

module.exports = router;

