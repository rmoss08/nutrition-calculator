const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

exports.fetchAPINutrition = functions.https.onRequest((req, res) => {
  const axios = require("axios");

  const ingredient = req.query.ingredient;

  const options = {
    method: "GET",
    url: "https://edamam-food-and-grocery-database.p.rapidapi.com/parser",
    params: {ingr: ingredient},
    headers: {
      "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.EDAMAM_API_KEY,
    },
  };

  res.set("Access-Control-Allow-Origin", "*");

  return axios
      .request(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error");
      });
});
