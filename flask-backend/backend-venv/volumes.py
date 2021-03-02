from flask import Flask, jsonify, request, Blueprint
import subprocess
import json


volumes_api = Blueprint('volumes_api', __name__)

##############################################################
# Functions
##############################################################

def podman_volumes():
    command = "podman volume inspect -a"

    volumes = subprocess.run("{0}".format(
        command), shell=True, capture_output=True).stdout
    volumes = json.loads(volumes)

    volumes_object = {
        'volumes': volumes
    }

    return volumes_object

##############################################################
# REST API
##############################################################

##############################################################
# Volumes
# GET /volumes
@volumes_api.route('/volumes', methods=['GET'])
def volumes_get():
    volumes = podman_volumes()
    return jsonify(volumes)

# POST /volumes/create
@volumes_api.route('/volumes/create', methods=['POST'])
def volumes_create():
    name = request.get_json().get("name")

    length = len(name)

    command = "podman volume create {0}".format(name)

    if length != 0:
        subprocess.run("{0}".format(command), shell=True,
                       capture_output=True).stdout

    volumes = podman_volumes()

    return jsonify(volumes)

# DELETE /volumes
@volumes_api.route('/volumes', methods=['DELETE'])
def volumes_remove():
    names = request.get_json().get("names")

    length = len(names)
    all_names = " ".join(names)
    print("all_names")
    print(all_names)

    command = "podman volume rm {0}".format(all_names)
    print("command")
    print(command)

    if length != 0:
        subprocess.run("{0}".format(command), shell=True,
                       capture_output=True).stdout

    volumes = podman_volumes()

    return jsonify(volumes)
