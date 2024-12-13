from flask import Blueprint, jsonify, request, abort
from services import search_service

search_bp = Blueprint('search', __name__)

@search_bp.route('/searches', methods=['GET'])
def get_all_searches():
    searches = search_service.get_all_searches()
    return jsonify(searches)

@search_bp.route('/searches/<int:id>', methods=['GET'])
def get_search(search_id):
    search = search_service.get_search(search_id)
    if search is None:
        abort(404)
    return jsonify(search)

@search_bp.route('/searches', methods=['POST'])
def create_search():
    search_data = request.json
    new_search = search_service.create_search(search_data)
    return jsonify(new_search), 201

@search_bp.route('/searches/<int:id>', methods=['PUT'])
def update_search(search_id):
    search_data = request.json
    updated_search = search_service.update_search(search_id, search_data)
    if updated_search is None:
        abort(404)
    return jsonify(updated_search)

@search_bp.route('/searches/<int:id>', methods=['DELETE'])
def delete_search(search_id):
    success = search_service.delete_search(search_id)
    if not success:
        abort(404)
    return '', 204