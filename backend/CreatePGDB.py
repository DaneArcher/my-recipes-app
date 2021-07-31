import psycopg2
import constants
from psycopg2 import Error
from psycopg2 import sql

def setup():
    connection = "      "
    ## GLOBAL TABLES ##
    try:
        # this initial connection should be in its own try except
        connection = psycopg2.connect(user = constants.DB_USER,
                                    password = constants.DB_PSWD,
                                    host = constants.DB_HOST,
                                    port = constants.DB_PORT,
                                    database = constants.DB_NAME)

        cursor = connection.cursor()
        
        create_table_query = '''CREATE TABLE global_recipe_table
            (recipe_id SERIAL PRIMARY KEY     NOT NULL,
            title           TEXT    ,
            ingredients      TEXT[] ,
            ingredient_tags TEXT[]  ,
            directions      TEXT    ,
            img_link        TEXT    ,
            prep_time       TEXT    ,
            total_time      TEXT    ,
            cook_time       TEXT    ,
            inactive_time   TEXT    ,
            calories        INT     ,
            rating          FLOAT   ,
            servings        TEXT    ,
            author          TEXT    ,
            source          TEXT    ,
            quick_description TEXT  ,
            chef_notes      TEXT    ,
            source_URL      TEXT    ,
            num_ingredients INT     ,
            level           TEXT    ,
            user_id         TEXT); '''
        
        cursor.execute(create_table_query) # git equivlent to add
        connection.commit() # git euivelent to commit plus push
        print("Global Recipe Table created successfully in PostgreSQL ")

    except (Exception, psycopg2.DatabaseError) as error :
        print ("Error while creating global_recipe_table", error)
    

    # Global ingredient table creation
    try:
        #you don't have to keep doing connection.cursor
        cursor = connection.cursor()

        create_table_query = '''CREATE TABLE global_ingredient_search_table
        (
            recipe_id INT NOT NULL,
            ingredient TEXT NOT NULL
        ); '''
        cursor.execute(create_table_query)
        connection.commit()
        print("Global Ingredient Search Table created succesffully in PostegreSQL")


    except (Exception, psycopg2.DatabaseError) as error :
        print ("Error while creating global_ingredient_search_table", error)

    # global recipe title index
    try:
        cursor = connection.cursor()

        create_index_query = '''CREATE INDEX global_recipe_title_index ON global_recipe_table (title);'''
        cursor.execute(create_index_query)
        connection.commit()
        print("Global Recipe Title Index created succesfully in PostegreSQL")


    except (Exception, psycopg2.DatabaseError) as error :
        print ("Error while creating Global Recipe Title Index", error)

    # Global recipe ingredient index
    try:
        cursor = connection.cursor()

        create_index_query = '''CREATE INDEX global_parsed_ingredient_index ON global_ingredient_search_table (ingredient);'''
        cursor.execute(create_index_query)
        connection.commit()
        print("Global Parsed Ingredient Index created succesfully in PostegreSQL")


    except (Exception, psycopg2.DatabaseError) as error :
        print ("Error while creating Global Parsed Ingredient Index ", error)
    ## Global TABLES - END ##
    
    ## USER TABLES ##

    # user recipe table creation
    try:
        cursor = connection.cursor()
        create_table_query = '''CREATE TABLE user_recipe_table
            (recipe_id SERIAL PRIMARY KEY     NOT NULL,
            title           TEXT    ,
            ingredients      TEXT[] ,
            ingredient_tags TEXT[]  ,
            directions      TEXT    ,
            img_link        TEXT    ,
            prep_time       TEXT    ,
            total_time      TEXT    ,
            cook_time       TEXT    ,
            inactive_time   TEXT    ,
            calories        INT     ,
            rating          FLOAT   ,
            servings        TEXT    ,
            author          TEXT    ,
            source          TEXT    ,
            quick_description TEXT  ,
            chef_notes      TEXT    ,
            source_URL      TEXT    ,
            num_ingredients INT     ,
            level           TEXT    ,
            user_id         TEXT); '''
            #user_id needs to be NOT NULL change later
        
        cursor.execute(create_table_query) # git equivlent to add
        connection.commit() # git euivelent to commit plus push
        print("User Recipe Table created successfully in PostgreSQL ")

    except (Exception, psycopg2.DatabaseError) as error :
        print ("Error while creating user_recipe_table", error)

    # user ingredient table creation
    try:
        #you don't have to keep doing connection.cursor
        cursor = connection.cursor()

        create_table_query = '''CREATE TABLE user_ingredient_search_table
        (
            recipe_id INT NOT NULL,
            ingredient TEXT NOT NULL,
            user_id TEXT NOT NULL
        ); '''
        cursor.execute(create_table_query)
        connection.commit()
        print("User Ingredient Search Table created succesffully in PostegreSQL")


    except (Exception, psycopg2.DatabaseError) as error :
        print ("Error while creating user_ingredient_search_table", error)

    # user recipe title index
    try:
        cursor = connection.cursor()

        create_index_query = '''CREATE INDEX user_recipe_title_index ON user_recipe_table (title, user_id);'''
        cursor.execute(create_index_query)
        connection.commit()
        print("User Recipe Title Index created succesfully in PostegreSQL")


    except (Exception, psycopg2.DatabaseError) as error :
        print ("Error while creating User Recipe Title Index", error)

    # user recipe ingredient index
    try:
        cursor = connection.cursor()

        create_index_query = '''CREATE INDEX user_parsed_ingredient_index ON user_ingredient_search_table (ingredient, user_id);'''
        cursor.execute(create_index_query)
        connection.commit()
        print("User Parsed Ingredient Index created succesfully in PostegreSQL")

    except (Exception, psycopg2.DatabaseError) as error :
        print ("Error while creating User Parsed Ingredient Index ", error)
    
    ## USER TABLES - END##

    finally:
        #closing database connection.
            if(connection):
                cursor.close()
                connection.close()

