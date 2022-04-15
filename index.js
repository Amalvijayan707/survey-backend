const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const empRouter = require('./routes/emp.routes');
app.use(cors())
app.use(bodyParser.json())
app.use('/empl', empRouter)

mongoose.connect('mongodb+srv://amal:amalvijayan2209@cluster0.6i1ys.mongodb.net/emp_db?retryWrites=true&w=majority')
    .then((res) => {
        console.log('database connected successfully...')
    
    }).catch((err) => {
        console.log('an error has been occured while connecting to db' + err)
    })


app.listen(5000, () => {
    console.log('server running on port 5000')
})
