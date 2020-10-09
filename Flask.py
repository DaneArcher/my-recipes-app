from FNscraping import scraper
from flask import Flask, jsonify, request
 

app = Flask(__name__)
@app.route('/')
def home():
    return 'home page'
@app.route('/scrape_recipes', methods=['GET'])
def scrape_recipes():
    #extract url https://www.kite.com/python/answers/how-to-get-parameters-from-a-url-using-flask-in-python
    link = request.args.get("link")
    return jsonify(scraper(link))

@app.route('/add_recipes', methods=['POST'])
def add_recipes():
    recipe_data = request.get_json()
    print(recipe_data)
    #send to db
    return "response is good"
@app.route('/search', methods=['GET'])
def search():
    #list_of_recipes=[]
    ingredients = request.args.get("ingredients")
    title = request.args.get("title")
    #get list of recipes from db
    if ingredients == None:
        #send title.data and the str title to database
        print(title)
        return jsonify({'recipes': title})
    else: #title == None:
        ingredients = ingredients.split(',')
        #send ingredients.data and the string ingredients to db
        print(ingredients)
        return jsonify({'recipes': ingredients})    
    #return jsonify({'recipes': list_of_recipes})
@app.route('/test', methods=['GET'])
def test():
    #/test?temp=1000
    temp = request.args.get("temp")
    temp = temp.split(',')
    print(temp)
    print(type(temp))
    return 'temp'


if __name__ == "__main__":
    app.run(debug=True)