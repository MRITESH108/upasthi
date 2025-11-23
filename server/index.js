const express = require('express');
const cors = require('cors');

            // Router Source
const collegeRouter = require('./routes/college');


const app = express();
app.use(cors({
    origin:[
        // add your localhost url
        // add your production url
    ],
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


app.listen(8000, ()=>{
    console.log('server started at http://localhost:8000/');
})