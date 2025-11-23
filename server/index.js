const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors({
    origin:[
        // add your localhost url
        // add your production url
    ]
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({
        message:"let's start the project upasthi!"
    })
})



app.listen(8000, ()=>{
    console.log('server started at localhost:8000');
})