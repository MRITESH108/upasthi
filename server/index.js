const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Router Source
const collegeRouter = require('./routes/college');
const studentRouter = require('./routes/student');

dotenv.config(); 

const app = express();
app.use(cors({
    origin:[
        'http://localhost:5173',

    ],
    credentials:true,
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//  Routes 
app.get('/',(req,res)=>{
    res.json({
        message:"let's start the project upasthi!"
    })
});

app.use('/', collegeRouter); //college route
app.use('/', studentRouter); // student route


const SERVER_PORT= process.env.SERVER_PORT || 8000;
app.listen(SERVER_PORT, ()=>{
    console.log(`server started at http://localhost:${SERVER_PORT}/`);
});