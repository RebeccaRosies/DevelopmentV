const {
    MongoClient,
    ObjectId
} = require('mongodb');

//local mongo URL - use with docker
//const url = process.env.DBURL ? process.env.DBURL : "mongodb://Admin:rebeccarosiesadmin@127.0.0.1:27017?retryWrites=true&w=majority";
//online Mongodb URL - use in CI testing
const url =  "mongodb+srv://admin:rebeccarosiesadmin@cluster0.dzxmp.mongodb.net/?retryWrites=true&w=majority"

console.log(url)
const client = new MongoClient(url);
const dbName = "DevV";
const port = 80;

async function connectToDb() {
    await client.connect();
    //console.log("Connected correctly to server");
    const db = client.db(dbName);
    const collection = db.collection("les1");
    return collection
}

module.exports = {
    connectToDb,
    client
}
//connect to the database