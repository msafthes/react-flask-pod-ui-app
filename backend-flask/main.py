from flask import Flask, jsonify, request
from flask_cors import CORS

import subprocess


app = Flask("__main__")
CORS(app)


# GET /images
@app.route('/images', methods=['GET', 'POST'])
def get_stores():

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

# GET /
@app.route('/', methods=['GET', 'POST'])
def get_hello():

    return "Podman REST API"

app.run(debug=True)
