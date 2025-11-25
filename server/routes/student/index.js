const express = require('express');
const { handleLoginStudent } = require('../../controllers/student');

const studentRouter = express.Router();

studentRouter.post('/student/login', handleLoginStudent);

module.exports = studentRouter;