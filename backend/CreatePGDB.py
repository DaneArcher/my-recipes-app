import psycopg2
import constants
from psycopg2 import Error
from psycopg2 import sql

def setup():
    connection = "      "
    try:
        connection = psycopg2.connect(user = constants.DB_USER,
                                    password = constants.DB_PSWD,
                                    host = constants.DB_HOST,
                                    port = constants.DB_PORT,
                                    database = constants.DB_NAME)

        cursor = connection.cursor()
        
        create_table_query = '''CREATE TABLE recipe_table
            (RECIPE_ID SERIAL PRIMARY KEY     NOT NULL,
            TITLE           TEXT    NOT NULL,
            DIRECTIONS      TEXT    NOT NULL,
            IMG_LINK        TEXT    NOT NULL,
            PREP_TIME       TEXT    NOT NULL,
            TOTAL_TIME      TEXT    NOT NULL,
            COOK_TIME       TEXT    NOT NULL,
            CALORIES        INT     NOT NULL,
            RATING          FLOAT   NOT NULL,
            SERVINGS        TEXT     NOT NULL,
            AUTHOR          TEXT    NOT NULL,
            SOURCE          TEXT    NOT NULL,
            QUICK_DESCRIPTION TEXT  NOT NULL,
            CHEF_NOTES      TEXT    NOT NULL,
            SOURCE_URL      TEXT    NOT NULL); '''
        
        cursor.execute(create_table_query)
        connection.commit()
        print("Recipe Table created successfully in PostgreSQL ")

    except (Exception, psycopg2.DatabaseError) as error :
        print ("Error while creating recipe_table", error)

    
    try:
        cursor = connection.cursor()


        create_table_query = '''CREATE TABLE ingredient_table
        (
            RECIPE_ID      INT     NOT NULL,
            INGREDIENT     TEXT    NOT NULL,
            PRIMARY KEY (RECIPE_ID,INGREDIENT)
        ); '''
        cursor.execute(create_table_query)
        connection.commit()
        print("Ingredient Table created succesffully in PostegreSQL")


    except (Exception, psycopg2.DatabaseError) as error :
        print ("Error while creating ingredient_table", error)



    try:
        cursor = connection.cursor()

        create_table_query = '''CREATE TABLE ingredient_search_table
        (
            RECIPE_ID INT NOT NULL,
            INGREDIENT TEXT NOT NULL
        ); '''
        cursor.execute(create_table_query)
        connection.commit()
        print("Ingredient Search Table created succesffully in PostegreSQL")


    except (Exception, psycopg2.DatabaseError) as error :
        print ("Error while creating ingredient_search_table", error)

    try:
        cursor = connection.cursor()

        create_index_query = '''CREATE INDEX recipe_title_index ON recipe_table (TITLE);'''
        cursor.execute(create_index_query)
        connection.commit()
        print("Recipe Title Index created succesfully in PostegreSQL")


    except (Exception, psycopg2.DatabaseError) as error :
        print ("Error while creating Recipe Title Index", error)

    try:
        cursor = connection.cursor()

        create_index_query = '''CREATE INDEX parsed_ingredient_index ON ingredient_search_table (INGREDIENT);'''
        cursor.execute(create_index_query)
        connection.commit()
        print("Parsed Ingredient Index created succesfully in PostegreSQL")


    except (Exception, psycopg2.DatabaseError) as error :
        print ("Error while creating Parsed Ingredient Index ", error)


    finally:
        #closing database connection.
            if(connection):
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")


