const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// COLLEGE REGISTRATION LOGIC
const handleRegisterCollege = async (req, res) => {
  try {
    const { name, email, password, collegeCode } = req.body || {};
    // check if all fields
    if (!name || !email || !password || !collegeCode) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }
    // check if college already exists
    const collegeExistQuery = await pool.query(
      "SELECT * FROM colleges WHERE email = $1",
      [email],
    );
    if (collegeExistQuery.rows.length > 0) {
      return res.status(400).json({
        message: "College already exists!",
      });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert in database
    const insertCollegeQuery = `INSERT INTO colleges (name, collegeCode, email, password) VALUES ($1 ,$2, $3, $4) RETURNING id, name, collegeCode,email`;
    const values = [name, collegeCode, email, hashedPassword];
    const result = await pool.query(insertCollegeQuery, values);

    return res.status(201).json({
      message: "College registered successfully!",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err); // keep this
    return res.status(500).json({
      message: "Cannot register you!",
      error: err.message, // ✅ send message
      code: err.code, // ✅ pg error code if any
    });
  }
};

// COLLEGE LOGIN LOGIC

const handleLoginCollege = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check email and password
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required!",
      });
    }
    // QUERY
    const collegeQuery = await pool.query(
      "SELECT * FROM colleges WHERE email= $1",
      [email],
    );

    
    // if college not exist
    if (collegeQuery.rows.length === 0) {
      return res.status(404).json({
        message: "Invalid email or password",
      });
    }
    
    const college = collegeQuery.rows[0];
    
    // match your password
    const isMatch = await bcrypt.compare(password, college.password);
    //  if password not matched
    if (!isMatch) {
      return res.status(404).json({
        message: "Invalid email or password",
      });
    }

    // generate token
    const token = jwt.sign(
      { id: college.id, email: college.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // push token in cookie later

    res.status(200).json({
      message: "Successfully logined",
      data: {
        id: college.id,
        name: college.name,
        collegeCode: college.collegecode,
        email: college.email,
        token,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Cannot login you!",
      error: err,
    });
  }
};

// RANDOM CODE GENERATION LOGIC
const generateCode = async (req, res) => {
  try {
    collegeId = 5; // later from middlewares
    adminId = 5; // later from middlewares

    // Check if today's code exists for this college
    const today = new Date().toISOString().split("T")[0];
    const existingCode = await pool.query(
      `SELECT code, expires_at FROM daily_codes 
             WHERE college_id = $1 AND DATE(generated_at) = $2 
             AND expires_at > NOW()
             ORDER BY generated_at DESC LIMIT 1`,
      [collegeId, today],
    );

    if (existingCode.rows.length > 0) {
      return res.status(200).json({
        message: "Today's code already generated",
        code: existingCode.rows[0].code,
        expiresAt: existingCode.rows[0].expires_at,
      });
    }

    // Generate new code
    const charboundary = "A9BC6defGHJ45Kmnp7qrs8tuVWXYZ123";
    let randmCode = "";
    for (let i = 0; i < 6; ++i) {
      randmCode +=
        charboundary[Math.floor(Math.random() * charboundary.length)];
    }

    // Save to DB
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    await pool.query(
      `INSERT INTO daily_codes (college_id, code, expires_at, created_by)
             VALUES ($1, $2, $3, $4)`,
      [collegeId, randmCode, expiresAt, adminId],
    );

    res.status(201).json({
      message: "Code generated and saved successfully",
      code: randmCode,
    });
  } catch (error) {
    console.error("Generate code error:", error);
    res.status(500).json({
      message: "Failed to generate code",
      error: error,
    });
  }
};

module.exports = {
  handleRegisterCollege,
  handleLoginCollege,
  generateCode,
};
