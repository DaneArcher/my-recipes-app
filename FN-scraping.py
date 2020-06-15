from bs4 import BeautifulSoup
import requests

food_network_recipe_address = "https://www.foodnetwork.com/recipes/food-network-kitchen/prosciutto-wrapped-chicken-kebabs-3362756"

result = requests.get(food_network_recipe_address)
src = result.content #extracting the html code

"""
Now that we have the page source stored, we will use the
BeautifulSoup module to parse and process the source.
To do so, we create a BeautifulSoup object based on the 
source variable we created above:
"""
soup = BeautifulSoup(src, 'html.parser')



