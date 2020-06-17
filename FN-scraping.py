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

def main(my_soup):
    sub_section = []
    list_Ingredients  = []
    list_Directions = []
    h6_ingredients = []

    
    ingredients = parser_html("div", "o-Ingredients__m-Body", my_soup)
    print(ingredients[0])
    """
    overAll_Ingredients = parser_text("p", "o-Ingredients__a-Ingredient", ingredients[0]) #list of one soup
    #ingredient_list = parser("p", "o-Ingredients__a-Ingredient", my_soup)
    sub_section = parser_html("h6","o-Ingredients__a-SubHeadline", my_soup)
    print((sub_section[0]))
    #print(sub_section)
    print("=========================================================================")
    """
    
    # if (len(sub_section) != 0):    
    #     for element in sub_section:
    #         tempList = parser_text("p", "o-Ingredients__a-Ingredient", element) #list of one soup
    #         for i in tempList:
    #             print(i)
    #             h6_ingredients.append(i)
    #     print(h6_ingredients)
    
    tempList = parser_text("p", "o-Ingredients__a-Ingredient", sub_section[0]) #list of one soup
    print(tempList)


    #print("----------------")
    #print(ingredient_list)
    #print('=================')
    #print(sub_section)

    #sub_section = parser("h6","o-Ingredients__a-SubHeadline", my_soup)
"""
    if(len(sub_section) != 0):
        #do more stuff
        pass
    
    else:
        list_Ingredients = parser("p", "o-Ingredients__a-Ingredient", my_soup)

    print("INGREDIENTS")
    for ingredients in list_Ingredients:
        print(ingredients)
    print("")

    print("DIRECTIONS")
    list_Directions = parser("li","o-Method__m-Step", soup)
    for i in list_Directions:
        print(i)
    """

#main(pasta)  

def get_title(my_soup):
    title = parser_text("span", "o-AssetTitle__a-HeadlineText", my_soup)
    return title[0] #i actually get two spaghetti and meat balls titles

print(get_title(pasta))

def get_info(my_soup):
    recipe_info = parser_html("div", "o-RecipeInfo", my_soup) #getting all the diffrent info in src 
    #now i will split it up 
    info_name = parser_text("span", "o-RecipeInfo__a-Headline", recipe_info[0])
    print(info_name)
    info = parser_text("span", "o-RecipeInfo__a-Description", recipe_info[0])
    print(info)
    #need to add check to see what info we actually got not all food network recipies have a complete info section
    #and some info have a different class name.... wierd that they don't conform

get_info(pasta)