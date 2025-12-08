const express = require('express');

const { handleRegisterCollege, handleLoginCollege, generateCode } = require('../../controllers/college');

const collegeRouter = express.Router();

collegeRouter.post('/college/register', handleRegisterCollege);
collegeRouter.post('/college/login', handleLoginCollege);
collegeRouter.get('/college/attendancecode', generateCode);

module.exports = collegeRouter;