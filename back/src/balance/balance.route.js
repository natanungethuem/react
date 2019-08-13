import { Router } from 'express';

import BalanceController from "./balance.controller";
import RouteUtils from '../utils/RouteUtils';

const router = new Router();
const balance = new BalanceController();

router.use( RouteUtils.authChecker );
router.get( '/balance', balance.balance );

module.exports = router;