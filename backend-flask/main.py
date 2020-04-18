from flask import Flask, jsonify, request
from flask_cors import CORS

import subprocess

from flask import jsonify

app = Flask("__main__")
CORS(app)


stores = [
    {
        'name': 'My Testing Store',
        'items': [
            {
                'name': 'chocolate',
                'price': 15.99,
                'liked': True
            }
        ]
    }
]

# GET /
@app.route('/', methods=['GET', 'POST'])
def get_stores():
    # process = subprocess.run(['echo', 'Trying echo command'],
    #                          stdout=subprocess.PIPE,
    #                          universal_newlines=True)
    # print("process:")
    # print(process.stdout)

    # process2 = subprocess.run(['ls'],
    #                           stdout=subprocess.PIPE,
    #                           universal_newlines=True)
    # print("process2:")
    # print(process2.stdout)

    # # process3 = subprocess.run(['ls -a'],
    # #                          stdout=subprocess.PIPE,
    # #                          universal_newlines=True)
    # # print("process3:")
    # # print(process3.stdout)

    # process4 = subprocess.run(['ls', '-a'],
    #                           stdout=subprocess.PIPE,
    #                           universal_newlines=True)

    # REPOSITORY    TAG      IMAGE ID    CREATED    SIZE
    # podman images --format "{{.Repository}} {{.Tag}} {{.ID}} {{.Created}} {{.Size}}|"
    # podman images --format "{{}}"

    # podman images --format "{{.Repository}}#{{.Tag}}#{{.ID}}#{{.Created}}#{{.Size}}|"

    # "docker.io/library/nginx latest 6678c7c2e56c 4 weeks ago 131 MB|" "docker.io/library/alpine latest e7d92cdc71fe 2 months ago 5.86 MB|"

    # Example:
    # "docker.io/library/nginx#latest#6678c7c2e56c#4 weeks ago #131 MB|" "docker.io/library/alpine#latest#e7d92cdc71fe#2 months ago#5.86 MB|"

    process4 = subprocess.run(['podman', 'images --format "{{.Repository}}#{{.Tag}}#{{.ID}}#{{.Created}}#{{.Size}}|"'],
                              stdout=subprocess.PIPE,
                              universal_newlines=True)

    podman_images_array = process4.stdout.split("|")
    podman_images_array.pop()  # Removing the last '' empty part after split

    images = {}

    index = 0
    for item in podman_images_array:
        image_parts = item.split("#")

        image = {
            'repository': image_parts[0],
            'tag': image_parts[1],
            'id': image_parts[2],
            'created': image_parts[3],
            'size': image_parts[4]
        }

        images[index] = image
        index += 1

    return jsonify(images)


# GET /store
@app.route('/store', methods=['GET', 'POST'])
def get_stores_store():
    response = jsonify({'stores': stores})
    return response


app.run(debug=True)
