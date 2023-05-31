const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const { token } = require('./middleware/token');
const { checkAdmin, checkTeacher, checkStudent } = require('./middleware/checkRole');

require("dotenv").config()


const app = express();

mongoose.connect(process.env.DB_global_link)
.then(data=>{
    if(data){
    console.log('db connected');
    }else{
        throw new Error({title:"err"})
    }
})
.catch(err=>{
    console.log(err);
})

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}));

app.use('/auth',require("./routes/auth"))

app.use('/admin',token,checkAdmin,require("./routes/admin"))
app.use('/teacher',token,checkTeacher,require("./routes/techer"))
app.use('/student',token,checkStudent,require("./routes/student"))


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> console.log(`App listening on ${PORT}`))