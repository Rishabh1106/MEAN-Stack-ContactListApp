var express = require('express')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var cors = require('cors')
var path = require('path')


var app = express();
const route = require('./routes/route');


//connect to mongodb

mongoose.connect('mongodb://localhost:27017/contactlist');

//on connection
mongoose.connection.on('connected',()=>{
    console.log('Connect to mongodb');
})
// on connection error
mongoose.connection.on('err',()=>{
    console.log('Error in connection to mongodb',err);
})


const port = 3000;

//adding middleware --cors
app.use(cors())

//body parser
app.use(bodyparser.json())

//static files
app.use(express.static(path.join(__dirname,'public')))

// so all routes will have preceding /api with them
app.use('/api',route);



//testing route
app.get('/',(req,res)=>{
    res.send('working!!!');
})

app.listen(port,()=>{
    console.log("server is running at port : ",port)
})