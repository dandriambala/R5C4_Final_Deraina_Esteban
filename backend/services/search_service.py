from repositories import search_repository

def get_all_searches():
    return search_repository.get_all_searches()

def get_search(search_id):
    return search_repository.get_search_by_id(search_id)

def create_search(search_data):
    return search_repository.add_search(search_data)

def update_search(search_id, search_data):
    return search_repository.update_search(search_id, search_data)