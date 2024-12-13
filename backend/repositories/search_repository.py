from shared.peristence import load_data, save_data

DATA_PATH = './data/searches.json'

def get_all_searches():
    return load_data(DATA_PATH)

def get_search_by_id(search_id):
    searches = load_data(DATA_PATH)
    return next((c for c in searches if c['id'] == search_id), None)

def add_search(search_data):
    searches = load_data(DATA_PATH)
    search_data['id'] = max([c['id'] for c in searches] + [0]) + 1
    searches.append(search_data)
    save_data(DATA_PATH, searches)
    return search_data

def update_search(search_id, search_data):
    searches = load_data(DATA_PATH)
    search = next((c for c in searches if c['id'] == search_id), None)
    if search:
        search.update(search_data)
        save_data(DATA_PATH, searches)
    return search