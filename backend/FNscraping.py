from bs4 import BeautifulSoup
import requests
import re
import tldextract

food_network_recipe_address = "https://www.foodnetwork.com/recipes/food-network-kitchen/prosciutto-wrapped-chicken-kebabs-3362756"
spagattie_and_meatballs = "https://www.foodnetwork.com/recipes/rachael-ray/spaghetti-and-meatballs-recipe-1942620"
salad = "https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-caesar-salad-8037173"

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
    print(info_name)
    print(info)
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
def get_total_time(my_soup):
    total_time = parser_text("span","o-RecipeInfo__a-Description m-RecipeInfo__a-Description--Total", my_soup)
    return total_time[0] #there are two of them, just returns one
def get_chef_notes(my_soup):
    chef_notes = parser_text("p", "o-ChefNotes__a-Description", my_soup)
    print(type(chef_notes))
    if chef_notes:
        return chef_notes[0]
def get_quick_description(my_soup):
    quick_desc_html = parser_html("div", "o-AssetDescription__a-Description", my_soup)
    print(quick_desc_html)
    if quick_desc_html:
        quick_description = parser_text("span", "originalText", quick_desc_html[0])

        if quick_description:
            print(quick_description)
            return quick_description[0]
    

def get_author(my_soup):
    author_html = parser_html("span", "o-Attribution__a-Name", my_soup)

    author = author_html[0].find('a').get_text()
    print("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
    print(author)
    return author


def scraper(food_link):
    completed_recipe_info = {}

    result = requests.get(food_link)
    src = result.content #extracting the html code
    soup = BeautifulSoup(src, 'html.parser')    

    if get_title(soup):
        completed_recipe_info['title'] = get_title(soup)
    if get_info(soup):
        completed_recipe_info['info'] = get_info(soup)
    if get_ingredents(soup):
        completed_recipe_info['ingredients'] = get_ingredents(soup)
    if get_directions(soup):
        completed_recipe_info['directions'] = get_directions(soup)
    if get_img_link(soup):
        completed_recipe_info['img_link'] = get_img_link(soup)
    if get_total_time(soup):
        completed_recipe_info['total_time'] = get_total_time(soup)
    count = 0
    print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    #print(completed_recipe_info['info'][0])
    for i in completed_recipe_info['info'][0]:
        if i == "Prep:":
            completed_recipe_info['prep_time'] = completed_recipe_info['info'][1][count]
        elif i == "Cook:":
            completed_recipe_info['cook_time'] = completed_recipe_info['info'][1][count]
        elif i == "Yield:":
            completed_recipe_info['servings'] = completed_recipe_info['info'][1][count]
        elif i == "Level:":
            completed_recipe_info['level'] = completed_recipe_info['info'][1][count]
        elif i == "Inactive:":
            completed_recipe_info['inactive_time'] = completed_recipe_info['info'][1][count]

        count += 1
    # completed_recipe_info['prep_time'] = completed_recipe_info['info'][1][2]
    # completed_recipe_info['cook_time'] = completed_recipe_info['info'][1][3]
    # completed_recipe_info['servings'] = completed_recipe_info['info'][1][4]
    if get_chef_notes(soup):
        completed_recipe_info['chef_notes'] = get_chef_notes(soup)
    if get_quick_description(soup):
        completed_recipe_info['quick_description'] = get_quick_description(soup)
    if get_author(soup):
        completed_recipe_info['author'] = get_author(soup)
    ext = tldextract.extract(food_link)
    print(ext[1])
    domain = ""
    if ext[1] == "foodnetwork":
        domain =  "Food Network"
    if domain: 
        completed_recipe_info['src'] = domain

    #print(completed_recipe_info)

    return completed_recipe_info

scraper(spagattie_and_meatballs)
scraper(salad)