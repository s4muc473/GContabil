const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const entriesController = require('../controllers/entriesController')
const exitsController = require('../controllers/exitsController');
const balanceController = require('../controllers/balanceController');

router.post('/create', userController.createUser);
router.get('/auth/:password', userController.authUser);
router.get('/list', userController.listUsers);

router.post('/entrie', entriesController.newEntrie);
router.get('/entrie', entriesController.getEntries);
router.get('/entrie/delete/:id/:value', entriesController.deleteEntrie);

router.post('/exit', exitsController.newExit);
router.get('/exit', exitsController.getExits);
router.get('/exit/delete/:id/:value', exitsController.deleteExit);

router.get('/balance', balanceController.getBalance);

module.exports = router;
