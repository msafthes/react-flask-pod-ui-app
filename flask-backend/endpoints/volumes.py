from flask import Flask, jsonify, request, Blueprint
import subprocess
import json


volumes_api = Blueprint('volumes_api', __name__)

##############################################################
# Functions
##############################################################

def podman_volumes():
    command = "podman volume inspect -a"

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
    volumes, error_volumes = podman_volumes()

    if len(error_volumes) != 0:
        return handle_error_volumes(400, "Error occured while running `podman volume inspect -a` command to fetch volumes :\
        \n{0}".format(error_volumes))

    return jsonify(volumes)

# POST /volumes/create
@volumes_api.route('/api/volumes/create', methods=['POST'])
def volumes_create():
    name = request.get_json().get("name")
    length = len(name)
    command = "podman volume create {0}".format(name)

    error_create = ''

    if length != 0:
        error_create = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True).stderr

    if len(error_create) != 0:
        return handle_error_volumes(400, "Error occured while running `podman volume create` command to create volumes:\
        \n{0}Command was: `{1}`".format(error_create, command))

    volumes, error_volumes = podman_volumes()

    if len(error_volumes) != 0:
        return handle_error_volumes(400, "Error occured while running `podman volume inspect -a` command to fetch volumes :\
        \n{0}".format(error_volumes))
    
    return jsonify(volumes)

# DELETE /volumes
@volumes_api.route('/api/volumes', methods=['DELETE'])
def volumes_remove():
    names = request.get_json().get("names")
    length = len(names)
    all_names = " ".join(names)
    command = "podman volume rm {0}".format(all_names)

    error_remove = ''

    if length != 0:
        error_remove = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True).stderr

    if len(error_remove) != 0:
        return handle_error_volumes(400, "Error occured while running `podman volume rm` command to remove volumes:\
        \n{0}Command was: `{1}`".format(error_remove, command))

    volumes, error_volumes = podman_volumes()

    if len(error_volumes) != 0:
        return handle_error_volumes(400, "Error occured while running `podman volume inspect -a` command to fetch volumes :\
        \n{0}".format(error_volumes))
    
    return jsonify(volumes)

# Errors
@volumes_api.errorhandler(400)
def handle_error_volumes(e, text):
    print("errorhandler, e, text:", e, text)
    return text, e
