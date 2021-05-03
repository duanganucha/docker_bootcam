const express = require("express");
const bodyParser = require("body-parser");
var app = express();

const mongodb = require("mongodb").MongoClient;
const url = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:27017`;
console.log(url);
mongodb.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db("shoppers");
    if (err) throw err;
    console.log("Database connected!");
  }
);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "500MB" }));
app.use(function (req, res, next) {
  //website
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request method
  res.setHeader("Access-Control-Allow-Methods", "GET , POST, PUT , DELETE");
  //Request Header
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type"
  );
  next();
});

app.get("/api/products", (req, resp) => {
  db.collection("products")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      resp.status(200).send(result);
    });
});

app.get("/", (req, res) => {
  res.json({ message: "hello nodejs" });
});

app.post("/api/products", async (req, res) => {
  console.log({ body: req.body });
  db.collection("products")
    .insert(req.body)
    .then((result) => {
      res.status(200).send(result);
    });
});

app.put("/api/products", async (req, res) => {
  db.collection("products")
    .findOneAndUpdate({ unitPrice: "90" }, { $set: { productName: "ไก่ทอด" } })
    .then((result) => {
      res.status(200).send(result);
    });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
