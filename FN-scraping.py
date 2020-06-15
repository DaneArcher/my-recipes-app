from bs4 import BeautifulSoup
import requests

food_network_recipe_address = "https://www.foodnetwork.com/recipes/food-network-kitchen/prosciutto-wrapped-chicken-kebabs-3362756"
spagattie_and_meatballs = "https://www.foodnetwork.com/recipes/rachael-ray/spaghetti-and-meatballs-recipe-1942620"

result = requests.get(food_network_recipe_address)
src = result.content #extracting the html code

soup = BeautifulSoup(src, 'html.parser')

#temp = soup.find_all("p", class_="o-Ingredients__a-Ingredient")

def parser(tag, class_name, my_soup):
    resource_list = []
    resource = my_soup.find_all(tag, class_=class_name)
    for i in resource:
        resource_list.append(i.get_text())
    return resource_list

#o-Ingredients__a-SubHeadline
sub_section = []
list_Ingredients = []
sub_section = parser("h6","o-Ingredients__a-SubHeadline", soup)

if(len(sub_section) != 0):
    for section in sub_section:
        text = section.get_text()
        list_Ingredients.append(text + " (sub)")
        temp = parser("p","o-Ingredients__a-Ingredient",section)       

list_Ingredients = parser("h6","o-Ingredients__a-SubHeadline", soup)
print("INGREDIENTS")

    print("nope")
print(list_Ingredients)
# for i in list_Ingredients:
#     print(i)
print("")
print("DIRECTIONS")
list_Directions = parser("li","o-Method__m-Step", soup)
#print(list_Directions)
for i in list_Directions:
    print(i)



    