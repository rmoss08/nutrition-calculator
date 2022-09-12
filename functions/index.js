const functions = require("firebase-functions");
const axios = require("axios");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.fetchNutrition = functions.https.onRequest((req, res) => {
  const ingredient = req.query.ingredient;
  const options = {
    method: "GET",
    url: "https://calorieninjas.p.rapidapi.com/v1/nutrition",
    params: {query: ingredient},
    headers: {
      "X-RapidAPI-Host": "calorieninjas.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    },
  };

  return axios
      .request(options)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
});
