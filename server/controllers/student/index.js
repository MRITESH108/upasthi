const pool = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// student registration controller
const handleRegisterStudent = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, address, startSessionYear, dob } = req.body;
    // const collegeId = req.user.id;
    const collegeId = 5;

    // Validation
    if (!email || !name || !startSessionYear || !address || !dob) {
      return res.status(400).json({
        message: "All fields are required!"
      });
    }

    // Check if student already exists
    const Query = await pool.query('SELECT * FROM students WHERE email=$1', [email]);
    if (Query.rows.length > 0) {
      return res.status(400).json({
        message: 'Student already registered!'
      });
    }


    const password = "maruti"; // to be random later

    // Insert student
    const insertQuery = `
      INSERT INTO students (name, collegeId, email, password, address, startSessionYear, dob)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, name, collegeId, email, password
    `;
    const values = [name, collegeId, email, password, address, startSessionYear, dob];
    const result = await pool.query(insertQuery, values);

    return res.status(201).json({
      message: "Student registered successfully!",
      data: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot Register You!"
    });
  }
};


// student login controller 
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
    const isStudent = await pool.query('SELECT * FROM students WHERE email=$1', [email]);

    // if student exist
    if (isStudent.rows.length === 0) {
      return res.status(404).json({
        message: "You dont exist!"
      });
    }

    const student = isStudent.rows[0];
    // match password
    // const isMatch = await bcrypt.compare(password, student.password);

    //  if password not matched
    // if (!isMatch) {
    //     return res.status(404).json({
    //         message: "Invalid email or password"
    //     });
    // }

    if (password !== student.password) {
      return res.status(404).json({
        message: "Invalid email or password"
      });
    }

    // generate token
    const token = jwt.sign({ id: student.id, email: student.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // push token in cookie later

    res.status(200).json({
      message: "Successfully loginned!",
      data: {
        id: student.id,
        email: student.email,
        token: token,
        college: student.collegeId
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: "Cannot login You!"
    });
  }
};

// attendance mark logic
const markAttendance = async (req, res) => {
    try {
        
        const { code } = req.body;
        // console.log(code);
        const studentId = 1; 
        const collegeId = 5;

        if (!code || code.length !== 6) {
            return res.status(400).json({
                message: "Valid 6-character code required"
            });
        }

        // 1. Verify code exists and is valid for today
        const today = new Date().toISOString().split('T')[0];
        const codeCheck = await pool.query(
            `SELECT id FROM daily_codes 
             WHERE college_id = $1 
               AND code = $2 
               AND DATE(generated_at) = $3 
               AND expires_at > NOW()`,
            [collegeId, code, today]
        );

        if (codeCheck.rows.length === 0) {
            return res.status(400).json({
                message: "Invalid or expired code"
            });
        }

        // 2. Check if student already marked attendance today
        const existingAttendance = await pool.query(
            `SELECT id FROM attendance_records 
             WHERE college_id = $1 
               AND student_id = $2 
               AND record_date = $3`,
            [collegeId, studentId, today]
        );

        if (existingAttendance.rows.length > 0) {
            return res.status(409).json({
                message: "Attendance already marked today"
            });
        }

        // 3. Mark attendance as present
        await pool.query(
            `INSERT INTO attendance_records (college_id, student_id, record_date, status)
             VALUES ($1, $2, $3, 'present')`,
            [collegeId, studentId, today]
        );

        res.status(201).json({
            message: "Attendance marked successfully",
            status: "present",
            date: today
        });

    } catch (error) {
        console.error('Mark attendance error:', error);
        res.status(500).json({
            message: "Failed to mark attendance",
            error: error.message
        });
    }
};



module.exports = {
  handleRegisterStudent,
  handleLoginStudent,
  markAttendance
}