#TODO fix later
def insert(recipe: dict, user_id: str = None) -> bool:
    ingredient_tags = recipe['ingredient_tags']
    ingredient_list = recipe['ingredients']
    connection = 0
    recipe_id = 0
    table_name = "user_recipe_table" if user_id else "global_recipe_table"
    try:
        connection = psycopg2.connect(user = constants.DB_USER,
                                        password = constants.DB_PSWD,
                                        host = constants.DB_HOST,
                                        port = constants.DB_PORT,
                                        database = constants.DB_NAME)
        cursor = connection.cursor()

        postgres_insert_query = """ INSERT INTO %s 
                                    (title, ingredients, ingredient_tags, directions, img_link, prep_time, total_time, cook_time, inactive_time, calories, 
                                    rating, servings, author, source, quick_description, chef_notes, source_URL, num_ingredients, level, user_id) 
                                    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING recipe_id;"""
        record_to_insert = (table_name, recipe['title'], ingredient_list, ingredient_tags, recipe['directions'], recipe['img_link'], recipe['prep_time'], recipe['total_time'], recipe['cook_time'], recipe['inactive_time'], int(recipe['calories']), float(recipe['rating']), recipe['servings'], recipe['author'], recipe['src'], recipe['quick_description'],recipe['chef_notes'], recipe['url'], len(ingredient_list), recipe['level'], user_id)

        # is this thread safe
        cursor.execute(postgres_insert_query, record_to_insert)
        recipe_id = cursor.fetchone()[0]

        connection.commit()
        #
        print (recipe_id, "Record inserted successfully into recipe table")
        if (table_name == 'global_recipe_table'):
            insert_into_global_ingredient_search_table(ingredient_tags, recipe_id)
        else:#user_recipe_table
            insert_into_user_ingredient_search_table(ingredient_tags, recipe_id, user_id)

    except (Exception, psycopg2.Error) as error :
        if(connection):
            print("Failed to insert record into mobile table", error)
            return False

    finally:
        #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
    return True

