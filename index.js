const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const uri =
  "mongodb+srv://mongouser:e$P_pP9HJh-4MkE@cluster0.xghfm.mongodb.net/mongo-practice?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("Hello Mongo DB");
});
app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/index.html"); // we can send a file to ui
})

app.listen(2020, () => {
  console.log("Listening on port 2020");
});

client.connect((err) => {
  const collection = client.db("mongo-practice").collection("practice");
  app.post("/addProduct" , (req, res) => {
    //added a product from /addProduct link through a form. and we read that data form body through req.body
    const product = req.body;
    // console.log(product);
    collection.insertOne(product)
    .then(result => console.log("Added product")) 
    res.send('Product Added successfully') // if we successfully insert a data , user will see this message in ui
  })

  // showing documents from mongo collection to /product page
  app.get("/product", (req, res) => {
    collection.find({})
    // we used empty arry for showing all of the data
    //if we want limited data we can use .limit(3)
    .toArray((err , documents) => {
      //.toArray means we are converting data into an array
      res.send(documents) // and then we send those data to the server ui
    })
  })

  // console.log("Database connected");
  // collection
  //   .insertOne({ name: "Oneplus 7", price: 440, quantity: 3 })
  //   .then((result) => console.log("One Product Added"));
});
