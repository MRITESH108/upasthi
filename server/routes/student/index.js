const express = require('express');
const { handleLoginStudent, handleRegisterStudent } = require('../../controllers/student');

const studentRouter = express.Router();

studentRouter.post('/student/register', handleRegisterStudent);
studentRouter.post('/student/login', handleLoginStudent);

module.exports = studentRouter;