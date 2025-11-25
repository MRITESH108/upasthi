const pool = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLoginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if email
        if (!email || !password) {
            return res.status(400).json({
                message: "Fill all fields carefully"
            });
        }
        //  QUERY
        const isStudent = await pool.query('SELECT * FROM student WHERE email=$1', [email]);

        // if student exist
        if (isStudent.rows.length === 0) {
            return res.status(404).json({
                message: "You dont exist!"
            });
        }

        const student = isStudent.rows[0];
        // match password
        const isMatch = await bcrypt.compare(password, student.password);
        //  if password not matched
        if (!isMatch) {
            return res.status(404).json({
                message: "Invalid email or password"
            });
        }

        // generate token
        const token = jwt.sign({id:student.id, email:student.email},process.env.JWT_SECRET, {expiresIn:'1h'});

        // push token in cookie later

        res.status(200).json({
            message:"Successfully loginned!",
            data:{
                id: student.id,
                email: student.email,
                token: token,
                college: student.collegeId
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Cannot login You!"
        })
    }
}


module.exports = {
    handleLoginStudent,
}