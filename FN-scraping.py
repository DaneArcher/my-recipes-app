from bs4 import BeautifulSoup
import requests

food_network_recipe_address = "https://www.foodnetwork.com/recipes/food-network-kitchen/prosciutto-wrapped-chicken-kebabs-3362756"
spagattie_and_meatballs = "https://www.foodnetwork.com/recipes/rachael-ray/spaghetti-and-meatballs-recipe-1942620"

result = requests.get(food_network_recipe_address)
src = result.content #extracting the html code
soup = BeautifulSoup(src, 'html.parser')

result = requests.get(spagattie_and_meatballs)
src = result.content #extracting the html code
pasta = BeautifulSoup(src, 'html.parser')
#"o-Ingredients__m-Body"
#temp = soup.find_all("p", class_="o-Ingredients__a-Ingredient")

def parser_text(tag, class_name, my_soup):
    resource_list = []
    resource = my_soup.find_all(tag, class_=class_name)
    for i in resource:
        resource_list.append(i.get_text())
    return resource_list

def parser_html(tag, class_name, my_soup):
    resource_list = []
    resource_list = my_soup.find_all(tag, class_=class_name)
    return resource_list

def get_title(my_soup):
    title = parser_text("span", "o-AssetTitle__a-HeadlineText", my_soup)

    return title[0] #i actually get two spaghetti and meat balls titles

def get_info(my_soup):
    recipe_info = parser_html("div", "o-RecipeInfo", my_soup) #getting all the diffrent info in src 
    #now i will split it up 
    info_name = parser_text("span", "o-RecipeInfo__a-Headline", recipe_info[0])
    print(info_name)
    info = parser_text("span", "o-RecipeInfo__a-Description", recipe_info[0])
    print(info)
    #need to add check to see what info we actually got not all food network recipies have a complete info section
    #and some info have a different class name.... wierd that they don't conform
    # https://www.foodnetwork.com/recipes/food-network-kitchen/grilled-cheese-sandwiches-recipe-2117893

def get_ingredents(my_soup):
    ingredient_list = []
    isHTag = []
    #ingredients = parser_html("div", "o-Ingredients__m-Body", my_soup)
    ingredients = my_soup.find_all("div", class_="o-Ingredients__m-Body")
    print(len(ingredients[0]))
    # The following for loop is for identifying the text from the tags and checking
    # NavigableString is of size 1. Trying to only look at information from the Tag Object, NavigableString
    for i in ingredients[0]:
        if (str(type(i)) == "<class 'bs4.element.NavigableString'>"): 
            continue
        else:
            # print(type(i))
            # print(len(str(i)))
            # print("---------------------------------------")
            ingredient_list.append(str(i.string))
            string = str(i)
            if(string[0:3] == "<h6"):
                isHTag.append(1)
            else:
                isHTag.append(0)
    count = 0
    for element in ingredient_list:
        print(element), print(" "), print(isHTag[count])
        count = count + 1



def get_directions(my_soup):
    list_Directions = parser_text("li","o-Method__m-Step", my_soup)
    for i in list_Directions:
        print(i)


def main(my_soup):
    print("TITLE")
    print(get_title(my_soup))
    print()

    print("INFO")
    get_info(my_soup)
    print()

    print("INGREDENTS")
    get_ingredents(my_soup)
    print()

    print("DIRECTIONS")
    get_directions(my_soup)


main(pasta)     