const functions = require("firebase-functions");
const express = require("express");
var bodyParser = require("body-parser");
const BooksRoutes = require("./routes/books");
const UserRoutes = require("./routes/user");

const cors = require("cors");
const app = express();


app.use(bodyParser.json());
app.use(cors());


app.use("/api/books", BooksRoutes);
app.use("/api/user", UserRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("startedd server"));



exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
