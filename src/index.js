require('dotenv').config({ path: './.env' });
const {
    MongoClient,
    ObjectId
} = require('mongodb');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const url = process.env.DBURL;
const client = new MongoClient(url);
const dbName = "DevV";
const port = 3000;

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
        //connect to the database
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection("les1"); // Use the collection "les1"

        const myNames = await col.find({}).toArray(); // Find document & convert it to an array
        console.log(myNames); // Print to the console

        res.status(200).send(myNames); //Send back the data with the response
    } catch (err) {
        console.log('error');
        res.status(500).send({
            error: 'an error has occured'
        });
    } finally {
        await client.close();
    }
})

/* 
@param name = first name of the person
@param lastname = last name of the person
 */

app.post('/names', async (req, res) => {
    try {
        //connect with database
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        console.log("getting", dbName)
        const col = db.collection("les1"); // Use the collection "les1"
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
        let insertResult = await col.insertOne(newName);
        res.send(insertResult)
        return;

    } catch (error) {
        console.log("error");
        res.status(500).send({
            error: 'an error has occured',
            value: error
        });
    } finally {
        await client.close();
    }
})

app.delete('/names', async (req, res) => {
    try {
        //connect to the database
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection("les1"); // Use the collection "les1"

        const message = {
            deleted: "All names deleted"
        }
        // Deleting the names
        const result = await col.deleteMany();
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
    } finally {
        await client.close();
    }
})

app.put("/name/:id", async (req, res) => {
    // check for body data
    const error = {
        error: "Bad request",
        value: "Missing name or lastname"
    }


    try {
        //read the file
        //connect to the database
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection("les1"); // Use the collection "les1"

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
        const result = await col.updateOne(query, {
            $set: updateName
        });

        // Send back success message
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "something went wrong",
        });
    } finally {
        await client.close();
    }
});

app.listen(3000, (err) => {
    if (!err) {
        console.log("running on port " + 3000)
    } else {
        console.error(err)
    }
})