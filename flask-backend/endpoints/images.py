from flask import Flask, jsonify, request, Blueprint
import subprocess
import json


images_api = Blueprint('images_api', __name__)

##############################################################
# Functions
##############################################################

def podman_images():
    # Example: separating each info with #
    # docker.io/library/nginx#latest#6678c7c2e56c#4 weeks ago #131 MB
    output = subprocess.run(['podman', 'images', '--format', '{{.Repository}}#{{.Tag}}#{{.ID}}#{{.Created}}#{{.Size}}'],
                              capture_output=True,
                              universal_newlines=True)

    error_images = output.stderr

    if len(error_images) != 0:
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
    images, error_images = podman_images()

    if len(error_images) != 0:
        return handle_error_images(400, error_images)

    return jsonify(images)

# DELETE /images
@images_api.route('/api/images', methods=['DELETE'])
def remove_images():
    image_ids = request.get_json().get("IDs")
    length = len(image_ids)
    all_ids = " ".join(image_ids)

    command = "podman rmi {0}".format(all_ids)

    error_remove = ''

    if length != 0:
        error_remove = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True).stderr

    if len(error_remove) != 0:
        return handle_error_images(400, error_remove)

    images, error_images = podman_images()

    if len(error_images) != 0:
        return handle_error_images(400, error_images)
    
    return jsonify(images)


# DELETE /images/prune
@images_api.route('/api/images/prune', methods=['DELETE'])
def prune_images():
    command = "podman image prune -a -f"

    error_prune = ''

    error_prune = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True).stderr

    if len(error_prune) != 0:
        return handle_error_images(400, error_prune)

    images, error_images = podman_images()

    if len(error_images) != 0:
        return handle_error_images(400, error_images)
    
    return jsonify(images)

# POST /images/pull
@images_api.route('/api/images/pull', methods=['POST'])
def images_pull():
    name = request.get_json().get("name")
    length = len(name)
    command = "podman pull {0}".format(name)

    error_pull = ''

    if length != 0:
        error_pull = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True).stderr

    if len(error_pull) != 0:
        return handle_error_images(400, error_pull)

    images, error_images = podman_images()

    if len(error_images) != 0:
        return handle_error_images(400, error_images)
        
    return jsonify(images)

# Errors
@images_api.errorhandler(400)
def handle_error_images(e, text):
    print("errorhandler, e, text:", e, text)
    return text, e
