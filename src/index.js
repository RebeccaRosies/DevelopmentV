require('dotenv').config({
    path: './.env'
});

const {
    ObjectId
} = require('mongodb');

const {
    connectToDb,
    client
} = require('./dbConnection');

const collections = {}

connectToDb()
    .then((collection) => {
        collections["les1"] = collection;
    });

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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

        res.status(200).send(myData); //Send back the data with the response
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
            res.status(400).send('bad result, missing name or lastname');
            return;
        }

        //construct a document
        let newData = {
            speed: req.body.speed,
            safe: req.body.safe
        }

        console.log(newData)
        //insert into database
        let insertResult = await collections["les1"].insertOne(newData);
        console.log(insertResult)
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
        if (req.body.speed == undefined|| req.body.safe == undefined) {
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

app.listen(3000, (err) => {
    if (!err) {
        console.log("running on port " + 3000)
    } else {
        console.error(err)
    }
})