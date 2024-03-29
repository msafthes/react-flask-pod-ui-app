from flask import Flask, jsonify, request, Blueprint
import subprocess
import json


# For detailed information about what each Endpoint does, 
# see the Swagger REST API Documentation (link in README.md)

# allows to be imported in the main.py file
images_api = Blueprint('images_api', __name__)

##############################################################
# Functions
##############################################################

# Get a list of all available images
def podman_images(username):
    # Example: separating each info with #
    # docker.io/library/nginx#latest#6678c7c2e56c#4 weeks ago #131 MB
    podman_command = "podman --remote"
    if username == "Local":
        podman_command = "podman"


    command = podman_command + " images --format {{.Repository}}#{{.Tag}}#{{.ID}}#{{.Created}}#{{.Size}}"

    output = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True)

    if output.returncode != 0:
        error_images = output.stderr
        return [], error_images

    output_images = output.stdout

    podman_images_array = output_images.split('\n')
    # Removing the last '' empty part after split
    podman_images_array.pop()

    images = {"images": []}

    for item in podman_images_array:

        image_parts = item.split("#")

        image = {
            'repository': image_parts[0],
            'tag': image_parts[1],
            'id': image_parts[2],
            'created': image_parts[3],
            'size': image_parts[4]
        }

        images["images"].append(image)

    return images, ''

##############################################################
# REST API
##############################################################

##############################################################
# Images

# GET /images
@images_api.route('/api/images', methods=['GET'])
def get_images():
    username = request.headers.get('Active-Username')
    images, error_images = podman_images(username)

    if len(error_images) != 0:
        return handle_error_images(400, error_images)

    return jsonify(images)

# DELETE /images
@images_api.route('/api/images', methods=['DELETE'])
def remove_images():
    image_ids = request.get_json().get("IDs")
    all_ids = " ".join(image_ids)

    username = request.headers.get('Active-Username')
    podman_command = "podman --remote"
    if username == "Local":
        podman_command = "podman"


    command = "{0} rmi {1}".format(podman_command, all_ids)

    output = subprocess.run("{0}".format(command), shell=True,
                    capture_output=True, universal_newlines=True)

    if output.returncode != 0:
        error_remove = output.stderr
        return handle_error_images(400, error_remove)

    images, error_images = podman_images(username)

    if len(error_images) != 0:
        return handle_error_images(400, error_images)
    
    return jsonify(images)


# DELETE /images/prune
@images_api.route('/api/images/prune', methods=['DELETE'])
def prune_images():
    username = request.headers.get('Active-Username')

    podman_command = "podman --remote"
    if username == "Local":
        podman_command = "podman"


    command = "{0} image prune -a -f".format(podman_command)

    output = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True)

    if output.returncode != 0:
        error_prune = output.stderr
        return handle_error_images(400, error_prune)

    images, error_images = podman_images(username)

    if len(error_images) != 0:
        return handle_error_images(400, error_images)
    
    return jsonify(images)

# POST /images/pull
@images_api.route('/api/images/pull', methods=['POST'])
def images_pull():
    name = request.get_json().get("name")

    username = request.headers.get('Active-Username')

    podman_command = "podman --remote"
    if username == "Local":
        podman_command = "podman"

    command = "{0} pull {1}".format(podman_command, name)

    output = subprocess.run("{0}".format(command), shell=True,
                    capture_output=True, universal_newlines=True)

    if output.returncode != 0:
        error_pull = output.stderr
        return handle_error_images(400, error_pull)

    images, error_images = podman_images(username)

    if len(error_images) != 0:
        return handle_error_images(400, error_images)
        
    return jsonify(images)

# Errors
@images_api.errorhandler(400)
def handle_error_images(e, text):
    return text, e
