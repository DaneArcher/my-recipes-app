from FNscraping import scraper
from flask import Flask, jsonify, request
from CreatePGDB import insert, search_by_ingredients, search_by_title, get_full_recipe, edit_recipe, delete_recipe
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return 'home page boi'
@app.route('/scrape_recipes', methods=['GET'])
def scrape_recipes():
    #extract url https://www.kite.com/python/answers/how-to-get-parameters-from-a-url-using-flask-in-python
    link = request.args.get("link")
    results = scraper(link)
    print(results)
    print(jsonify(results))
    return jsonify(scraper(link))

@app.route('/add_recipes', methods=['POST'])
def add_recipes():
    recipe_data = request.get_json()
    print(recipe_data)

    if(insert(recipe_data)):
        return "response is good"
    return "response failed"
 
@app.route('/search', methods=['GET'])
def search():
    #list_of_recipes=[]
    ingredients = request.args.get("ingredients")
    title = request.args.get("title")
    #get list of recipes from db
    if ingredients == None:
        #send title.data and the str title to database
        #return search_by_title(title)
        result = search_by_title(title)
        print(result)
        if result:
            return jsonify({'recipes': result})
        return None
    else: #title == None:
        ingredients = ingredients.split(',')
        #send ingredients.data and the string ingredients to db
        print(ingredients)
        result = search_by_ingredients(ingredients)
        print(result)
        if result:
            return jsonify({'recipes': result})
        return None    
    #return jsonify({'recipes': list_of_recipes})

@app.route('/full_recipe', methods=['GET'])
def full_recipe():
    recipe_id = request.args.get("recipe_id")
    result = get_full_recipe(int(recipe_id))
    print(result)
    if result:
        return jsonify({'recipe': result})
    return None

@app.route('/test', methods=['GET'])
def test():
    #/test?temp=1000
    temp = request.args.get("temp")
    temp = temp.split(',')
    print(temp)
    print(type(temp))
    return 'temp'

@app.route('/edit', methods=['POST'])
def edit():
    #/test?temp=1000
    recipe_data = request.get_json()
    print(recipe_data)

    if(edit_recipe(recipe_data)):
        return "response is good"
    return "response failed"

@app.route('/delete', methods=['POST'])
def delete():
    #/test?temp=1000
    recipe_id = request.get_json()
    print(recipe_id)

    if(delete_recipe(recipe_id)):
        return "response is good"
    return "response failed"

if __name__ == "__main__":
    app.run(debug=True)