def insert(recipe: dict) -> bool:
    ingredient_tag_list = recipe['ingredient_tags']
    ingredient_list = recipe['ingredients']
    connection = 0
    recipe_id = 0
    try:
        connection = psycopg2.connect(user = constants.DB_USER,
                                        password = constants.DB_PSWD,
                                        host = constants.DB_HOST,
                                        port = constants.DB_PORT,
                                        database = constants.DB_NAME)
        cursor = connection.cursor()

        postgres_insert_query = """ INSERT INTO recipe_table 
                                    (TITLE, DIRECTIONS, IMG_LINK, PREP_TIME, TOTAL_TIME, COOK_TIME, CALORIES, 
                                    RATING, SERVINGS, AUTHOR, SOURCE, QUICK_DESCRIPTION, CHEF_NOTES, SOURCE_URL) 
                                    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING RECIPE_ID;"""
        record_to_insert = (recipe['title'], recipe['directions'], recipe['img_link'], recipe['prep_time'], recipe['total_time'], recipe['cook_time'], int(recipe['calories']), float(recipe['rating']), recipe['servings'], recipe['author'], recipe['src'], recipe['quick_description'],recipe['chef_notes'], recipe['url'])
        cursor.execute(postgres_insert_query, record_to_insert)
        recipe_id = cursor.fetchone()[0]
        print("@#^(@#(")
        print(recipe_id)
        connection.commit()
        print (recipe_id, "Record inserted successfully into recipe table")

    except (Exception, psycopg2.Error) as error :
        if(connection):
            print("Failed to insert record into mobile table", error)
            return False

    
    try:    
        for ingredient in ingredient_list:
            try:
                cursor = connection.cursor()  
                postgres_insert_query = '''INSERT INTO ingredient_table (INGREDIENT, RECIPE_ID) VALUES (%s,%s);'''
                record_to_insert = (ingredient,recipe_id)
                cursor.execute(postgres_insert_query,record_to_insert)
                connection.commit()
                string = ingredient + " was successfully inserted into ingredient table"
                print(string)
            except (Exception, psycopg2.Error) as error :
                if(connection):
                    print("Failed to insert record into ingredient_table", error)
        for ingredient in ingredient_tag_list:
            if ingredient != "":
                try:
                    cursor = connection.cursor()  
                    postgres_insert_query = '''INSERT INTO ingredient_search_table (INGREDIENT, RECIPE_ID) VALUES (%s,%s);'''
                    record_to_insert = (ingredient,recipe_id)
                    cursor.execute(postgres_insert_query,record_to_insert)
                    connection.commit()
                    string = ingredient + " was successfully inserted into ingredient table"
                    print(string)
                except (Exception, psycopg2.Error) as error :
                    if(connection):
                        print("Failed to insert record into ingredient_table", error)
    except (Exception, psycopg2.Error) as error :
        if(connection):
            print("fuuuuck", error)
            return False

    finally:
        #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
    return True


def search_by_title(recipe_name: str):
    connection = ""
    json_list = []
    print("Line 181")
    try:
        connection = psycopg2.connect(user = constants.DB_USER,
                                        password = constants.DB_PSWD,
                                        host = constants.DB_HOST,
                                        port = constants.DB_PORT,
                                        database = constants.DB_NAME)
        cursor = connection.cursor()

        postgres_search_query = "SELECT RECIPE_ID FROM recipe_table WHERE LOWER(TITLE) LIKE LOWER(%s);"
        like_pattern = '%{}%'.format(recipe_name)
        cursor.execute(postgres_search_query,(like_pattern,))
        recipe_id_list = cursor.fetchall()
        print("Line 194")

        for recipe_id in recipe_id_list:
            postgres_search_query = "SELECT TITLE, TOTAL_TIME, IMG_LINK, RATING FROM recipe_table WHERE RECIPE_ID=%s;"
            cursor.execute(postgres_search_query,(recipe_id,))
            ret = cursor.fetchall()
            print(ret)
            json_map = {}
            json_map['title'] = ret[0][0]
            json_map['total_time'] = ret[0][1]
            json_map['img_link'] = ret[0][2]
            json_map['rating'] = ret[0][3]
            json_map['recipe_id'] = recipe_id
            json_list.append(json_map)
            print("Line 207")
        return json_list

    except (Exception, psycopg2.Error) as error :
        if(connection):
            print("fuuuuck kfkkkfkf", error)

    finally:
        #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")

