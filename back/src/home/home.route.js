import { Router } from 'express';

import BalanceController from "../balance/balance.controller";
import RouteUtils        from '../utils/RouteUtils';

const router = new Router();
const balance = new BalanceController();

router.use( RouteUtils.authChecker );

module.exports = router;