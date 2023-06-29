const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();
require("dotenv").config();

//connect to mongodb database
const client = new MongoClient(process.env.DB_URL, {
  useUnifiedTopology: true,
});

router.post("/", async (req, res) => {
  console.log("hello");
  const {
    uid,
    fullname,
    labno,
    pcno,
    personalLaptop,
    subject,
    semester,
    section,
    ip,
  } = req.body;
  try {
    //connect to database
    await client.connect();
    const db = client.db("miniProject");
    const collection = db.collection("student");

    const result = await collection.insertOne({
      uid,
      fullname,
      labno,
      pcno,
      personalLaptop,
      subject,
      semester,
      section,
      ip,
      createdAt: new Date(),
    });

    if (result.insertedCount === 1) {
      res.json({ status: true, message: "success" });
    } else {
      res.json({ status: false, msg: "Server error" });
    }
  } catch (error) {
    console.error(error);
    res.json({ status: false, msg: "Server error" });
  }
});

module.exports = router;
