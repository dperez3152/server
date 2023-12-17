const express = require('express')
const {MongoClient, ObjectId} = require('mongodb');
const app = express()
const cors = require("cors");

const bodyParser = require('body-parser'); // middleware making object 
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'https://server-production-e885.up.railway.app',
    credentials: true,  // Enable credentials (e.g., cookies, authentication headers)
  }));

const uri = 'mongodb+srv://dgp2115:pasSword1212@cluster0.kmzjqfw.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri); // creating instance 
const db = client.db("NotesAppDatabase"); // referrencing db

async function main(){
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected to MongoDB");
        app.listen(port, "0.0.0.0", ()=>{console.log("server started on port {port}")});
 
    } catch (e) {
        console.error(e);
    }
}

app.get("/api/notes", async (req, res) =>{
    res.header('Access-Control-Allow-Origin', 'https://keeper-app-midterm-3v8f8cyga-daniela-perezs-projects.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');

    try {
    const data = await db.collection("notes").find().toArray();
    res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.post("/api/notes", async (req, res) => {
    try {
        console.log("req received");
        const data = req?.body;

        const result = await db.collection("notes").insertOne(data);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.delete('/api/notes/:id', async (req, res) => {
    const idToDelete = req.params.id;
    try {
        const deletedName = await db.collection("notes").deleteOne({ _id: new ObjectId(idToDelete) });

        if (!deletedName) {
            return res.status(404).json({ message: 'Name not found' });
        }

        res.json({ message: 'Note deleted successfully', deletedName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

main().catch(console.error);