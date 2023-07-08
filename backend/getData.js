const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();
require("dotenv").config();

//connect to mongodb database
const client = new MongoClient(process.env.DB_URL, {
  useUnifiedTopology: true,
});

router.get("/", async (req, res) => {
  try {
    //connect to database
    await client.connect();
    const db = client.db("miniProject");
    const collection = db.collection("student");

    const result = await collection.find().toArray();

    if (result) {
      res.json({ status: true, message: "success", data: result });
    } else {
      res.json({ status: false, msg: "Server error" });
    }
  } catch (error) {
    console.error(error);
    res.json({ status: false, msg: "Server error" });
  }
});

module.exports = router;
