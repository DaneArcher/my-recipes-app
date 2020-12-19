from bs4 import BeautifulSoup
import requests
import re

food_network_recipe_address = "https://www.foodnetwork.com/recipes/food-network-kitchen/prosciutto-wrapped-chicken-kebabs-3362756"
spagattie_and_meatballs = "https://www.foodnetwork.com/recipes/rachael-ray/spaghetti-and-meatballs-recipe-1942620"

def parser_text(tag, class_name, my_soup):
    resource_list = []
    resource = my_soup.find_all(tag, class_=class_name)
    #print(resource)
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

    ingredient_objects = my_soup.find_all(['span','h6'], attrs={"class" : re.compile('^o-Ingredients__a-')})
    #ingredient_objects = ingredient_objects[4:]
     # The following for loop is for identifying the text from the tags and checking
    for i in ingredient_objects:
        if i.get_text() != "":
            if str(i)[0:3] == "<h6":
                string = "Header " + i.get_text().strip()
                ingredient_list.append(string)
            else:
                ingredient_list.append(i.get_text().strip())


   
    ingredient_list = ingredient_list[2:-2]
    #ingredient_list = ingredient_list[:-2]
    print(ingredient_list)
    return ingredient_list

def get_directions(my_soup):
    list_Directions = parser_text("li","o-Method__m-Step", my_soup)
    directions = ''
    for val in list_Directions:
        directions += val
    return directions

def get_img_link(my_soup):
    img_link = my_soup.find("meta", {"property":"og:image"})['content']
    return img_link

def scraper(food_link):
    completed_recipe_info = {}

    result = requests.get(food_link)
    src = result.content #extracting the html code
    soup = BeautifulSoup(src, 'html.parser')    

    completed_recipe_info['title'] = get_title(soup)
    completed_recipe_info['info'] = get_info(soup)
    completed_recipe_info['ingredients'] = get_ingredents(soup)
    completed_recipe_info['directions'] = get_directions(soup)
    completed_recipe_info['img_link'] = get_img_link(soup)
    #print(completed_recipe_info)

    return completed_recipe_info

scraper(spagattie_and_meatballs)