#add pagination
def search_by_title(recipe_name: str, user_id:str = None):
    connection = ""
    json_list = []

    try:
        connection = psycopg2.connect(user = constants.DB_USER,
                                        password = constants.DB_PSWD,
                                        host = constants.DB_HOST,
                                        port = constants.DB_PORT,
                                        database = constants.DB_NAME)
        cursor = connection.cursor()

        user_recipe_query="SELECT recipe_id FROM user_recipe_table WHERE user_id=%s AND LOWER(title) LIKE LOWER(%s);"
        global_recipe_query = "SELECT recipe_id FROM global_recipe_table WHERE LOWER(title) LIKE LOWER(%s);"

        postgres_search_query = user_recipe_query if user_id else global_recipe_query
        
        #postgres_search_query = "SELECT recipe_id FROM global_recipe_table WHERE LOWER(title) LIKE LOWER(%s);"
        like_pattern = '%{}%'.format(recipe_name)
        if user_id:
            cursor.execute(postgres_search_query,(user_id, like_pattern,))
        
        else:
            cursor.execute(postgres_search_query,(like_pattern,))

        recipe_id_list = cursor.fetchall()


        for recipe_id in recipe_id_list:
            postgres_search_query = "SELECT title, total_time, img_link, rating FROM global_recipe_table WHERE recipe_id=%s;"
            cursor.execute(postgres_search_query,(recipe_id,)) #figure out why?
            ret = cursor.fetchall()

            json_map = {}
            json_map['title'] = ret[0][0]
            json_map['total_time'] = ret[0][1]
            json_map['img_link'] = ret[0][2]
            json_map['rating'] = ret[0][3]
            json_map['recipe_id'] = recipe_id[0]
            json_list.append(json_map)

        return json_list

    except (Exception, psycopg2.Error) as error :
        if(connection):
            print("Search by Title Failed", error)

    finally:
        #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
#add pagination
def search_by_ingredients(list_of_ingredients: list, user_id:str = None):
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

        if user_id:
            postgres_search_query = (length-1) * ("SELECT recipe_id FROM user_ingredient_search_table WHERE user_id="+ user_id +" AND LOWER(ingredient)=LOWER(%s) INTERSECT ") #PYTHON BITCH!!!!
            postgres_search_query += "SELECT recipe_id FROM user_ingredient_search_table WHERE user_id="+ user_id +" AND LOWER(ingredient)=LOWER(%s);"
        
        else:
            postgres_search_query = (length-1) * "SELECT recipe_id FROM global_ingredient_search_table WHERE LOWER(ingredient)=LOWER(%s) INTERSECT " #PYTHON BITCH!!!!
            postgres_search_query += "SELECT recipe_id FROM global_ingredient_search_table WHERE LOWER(ingredient)=LOWER(%s);"

        cursor.execute(postgres_search_query, tuple(list_of_ingredients))
        recipe_id_list = cursor.fetchall()

        for recipe_id in recipe_id_list:
            postgres_search_query = "SELECT title, total_time, img_link, rating FROM global_recipe_table WHERE recipe_id=%s;"
            cursor.execute(postgres_search_query,(recipe_id,))
            ret = cursor.fetchall()

            json_map = {}
            json_map['title'] = ret[0][0]
            json_map['total_time'] = ret[0][1]
            json_map['img_link'] = ret[0][2]
            json_map['rating'] = ret[0][3]
            json_map['recipe_id'] = recipe_id[0]

            json_list.append(json_map)
        return json_list

    except (Exception, psycopg2.Error) as error :
        if(connection):
            print("Search by Ingredients Failed", error)

    finally:
        #closing database connection.
        if(connection):
            cursor.close()
            connection.close()

