const express = require('express');
const { handleRegisterCollege, handleLoginCollege } = require('../../controllers/college');

const collegeRouter = express.Router();

collegeRouter.post('/college/register', handleRegisterCollege);
collegeRouter.post('/college/login', handleLoginCollege);

module.exports = collegeRouter;