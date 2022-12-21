require('dotenv').config({
    path: './.env'
});

//const cors = require('cors');

const {
    ObjectId
} = require('mongodb');

const {
    connectToDb,
    client
} = require('./dbConnection');

const collections = {}

const setup = () =>
    new Promise((resolve, reject) => { 

        connectToDb()
            .then((collection) => {

                collections["les1"] = collection;
                resolve(app)
            })
            .catch((error)=>{
                console.error(error)
            })
     }) 
 

const express = require('express');
const bodyParser = require("body-parser");

const app = express();

//app.use(cors({origin: '*'}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.get("/", (request, response) => {
    response.send({
        message: "hi world"
    })
})

app.get("/dataLog", async (req, res) => {
    try {
        const myData = await collections["les1"].find({}).toArray(); // Find document & convert it to an array
        console.log(myData); // Print to the console
        //res.status(200).send(myData); //Send back the data with the response
        
        try{
            res.status(200).send(myData)
        } catch (error){
            res.status(400).send({message:'your data was not found'})
        }
    
    } catch (err) {
        console.log('error', err);
        res.status(500).send({
            error: 'an error has occured'
        });
    } 
})

/* 
@param name = first name of the person
@param lastname = last name of the person
 */

app.post('/dataLog', async (req, res) => {
    try {
        if (req.body.speed == undefined || req.body.safe == undefined) {
            res.status(400).send('ERROR: missing speed or safe');
            return;
        }
        else if (typeof req.body.speed != 'number'){
            console.log("ERROR STRING");
            res.status(400).send('ERROR: speed should be a number');
            return;
        }
        else if (typeof req.body.safe != 'boolean'){
            console.log("ERROR STRING");
            res.status(400).send('ERROR: safe should be a boolean');
            return;
        }
       console.log(req.body.speed);

        //construct a document
        let newData = {
            speed: req.body.speed,
            safe: req.body.safe
        }

        console.log(newData)
        //insert into database
        let insertResult = await collections["les1"].insertOne(newData);
        //console.log(insertResult)
        res.send(insertResult)
        return;

    } catch (error) {
        console.log("error", error);
        res.status(500).send({
            error: 'an error has occured',
            value: error
        });
    }
})

app.delete('/dataLog', async (req, res) => {
    try {
        const message = {
            deleted: "All data deleted"
        }
        // Deleting the names
        const result = await collections["les1"].deleteMany();
        if (result.deletedCount >= 1) {
            res
                .status(200)
                .send(message);
        } else {
            res
                .status(404)
                .send("No documents matched the query. Deleted 0 documents.");
        }
    } catch (err) {
        console.log('error');
        res.status(500).send({
            error: 'an error has occured',
        });
    }
})

app.put("/dataLog/:id", async (req, res) => {
    // check for body data
    const error = {
        error: "Bad request",
        value: "Missing speed or safe"
    }

    try {
        if (req.body.speed == undefined || req.body.safe == undefined) {
            res.status(400).send(error);
            return;
        }

        // Create a query for a challenge to update
        const query = {
            _id: ObjectId(req.params.id)
        };
        const message = {
            deleted: "Data updated"
        }

        // update a name
        const updateData = {
            speed: req.body.speed,
            safe: req.body.safe
        };
        console.log(query, updateData);
        // Updating the name
        const result = await collections["les1"].updateOne(query, {
            $set: updateData
        });

        // Send back success message
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "something went wrong",
        });
    }
});


module.exports = setup;
