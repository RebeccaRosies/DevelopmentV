require('dotenv').config({
    path: './.env'
});

const {
    MongoClient,
    ObjectId
} = require('mongodb');


const url = process.env.DBURL;
const client = new MongoClient(url);
const dbName = "DevV";
const port = 3000;

async function connectToDb() {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const collection = db.collection("les1");
    return collection
}

module.exports = {
    connectToDb,
    client
}
//connect to the database