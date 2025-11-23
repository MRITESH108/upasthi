const express = require('express');
const { handleRegisterCollege } = require('../../controllers/college');

const collegeRouter = express.Router();

collegeRouter.get('/college', handleRegisterCollege);

module.exports = collegeRouter;