from FNscraping import scraper
from flask import Flask, jsonify, request



app = Flask(__name__)
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
    list_of_recipes=[]
    return jsonify({'recipes': list_of_recipes})

if __name__ == "__main__":
    app.run(debug=True)