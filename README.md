# Nutrition Calculator

Nutrition Calculator is a web app that allows users to input their meal's ingredients, return the nutrition facts per serving size, and compare the meal's nutrition to the daily values recommended by the Government of Canada. 

You can view the production version [here](https://nutrition-calculator-6db9d.web.app/).


## Setup

If you want to locally host Nutrition Calculator, some setup is required. Nutrition Calculator uses Firebase Functions for API calls, so you will need to change some code to circumvent Firebase. Follow these steps:

1. Open **src/IngredientForm.js**.
2. In the **fetchNutrition** function, replace the **options** variable with the following code:
```
    const options = {
      method: "GET",
      url: "https://edamam-food-and-grocery-database.p.rapidapi.com/parser",
      params: {ingr: ingredientName},
      headers: {
        "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
        "X-RapidAPI-Key": '<ENTER YOUR PERSONAL API KEY>',
      },
    };
```
3. Go to [Edamam's Rapid API page](https://rapidapi.com/edamam/api/edamam-food-and-grocery-database) to generate your personal API key. This API is free.
4. Now, go back to the **options** variable in the **fetchNutrition** function. Next to **X-RapidAPI-Key** property, enter your personal API key in quotation marks.
5. Everything is now setup for you to locally host Nutrition Calculator. In the terminal, enter **npm run start** to run the web app. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.