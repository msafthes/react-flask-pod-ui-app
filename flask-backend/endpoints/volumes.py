from flask import Flask, jsonify, request, Blueprint
import subprocess
import json


volumes_api = Blueprint('volumes_api', __name__)

##############################################################
# Functions
##############################################################

def podman_volumes(username):
    podman_command = "podman --remote"
    if username == "Local":
        podman_command = "podman"
    
    command = "{0} volume inspect -a".format(podman_command)

    output = subprocess.run("{0}".format(
        command), shell=True, capture_output=True, universal_newlines=True)
    
    error_volumes = output.stderr

    if len(error_volumes) != 0:
        return {}, error_volumes

    volumes = output.stdout
    volumes = json.loads(volumes)

    volumes_object = { 'volumes': volumes }
    return volumes_object, ''

##############################################################
# REST API
##############################################################

##############################################################
# Volumes
# GET /volumes
@volumes_api.route('/api/volumes', methods=['GET'])
def volumes_get():
    username = request.headers.get('Active-Username')
    volumes, error_volumes = podman_volumes(username)

    if len(error_volumes) != 0:
        return handle_error_volumes(400, error_volumes)

    return jsonify(volumes)

# POST /volumes/create
@volumes_api.route('/api/volumes/create', methods=['POST'])
def volumes_create():
    name = request.get_json().get("name")
    length = len(name)

    username = request.headers.get('Active-Username')
    podman_command = "podman --remote"
    if username == "Local":
        podman_command = "podman"


    command = "{0} volume create {1}".format(podman_command, name)

    error_create = ''

    if length != 0:
        error_create = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True).stderr

    if len(error_create) != 0:
        return handle_error_volumes(400, error_create)

    volumes, error_volumes = podman_volumes(username)

    if len(error_volumes) != 0:
        return handle_error_volumes(400, error_volumes)
    
    return jsonify(volumes)

# DELETE /volumes
@volumes_api.route('/api/volumes', methods=['DELETE'])
def volumes_remove():
    names = request.get_json().get("names")
    length = len(names)
    all_names = " ".join(names)

    username = request.headers.get('Active-Username')
    podman_command = "podman --remote"
    if username == "Local":
        podman_command = "podman"


    command = "{0} volume rm {1}".format(podman_command, all_names)

    error_remove = ''

    if length != 0:
        error_remove = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True).stderr

    if len(error_remove) != 0:
        return handle_error_volumes(400, error_remove)

    volumes, error_volumes = podman_volumes(username)

    if len(error_volumes) != 0:
        return handle_error_volumes(400, error_volumes)
    
    return jsonify(volumes)

# Errors
@volumes_api.errorhandler(400)
def handle_error_volumes(e, text):
    print("errorhandler, e, text:", e, text)
    return text, e
