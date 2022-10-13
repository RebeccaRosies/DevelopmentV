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

app.get("/names", async (req, res) => {
    try {
        const myNames = await collections["les1"].find({}).toArray(); // Find document & convert it to an array
        console.log(myNames); // Print to the console

        res.status(200).send(myNames); //Send back the data with the response
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

app.post('/names', async (req, res) => {
    try {
        if (!req.body.name || !req.body.lastname) {
            res.status(400).send('bad result, missing name or lastname');
            return;
        }

        //construct a document
        let newName = {
            name: req.body.name,
            lastname: req.body.lastname
        }

        console.log(newName)
        //insert into database
        let insertResult = await collections["les1"].insertOne(newName);
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

app.delete('/names', async (req, res) => {
    try {
        const message = {
            deleted: "All names deleted"
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

app.put("/name/:id", async (req, res) => {
    // check for body data
    const error = {
        error: "Bad request",
        value: "Missing name or lastname"
    }

    try {
        if (!req.body.name || !req.body.lastname) {
            res.status(400).send(error);
            return;
        }

        // Create a query for a challenge to update
        const query = {
            _id: ObjectId(req.params.id)
        };
        const message = {
            deleted: "Name updated"
        }

        // update a name
        const updateName = {
            name: req.body.name,
            lastname: req.body.lastname
        };
        console.log(query, updateName);
        // Updating the name
        const result = await collections["les1"].updateOne(query, {
            $set: updateName
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