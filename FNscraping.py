from bs4 import BeautifulSoup
import requests

food_network_recipe_address = "https://www.foodnetwork.com/recipes/food-network-kitchen/prosciutto-wrapped-chicken-kebabs-3362756"
spagattie_and_meatballs = "https://www.foodnetwork.com/recipes/rachael-ray/spaghetti-and-meatballs-recipe-1942620"

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
    return title[0] #i actually two titles

def get_info(my_soup):
    recipe_info = parser_html("div", "o-RecipeInfo", my_soup) #getting all the diffrent info in src 
    
    #now i will split it up 
    info_name = parser_text("span", "o-RecipeInfo__a-Headline", recipe_info[0])
    info = parser_text("span", "o-RecipeInfo__a-Description", recipe_info[0])
    return [info_name, info]
    #need to add check to see what info we actually got not all food network recipies have a complete info section
    #and some info have a different class name.... wierd that they don't conform
    # https://www.foodnetwork.com/recipes/food-network-kitchen/grilled-cheese-sandwiches-recipe-2117893

def get_ingredents(my_soup):
    ingredient_list = []
    isHTag = []
    #ingredients = parser_html("div", "o-Ingredients__m-Body", my_soup)
    ingredients = my_soup.find_all("div", class_="o-Ingredients__m-Body")
    # The following for loop is for identifying the text from the tags and checking
    # NavigableString is of size 1. Trying to only look at information from the Tag Object, NavigableString
    for i in ingredients[0]:
        if (str(type(i)) == "<class 'bs4.element.NavigableString'>"): 
            continue
        else:
            ingredient_list.append(str(i.string))
            string = str(i)
            if(string[0:3] == "<h6"): #identifying titles and ingredents 1's titiles 0 ingredents
                isHTag.append(1)
            else:
                isHTag.append(0)
    return [ingredient_list, isHTag]

def get_directions(my_soup):
    list_Directions = parser_text("li","o-Method__m-Step", my_soup)
    directions = ''
    for val in list_Directions:
        directions += val
    return directions

def scraper(food_link):
    completed_recipe_info = {}

    result = requests.get(food_link)
    src = result.content #extracting the html code
    soup = BeautifulSoup(src, 'html.parser')    

    completed_recipe_info['title'] = get_title(soup)
    completed_recipe_info['info'] = get_info(soup)
    completed_recipe_info['ingredients'] = get_ingredents(soup)
    completed_recipe_info['directions'] = get_directions(soup)
    #print(completed_recipe_info)

    return completed_recipe_info

scraper(food_network_recipe_address)     