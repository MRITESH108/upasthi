const express = require('express');
const { adminRegister } = require('../../controllers/admin');

const adminRouter = express.Router();

adminRouter.post('/admin/register',adminRegister);  //register admin

module.exports = adminRouter;