from flask import Flask, jsonify, request
from flask_cors import CORS

import subprocess


app = Flask("__main__")
CORS(app)

# GET /images
@app.route('/images', methods=['GET', 'POST'])
def get_images():

    # Example: separating each info with #
    # docker.io/library/nginx#latest#6678c7c2e56c#4 weeks ago #131 MB
    # docker.io/library/alpine#latest#e7d92cdc71fe#2 months ago#5.86 MB

    process4 = subprocess.run(['podman', 'images', '--format', '{{.Repository}}#{{.Tag}}#{{.ID}}#{{.Created}}#{{.Size}}'],
                              stdout=subprocess.PIPE,
                              universal_newlines=True)

    podman_images_array = process4.stdout.split('\n')
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

    return jsonify(images)

# GET /containers
@app.route('/containers', methods=['GET', 'POST'])
def get_containers():

    # Example: separating each info with #
    # 54a48d41f6d9#registry.fedoraproject.org/f29/httpd:latest#/usr/bin/run-http...#2 minutes ago#0.0.0.0:8080->8080/tcp#laughing_bassi

    process4 = subprocess.run(['podman', 'ps', '--format', '{{.ID}}#{{.Image}}#{{.Command}}#{{.RunningFor}}#{{.Ports}}#{{.Names}}'],
                              stdout=subprocess.PIPE,
                              universal_newlines=True)

    podman_containers_array = process4.stdout.split('\n')
    podman_containers_array.pop()  # Removing the last '' empty part after split

    containers = {"containers": []}

    for item in podman_containers_array:

        container_parts = item.split("#")

        container = {
            'id': container_parts[0],
            'image': container_parts[1],
            'command': container_parts[2],
            'created': container_parts[3],
            'ports': container_parts[4],
            'names': container_parts[5]
        }

        containers["containers"].append(container)

    return jsonify(containers)

# GET /
@app.route('/', methods=['GET', 'POST'])
def get_hello():

    return "Podman REST API"


app.run(debug=True)