def search_by_ingredients(list_of_ingredients: list):
    connection = ""
    json_list = []
    try:
        connection = psycopg2.connect(user = constants.DB_USER,
                                        password = constants.DB_PSWD,
                                        host = constants.DB_HOST,
                                        port = constants.DB_PORT,
                                        database = constants.DB_NAME)
        cursor = connection.cursor()
        length = len(list_of_ingredients)

        postgres_search_query = (length-1) * "SELECT RECIPE_ID FROM ingredient_search_table WHERE LOWER(INGREDIENT)=LOWER(%s) INTERSECT " #PYTHON BITCH!!!!
        postgres_search_query += "SELECT RECIPE_ID FROM ingredient_search_table WHERE LOWER(INGREDIENT)=LOWER(%s);"

        cursor.execute(postgres_search_query, tuple(list_of_ingredients))
        recipe_id_list = cursor.fetchall()
        print("fvgvlwiugear;ugawer;oghwr;OGHWER;OGHWQER;OGHWROIGHWRQOGHWQROGHWERQ'OIGWREA")
        print(recipe_id_list)

        for recipe_id in recipe_id_list:
            postgres_search_query = "SELECT TITLE, TOTAL_TIME, IMG_LINK, RATING FROM recipe_table WHERE RECIPE_ID=%s;"
            cursor.execute(postgres_search_query,(recipe_id,))
            ret = cursor.fetchall()
            print(ret)
            json_map = {}
            json_map['title'] = ret[0][0]
            json_map['total_time'] = ret[0][1]
            json_map['img_link'] = ret[0][2]
            json_map['rating'] = ret[0][3]
            json_map['recipe_id'] = recipe_id[0]
            print("OGHEAROUHGAERW;GERA;OGHAEROIGHAER;OGHAEROGAHEROGIEARHG'OIAERHG")
            print(recipe_id)
            print(type(recipe_id))
            json_list.append(json_map)
        return json_list

    except (Exception, psycopg2.Error) as error :
        if(connection):
            print("fuuuuck kfkkkfkf", error)

    finally:
        #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
        #Tomato,Potato, Carrot, Water, Milk

def get_full_recipe(recipe_id: int):
    connection = ""
    ingredients = ""
    recipe = ""
    try:
        connection = psycopg2.connect(user = constants.DB_USER,
                                        password = constants.DB_PSWD,
                                        host = constants.DB_HOST,
                                        port = constants.DB_PORT,
                                        database = constants.DB_NAME)
        cursor = connection.cursor()

        postgres_search_query = "SELECT INGREDIENT FROM ingredient_table WHERE RECIPE_ID=%s;"
        cursor.execute(postgres_search_query, (recipe_id,))

        ingredients = cursor.fetchall()


        print("Succefully retrieved all Ingredients. Printing them now \n\n")
        print(ingredients)
        print("\n\n")

    except (Exception, psycopg2.Error) as error :
        if(connection):
            print("fuuuuck kfkkkfkf", error)
    
    try:
        connection = psycopg2.connect(user = constants.DB_USER,
                                        password = constants.DB_PSWD,
                                        host = constants.DB_HOST,
                                        port = constants.DB_PORT,
                                        database = constants.DB_NAME)
        cursor = connection.cursor()

        postgres_search_query = "SELECT * FROM recipe_table WHERE RECIPE_ID=%s;"
        cursor.execute(postgres_search_query, (recipe_id,))

        recipe = cursor.fetchall()


        print("Succefully retrieved the recipe's details. Printing them now \n\n")
        print(recipe)
        print("\n\n")

    except (Exception, psycopg2.Error) as error :
        if(connection):
            print("fuuuuck kfkkkfkf", error)


    finally:
        #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
    
    recipe_map = {}
    print(recipe[0][1])
    print("gahioawrhowRHG'OIWARHG'OIWERAHG'EAWROHGwroihgwrghrpwgvhirghRIWGH'AWERIGHWRAGwrighaegbaegjb'seriojgaewrghnveargvbha;e/roigvhaerwolighneoa;rihbg")
    print(ingredients[1][0])

    recipe_map['title'] = recipe[0][1]
    recipe_map['directions'] = recipe[0][2]
    recipe_map['img_link'] = recipe[0][3]
    recipe_map['prep_time'] = recipe[0][4]
    recipe_map['total_time'] = recipe[0][5]
    recipe_map['cook_time'] = recipe[0][6]
    recipe_map['calories'] = recipe[0][7]
    recipe_map['rating'] = recipe[0][8]
    recipe_map['servings'] = recipe[0][9]
    recipe_map['author'] = recipe[0][10]
    recipe_map['src'] = recipe[0][11]
    recipe_map['quick_description'] = recipe[0][12]
    recipe_map['chef_notes'] = recipe[0][13]
    recipe_map['url'] = recipe[0][14]
    recipe_map['recipe_id'] = recipe_id
    recipe_map['ingredients'] = ingredients #SENDING IN A LIST OF TUPLES

    print(recipe_map)
    return recipe_map