def get_full_recipe(recipe_id: int, user_id: str = None):
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

        postgres_search_query = "SELECT * FROM %s WHERE recipe_id=%s;"
        cursor.execute(postgres_search_query, ("user_recipe_table", recipe_id,)) if user_id else cursor.execute(postgres_search_query, ("global_recipe_table", recipe_id,))

        recipe = cursor.fetchall()
        print("\n\n")

    except (Exception, psycopg2.Error) as error :
        if(connection):
            print("Accessing the full recipe failed", error)


    finally:
        #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
    
    recipe_map = {}

    recipe_map['recipe_id'] = recipe_id
    recipe_map['title'] = recipe[0][1]
    recipe_map['ingredients'] = recipe[0][2] #SENDING IN A LIST OF TUPLES
    recipe_map['ingredient_tags'] = recipe[0][3]
    recipe_map['directions'] = recipe[0][4]
    recipe_map['img_link'] = recipe[0][5]
    recipe_map['prep_time'] = recipe[0][6]
    recipe_map['total_time'] = recipe[0][7]
    recipe_map['cook_time'] = recipe[0][8]
    recipe_map['inactive_time'] = recipe[0][9]
    recipe_map['calories'] = recipe[0][10]
    recipe_map['rating'] = recipe[0][11]
    recipe_map['servings'] = recipe[0][12]
    recipe_map['author'] = recipe[0][13]
    recipe_map['src'] = recipe[0][14]
    recipe_map['quick_description'] = recipe[0][15]
    recipe_map['chef_notes'] = recipe[0][16]
    recipe_map['url'] = recipe[0][17]
    recipe_map['num_of_ingredients'] = recipe[0][18]
    recipe_map['level'] = recipe[0][19]

    return recipe_map


def delete_recipe(recipe_id: int):
    try:
        connection = psycopg2.connect(user = constants.DB_USER,
                                        password = constants.DB_PSWD,
                                        host = constants.DB_HOST,
                                        port = constants.DB_PORT,
                                        database = constants.DB_NAME)
        cursor = connection.cursor()

        query = "SELECT title FROM global_recipe_table WHERE recipe_id=%s"
        cursor.execute(query,(recipe_id,))
        connection.commit()
        ret = cursor.fetchall()

        if ret[0]:
            dml = "DELETE FROM global_recipe_table WHERE recipe_id=%s;"
            cursor.execute(dml,(recipe_id,))
            
            dml = "DELETE FROM global_ingredient_search_table WHERE recipe_id=%s;"
            cursor.execute(dml, (recipe_id,))

            connection.commit()
            string = "Successfully deleted recipe " + str(ret[0]) + " from Database."
        else:
            print("This recipe does not exist, please try again with a valid recipe.")
    except (Exception, psycopg2.Error) as error :
        string = "Recipe: " + str(recipe_id) + " was not succesfully deleted."
        print(string, error)
    finally:
        #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
    return True

def edit_recipe(edits: dict):
    try:
        connection = psycopg2.connect(user = constants.DB_USER,
                                        password = constants.DB_PSWD,
                                        host = constants.DB_HOST,
                                        port = constants.DB_PORT,
                                        database = constants.DB_NAME)
        cursor = connection.cursor()

        recipe_id = edits["recipe_id"]
        #Typecasting each of the changed arguments from the edits dictionary
        for val in edits:
            if val == "calories" or val == "num_ingredients":
                query = 'UPDATE global_recipe_table SET {} = %s WHERE recipe_id = %s;'
                cursor.execute(sql.SQL(query).format(sql.Identifier(val)),[int(edits[val]),recipe_id])
            elif val == "rating":
                query = 'UPDATE global_recipe_table SET {} = %s WHERE recipe_id = %s;'
                cursor.execute(sql.SQL(query).format(sql.Identifier(val)),[float(edits[val]),recipe_id])
            else:
                # {} ONLY FOR SQL IDENTIFIERS
                # %s ONLY FOR VALUES
                query = 'UPDATE global_recipe_table SET {} = %s WHERE recipe_id = %s;'
                cursor.execute(sql.SQL(query).format(sql.Identifier(val)),[edits[val],recipe_id])

                if val == "ingredients" or val == "ingredient_tags":
                    dml = "DELETE FROM global_ingredient_search_table WHERE recipe_id=%s;"
                    cursor.execute(dml, (recipe_id,))
                    
                    insert_into_global_ingredient_search_table(edits["ingredient_tags"], recipe_id)
                    
            connection.commit()

    except (Exception, psycopg2.DatabaseError) as error:
        print("Edit Recipe Failed for recipe_id ", recipe_id, ". Error:", error)
    return True

