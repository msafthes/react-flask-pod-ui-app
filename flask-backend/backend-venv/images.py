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

    command = subprocess.run(['podman', 'images', '--format', '{{.Repository}}#{{.Tag}}#{{.ID}}#{{.Created}}#{{.Size}}'],
                              stdout=subprocess.PIPE,
                              universal_newlines=True)

    podman_images_array = command.stdout.split('\n')
    podman_images_array.pop()  # Removing the last '' empty part after split

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

    return images

##############################################################
# REST API
##############################################################

##############################################################
# Images

# GET /images
@images_api.route('/images', methods=['GET'])
def get_images():

    images = podman_images()

    return jsonify(images)

# DELETE /images
@images_api.route('/images', methods=['DELETE'])
def remove_images():
    image_ids = request.get_json().get("IDs")
    count = len(image_ids)
    all_ids = " ".join(image_ids)

    command = "podman rmi {0}".format(all_ids)

    if count != 0:
        subprocess.run("{0}".format(command), shell=True,
                       capture_output=True).stdout

    images = podman_images()

    return jsonify(images)


# DELETE /images/prune
@images_api.route('/images/prune', methods=['DELETE'])
def prune_images():
    command = "podman image prune -a -f"

    subprocess.run("{0}".format(command), shell=True,
                   capture_output=True).stdout

    images = podman_images()

    return jsonify(images)

# POST /images/pull
@images_api.route('/images/pull', methods=['POST'])
def images_pull():
    print("images_pull()")
    name = request.get_json().get("name")
    print("name:")
    print(name)

    length = len(name)
    command = "podman pull {0}".format(name)
    print("command:")
    print(command)

    if length != 0:
        subprocess.run("{0}".format(command), shell=True,
                       capture_output=True).stdout

    images = podman_images()

    return jsonify(images)