def drop():
    try:
        connection = psycopg2.connect(user = constants.DB_USER,
                                        password = constants.DB_PSWD,
                                        host = constants.DB_HOST,
                                        port = constants.DB_PORT,
                                        database = constants.DB_NAME)
        cursor = connection.cursor()

        cursor.execute("DROP SCHEMA public CASCADE;")
        connection.commit()

        cursor.execute("CREATE SCHEMA public;")
        connection.commit()

        cursor.execute("GRANT ALL ON SCHEMA public TO postgres;")
        connection.commit()

        cursor.execute("GRANT ALL ON SCHEMA public TO public;")
        connection.commit()
    except (Exception, psycopg2.DatabaseError) as error :
        print ("Ya done fucked up", error)
    print("MADE IT OUT OF DROP")


def main():
    #Only call this if you need to set up a db for the very first time
    drop()
    setup()
    recipe = {
            "title": "Sun-Dried Romatoes",
            "author": 'Cuoredicioccolato',
            "src": 'YouTube',
            "quick_description": 'Tasty home made Italian sun dried tomatoes!',
            "total_time": '7 Days',
            "prep_time": '30 minutes',
            "cook_time": '7 Days',
            "rating": 4.8,
            "servings": 25,
            "calories": 100,
            "ingredients": ['25 Roma Tomatoes','1 Quarte Olive Oil','1 Clove of Garlic','2 tablespoons of Spices'],
            "ingredient_tags": ['Roma Tomatoes','Olive Oil', 'Garlic','Spices'],
            "directions": 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
            "chef_notes": 'you can also do them in an oven at 125 f',
            "img_link": 'https://www.youtube.com/watch?v=5yTWGjPdj-g',
            "url":  'https://www.google.com/search?q=inally+python&oq=inally+python&aqs=chrome..69i57.1429j0j1&sourceid=chrome&ie=UTF-8'
        }
    recipe1 = {
            "title": "SeaWeed Miso Soup",
            "author": 'Me',
            "src": 'My Parents',
            "quick_description": 'Tasty home made Italian ricenoodle stuff!',
            "total_time": '1 Year',
            "prep_time": '30 minutes',
            "cook_time": '7 Days',
            "rating": 4.8,
            "servings": 25,
            "calories": 100,
            "ingredients": ['1 ton Pasta Sauce','1 Kilogram Olive Oil','1 Ton of Garlic','2 tablespoons of Spices', 'Water', 'Pasta'],
            "ingredient_tags": ['Pasta Sauce','Olive Oil', 'Garlic','Spices', 'Water', 'Pasta'],
            "directions": '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&',
            "chef_notes": 'you can also do them in an dishwasher at 125 C',
            "img_link": 'https://www.youtube.com/watch?v=SUcHLs0bmts',
            "url":  'https://stackoverflow.com/questions/43524770/insert-a-single-variable-into-a-table-in-postgresql-using-python'
        }
    recipe3 = {
            "title": "Miso",
            "author": 'Me',
            "src": 'My Parents',
            "quick_description": 'Tasty home made Japanese ricenoodle stuff!',
            "total_time": '2 Year',
            "prep_time": '30 minutes',
            "cook_time": '7 Days',
            "rating": 4.8,
            "servings": 25,
            "calories": 100,
            "ingredients": ['1 Seaweed Water','1 Ton of Garlic','2 tablespoons of Spices', '2 kg Water', '1 ton Noodles'],
            "ingredient_tags": ['Seaweed Water','Olive Oil', 'Garlic','Spices', 'Water', 'Noodles'],
            "directions": '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&',
            "chef_notes": 'you can also do them in an dishwasher at 125 C',
            "img_link": 'https://www.youtube.com/watch?v=SUcHLs0bmts',
            "url":  'https://stackoverflow.com/questions/43524770/insert-a-single-variable-into-a-table-in-postgresql-using-python'
        }
    insert(recipe)
    insert(recipe1)
    insert(recipe3)
    print("\n\n\n SEARCH 1 \n")
    search_by_ingredients(["olIve oIl"])
    print("\n\n\n SEARCH 2 \n")
    search_by_ingredients(["sPiCes"])
    print("\n\n\n SEARCH 3 \n")
    search_by_ingredients(["sPiCes","Water"])
    print("\n\n\n SEARCH Recipe 1 \n")
    get_full_recipe(1)
    print("\n\n\n SEARCH Title 2 \n")
    search_by_title("Miso")

#if __name__ == "__main__":
    #main()

