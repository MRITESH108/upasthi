const express = require('express');
const { handleLoginStudent, handleRegisterStudent, markAttendance } = require('../../controllers/student');

const studentRouter = express.Router();

// later add auth controller to validate the user

studentRouter.post('/student/register', handleRegisterStudent);
studentRouter.post('/student/login', handleLoginStudent);
studentRouter.post('/student/markattendance', markAttendance);

module.exports = studentRouter;