def insert_into_global_ingredient_search_table(ingredient_tags: list, recipe_id: int):
    try:
        connection = psycopg2.connect(user = constants.DB_USER,
                                        password = constants.DB_PSWD,
                                        host = constants.DB_HOST,
                                        port = constants.DB_PORT,
                                        database = constants.DB_NAME)
        for ingredient in ingredient_tags:
            if ingredient != "":
                try:
                    cursor = connection.cursor()  
                    postgres_insert_query = '''INSERT INTO global_ingredient_search_table (ingredient, recipe_id) VALUES (%s,%s);'''
                    record_to_insert = (ingredient,recipe_id)
                    cursor.execute(postgres_insert_query,record_to_insert)
                    connection.commit()
                    string = ingredient + " was successfully inserted into ingredient table"
                except (Exception, psycopg2.Error) as error :
                    if(connection):
                        print("Failed to insert ingredient into global_ingredient_search_table", error)
    except (Exception, psycopg2.DatabaseError) as error:
        print("Insertion of recipe ", recipe_id, " into the Ingredient Search Table has failed. Error:", error)

def insert_into_user_ingredient_search_table(ingredient_tags: list, recipe_id: int, user_id: str):
    try:
        connection = psycopg2.connect(user = constants.DB_USER,
                                        password = constants.DB_PSWD,
                                        host = constants.DB_HOST,
                                        port = constants.DB_PORT,
                                        database = constants.DB_NAME)
        for ingredient in ingredient_tags:
            if ingredient != "":
                try:
                    cursor = connection.cursor()  
                    postgres_insert_query = '''INSERT INTO user_ingredient_search_table (ingredient, recipe_id, user_id) VALUES (%s,%s,%s);'''
                    record_to_insert = (ingredient,recipe_id,user_id)
                    cursor.execute(postgres_insert_query,record_to_insert)
                    connection.commit()
                    string = ingredient + " was successfully inserted into user ingredient table"
                except (Exception, psycopg2.Error) as error :
                    if(connection):
                        print("Failed to insert ingredient into user_ingredient_search_table", error)
    except (Exception, psycopg2.DatabaseError) as error:
        print("Insertion of recipe ", recipe_id, " into the User Ingredient Search Table has failed. Error:", error)


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
        print ("Deleting database failed", error)


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
            "rating": '4.8',
            "servings": '25',
            "calories": '100',
            "inactive_time": '',
            "level": '',
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
            "inactive_time": '',
            "level": '',
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
            "inactive_time": '',
            "level": '',
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
    print("\n\n\n+++++++++++++++++++++++++++++++++++SEARCH 1+++++++++++++++++++++++++++++++++++ \n")
    search_by_ingredients(["olIve oIl"])
    print("\n\n\n+++++++++++++++++++++++++++++++++++SEARCH 2+++++++++++++++++++++++++++++++++++ \n")
    search_by_ingredients(["sPiCes"])
    print("\n\n\n+++++++++++++++++++++++++++++++++++SEARCH 3+++++++++++++++++++++++++++++++++++ \n")
    search_by_ingredients(["sPiCes","Water"])
    print("\n\n\n+++++++++++++++++++++++++++++++++++SEARCH Recipe 1+++++++++++++++++++++++++++++++++++\n")
    get_full_recipe(1)
    print("\n\n\n+++++++++++++++++++++++++++++++++++SEARCH Title Miso+++++++++++++++++++++++++++++++++++ \n")
    search_by_title("Miso")
    print("\n\n\n+++++++++++++++++++++++++++++++++++Test Deletion of Recipe 2+++++++++++++++++++++++++++++++++++ \n")
    delete_recipe(2)
    print("\n\n\n+++++++++++++++++++++++++++++++++++Search Title Miso+++++++++++++++++++++++++++++++++++ \n")
    search_by_title("Miso")
    print("\n\n\n+++++++++++++++++++++++++++++++++++Get Full Recipe 1+++++++++++++++++++++++++++++++++++")
    get_full_recipe(1)

if __name__ == "__main__":
    main()