require('dotenv').config()
const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const ejs = require("ejs");
 
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get('/', (req,res)=> {
  request(process.env.INDEX_API, (err, data) => {
    if (err) throw err;
    else {
      data = JSON.parse(data.body)
      res.render("index", {data: data});
      // res.send(data.location.name)
    }
  })
});

app.post("/searchCity", (req,res) => {
  let country = req.body.country;
  let city = req.body.city;
  request(process.env.SEARCH_CITY, (err, data) => {
    if (err) throw err;
    else {
      data = JSON.parse(data.body)
      res.render("index", {data: data});
      // res.send(data.location.name)
    }
  })
});

app.get("/search", (req,res) => {
  res.render("search")
});

app.get("/b", (req,res) => {
  res.render("beauty")
})

app.listen(3000, () => {
  console.log("works on...");
});
