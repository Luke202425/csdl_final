const { MongoClient } = require("mongodb");

const uri = 'mongodb+srv://luke:Luke202425@csdlfinal.p3cqg0j.mongodb.net/?retryWrites=true&w=majority&appName=csdlFinal';
const client = new MongoClient(uri);

async function connectDB() {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  return client.db("csdlFinal");
}

module.exports = { connectDB, client };