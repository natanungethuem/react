import { Router } from 'express';

import UserController from '../controller/UserController.js';


let router = new Router();
let user = new UserController();

router.post( '/login', user.login );

module.exports = router;

