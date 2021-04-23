var express = require("express");
const MongoClient = require("mongodb").MongoClient;
const url = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:27017`;
console.log(url);

var app = express();
app.get("/", (req, resp) => {
	MongoClient.connect(
		url,
		(err, client) => {
			if (err) throw err;
			console.log("Database connected!");

			const db = client.db("shoppers");
			db.collection("products")
				.find()
				.toArray((err, result) => {
					if (err) throw err;
					resp.send(result);
				});
		}
	);
});

app.listen(3000, () => {
	console.log("Server listening on port 3000");
});
