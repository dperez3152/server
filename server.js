const express = require('express')
const {MongoClient, ObjectId} = require('mongodb');
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://keeper-app-midterm-daniela-perezs-projects.vercel.app',
    credentials: true,
  }));

const uri = 'mongodb+srv://dgp2115:pasSword1212@cluster0.kmzjqfw.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri);
const db = client.db("NotesAppDatabase"); 

const port = process.env.PORT || 3000;

async function main(){
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected to MongoDB");
        app.listen(port, "0.0.0.0", ()=>{console.log("server started on port ${port}")});
 
    } catch (e) {
        console.error(e);
    }
}

/*app.options("/api/notes", (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://keeper-app-midterm-bqpq8eknf-daniela-perezs-projects.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(204).send(); // No Content for preflight requests
});*/

app.get("/api/notes", async (req, res) =>{
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
        const deletedNote = await db.collection("notes").deleteOne({ _id: new ObjectId(idToDelete) });

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json({ message: 'Note deleted successfully', deletedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

main().catch(console.error);