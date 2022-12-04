const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, DocumentSnapshot } = require("firebase-admin/firestore");

var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

var express = require("express");
var app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.get("/loginnew", function (req, res) {
  res.render("loginpage.ejs", { title: "Login System" });
});
app.get("/signupnew", function (req, res) {
  res.sendFile(__dirname + "/websitesignup.html");
});
console.log(__dirname);

app.get("/signupSubmit", (req, res) => {
  const Name = req.query.fname1;
  const Email = req.query.email1;
  const password = req.query.pass;
  db.collection("Customers")
    .add({
      Name: Name,
      Email: Email,
      password: password,
    })
    .then(() => {
      res.send("signup successfull");
    });
});

app.get("/loginSubmit", (req, res) => {
  const username = req.query.username;

  const password = req.query.password;

  db.collection("Customers")
    .where("Name", "==", username)
    .where("password", "==", password)
    .get()
    .then((docs) => {
      if (docs.size > 0) {
        res.render(path.join(__dirname, "public", "/App.js"));
      } else {
        res.send("Login Failed");
      }
    });
});

app.listen(3000);
