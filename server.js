// Setup empty JS object to act as endpoint for all routes

// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
const { emitWarning } = require('process');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=3003;
const server=app.listen(port,()=>{
    console.log(`running on the port ${port}`)
})


/* Empty JS array to act as endpoint for all routes */
let projectData = {};

/*post data */
app.post('/postData',postData);
 
function postData(req,res){


    projectData['temperature'] = req.body.Temper;
    projectData['date'] = req.body.currentDate;
 
    projectData['feelings'] = req.body.contentOfFeelings;

    res.send(projectData)
    console.log("post request from the server")
    console.log(projectData)

}


/*get data*/
app.get('/getData',getData);

function getData(req,res)
{
    res.send(projectData);
    console.log("get request from the server")
    console.log(projectData);
}
