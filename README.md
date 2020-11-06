# RecipeBook

## Index

  - Introduction to RecipeBook
  - How We Built the Project 
  - Project Dependencies
  - How to Run RecipeBook
  - What We Learned/Experiences
  - What's Next?

## Introduction
This web application is a React front end with a Flask backend and a PostgreSQL database hosted on AWS that extracts/stores recipes from online and enables users to search for recipes based on the ingredients in their pantries and by recipe names. 

We decided to build this application with React instead of HTML and JavaScript because we like the component-based style that React implements and its use of the virtual dom. Since React was new to us we chose to go with a Flask/Python backend because we were already familiar with Python's libraries and setting up a Flask server so we could spend more time learning about React, Postgres, and the other technologies needed to create this application.

## How We Built the Project

### Front End 
The front end of our application is built in React. We have 3 main components, one for adding the recipe to the db, one for searching the recipe from the db, and one for displaying the recipe after a search has been completed. We have two subcomponents for our Add Recipe component to assist with the dynamic portion of the form.

### Backend
The Backend is written using Flask. We have 3 GET functions, 1 for Ingredient/Recipe-Name searches, one for getting the full recipe from the database based on the recipe_id, and one used for passing a to-be-scraped link to our scraper. We have 1 POST function used for writing a recipe to the database.


### Database
The Database is in PostgreSQL. Our Schema currently consists of 3 tables, one for all recipe information excluding the ingredients, one table for the ingredients and their associated Recipe ID's, and a third table for the tagged ingredient names and their associated Recipe ID's. We chose to put the Ingredients and the Tagged ingredients in their own individual tables because we would then be able to index them better. The ingredient table is indexed based on a multi-column primary key, where the first column is the recipe_id and the second one is the ingredient name. This enables us to rapidly grab all the ingredients for a given recipe. The tagged ingredient table has an unordered index on the tagged ingredients so that Ingredient Based search can run very quickly. The recipe table is indexed on the primary key (recipe_id) and on the recipe name, to ensure rapid searches.

## How to Use the Project
  1. On the Home page you can either choose to search by recipe or by x amount of ingredients simply by clicking the title radio button or the ingredient radio button
  2. From there you will be taken to a page displaying the results of your search on cards displaying the Recipes' Title, Picture, Rating, and Total Cooking Time.
  3. Next just click on any one of the Recipe cards to display the whole recipe
---  
  4. To add a recipe simply click on the ADD button in the Nav bar at the top right-hand corner of the screen.
  5. You will be taken to a page where you can enter in a link to a recipe's location on the web* and hit scrape, which will then help to populate your recipe into the recipe form, or you can skip to add the recipe manually
  6. Next you will be taken to the recipe form where you will fill out the recipe details.
  7. **IMPORTANT!!!** Once you submit your recipe, you will be taken to a page where you enter in the ingredient tags. This is important as it will allow you to find this recipe by ingredient later on. For example, if you had the ingredient line '¼ cup of chopped apples' you would enter in 'apples' as an ingredient tag associated to that ingredient line
  8. Then you are ready to add your recipe to your Recipe Book!
 
## Dependencies
  - Back End (Python)
  --- Packages to install `Beautifulsoup (bs4)`, `requests`, `re (regex)`, `flask`, `psycopg2`
  - Front End (React)
  --- Make sure you have Node.js and NPM installed
  --- In your react app do `npm install react-router-dom`, ` npm install semantic-ui-react`, `npm install semantic-ui-css`  
  - Database (Postgres)
  ---Install Postgres to your device and set up a user profile and password
  ---Open up CreatePGDB.py and change all instances of username and password to the ones that you created 

## How to Run
  - First in the folder you are going to run the app from enter in  `npx create-react-app name_of_your_app`
  - Second delete the src file and replace it with ours
  - Third download the react dependencies
  - To set up the database, open up CreatePGDB.py and uncomment the `main()` method underneath `if __name__ == "__main__:"` 
  --- Run the script only once using `Python 3` 
  - After running the script, comment out the main method again
  - Your Database is now ready!

## What We Learned/Experiences
  - humnahumna

## What's Next?

##### AWS
Our next step is to push our project to AWS to make it accessible to anyone. We chose to use AWS because it offered us the flexibility to use  a PostgreSQL DB and a Flask backend. The link will be made available publicly once we have hosted the app on AWS.

##### Checks
Another step we need to take is to conduct checks on our application. Currently we are assuming ideal users for our app but we are beginning the process of checking for bugs that can occur due to non-ideal use. One area we will be focusing on is the form input section for the 'Add' functionality of the application. We will be checking for correct input values, enabling required fields, and halting users from proceeding forward in the application without accurately filling out all required fields.

Our `fetch()` method is another area we'll be checking , ensuring that we don't have time out errors when connecting to Flask and/or the Database, and that we catch all errors from Flask/Database before it reaches the React app.

##### Future Features
We will be working on implementing several features in the near future to help enhance both the functionality and user experience for the app. 

**Authentication** is one of the first features that will be implemented, allowing for individual users to make accounts with the application and have custom recipe books of their own. We will be using AWS's authentication functionality as well as Redux to help maintain a global state for each user. Another feature that will be added shortly is the **Update and Delete** functionalities. This will allow for a user to edit a recipe and/or delete a recipe from their personal recipe books. 

A feature that we wanted to include with our application was the **auto-tagging of ingredients**. For that, we wanted to use the New York Times Ingredient Parser/Tagger available on Github to tag the ingredients the users input and then save those tags to our database to be used as part of Ingredient Based Search, automating the process. At the moment, we are unable to do that because the NYT tagger runs on `Python2` while the rest of our Application is written in `Python3`. Also, AWS environments can only run on one version of Python natively, making it hard to run online as well. We are working on finding a solution for this, one of which may be to run a Docker container on AWS to execute both our `Python2` and `Python3` scripts.

We also hope to implement our own **styling sheet** using CSS to help make our UI look cleaner.

