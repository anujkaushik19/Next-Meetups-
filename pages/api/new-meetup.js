// it will get triggered when the route is /api/new-meetup

const { MongoClient } = require("mongodb");

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "meeting inserted successfully!" });
  }
}

export default handler;
