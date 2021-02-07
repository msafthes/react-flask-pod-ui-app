from flask import Flask, jsonify, request
from flask_cors import CORS

import subprocess

import json

from flask_socketio import SocketIO, emit, disconnect

app = Flask("__main__")
CORS(app)


############################################################################################################################################################
# Functions
############################################################################################################################################################

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


def podman_ps():
    # Example: separating each info with #
    # 54a48d41f6d9#registry.fedoraproject.org/f29/httpd:latest#/usr/bin/run-http...#2 minutes ago#0.0.0.0:8080->8080/tcp#laughing_bassi#Running

    command = 'podman ps -a --format "{{.ID}}#{{.Image}}#{{.Command}}#{{.RunningFor}}#{{.Ports}}#{{.Names}}#{{.Status}}"'

    output = subprocess.run("{0}".format(
        command), shell=True, capture_output=True).stdout.decode('utf-8')

    podman_containers_array = output.split('\n')
    podman_containers_array.pop()  # Removing the last '' empty part after split

    containers = {"containers": []}

    for item in podman_containers_array:
        container_parts = item.split("#")
        container = {
            'containerId': container_parts[0],
            'image': container_parts[1],
            'command': container_parts[2],
            'created': container_parts[3],
            'ports': container_parts[4],
            'names': container_parts[5],
            'status': container_parts[6]
        }

        containers["containers"].append(container)

    return containers

def podman_logs(id):
    if(len(id) == 0):
        return ''

    command = "podman logs {0}".format(id)

    logs = subprocess.run("{0}".format(command), shell=True,
                          capture_output=True).stdout.decode('utf-8')

    output = subprocess.run("{0}".format(
        command), shell=True, capture_output=True).stdout.decode('utf-8')

    print("len(logs):", len(logs))
    if len(logs) == 0:
        logs = "There are no logs for this container yet."

    print("READY logs:")
    print(logs)
    return {'logs': logs}


def podman_volumes():
    command = "podman volume inspect -a"

    volumes = subprocess.run("{0}".format(
        command), shell=True, capture_output=True).stdout
    volumes = json.loads(volumes)

    volumes_object = {
        'volumes': volumes
    }

    return volumes_object

############################################################################################################################################################
# REST API
############################################################################################################################################################

############################################################################################################################################################
# Images

# GET /images
@app.route('/images', methods=['GET'])
def get_images():

    images = podman_images()

    return jsonify(images)

# DELETE /images
@app.route('/images', methods=['DELETE'])
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
@app.route('/images/prune', methods=['DELETE'])
def prune_images():
    command = "podman image prune -a -f"

    subprocess.run("{0}".format(command), shell=True,
                   capture_output=True).stdout

    images = podman_images()

    return jsonify(images)


############################################################################################################################################################
# Containers

# GET /containers
@app.route('/containers', methods=['GET'])
def get_containers():
    containers = podman_ps()
    return jsonify(containers)

# DELETE /containers
@app.route('/containers', methods=['DELETE'])
def remove_containers():
    container_ids = request.get_json().get("IDs")

    count = len(container_ids)

    all_ids = " ".join(container_ids)

    command = "podman rm {0}".format(all_ids)

    if count != 0:
        subprocess.run("{0}".format(command), shell=True,
                       capture_output=True).stdout

    containers = podman_ps()

    return jsonify(containers)

# POST /container-run
@app.route('/container-run', methods=['POST'])
def container_run():
    run_command = request.get_json().get("command")
    count = len(run_command)
    command = "podman run {0}".format(run_command)

    if count != 0:
        subprocess.run("{0}".format(command), shell=True,
                       capture_output=True).stdout

    containers = podman_ps()

    return jsonify(containers)


############################################################################################################################################################
# Volumes

# GET /volumes
@app.route('/volumes', methods=['GET'])
def get_volumes():
    volumes = podman_volumes()
    return jsonify(volumes)


############################################################################################################################################################


# GET /
@app.route('/', methods=['GET', 'POST'])
def get_hello():
    return "Podman REST API"

############################################################################################################################################################


# WebSocket Testing
async_mode = None

# socketio = SocketIO(app)
socket_ = SocketIO(app, async_mode=async_mode, cors_allowed_origins="*")

# @socket_.on('event://send-message', namespace='/test')


@socket_.on('event://send-message')
def test_message(data):
    print('test_message()')
    print("DATA:")
    print(data)
    # id = data.get_json().get("data")
    # id = getattr(data, "id")
    id = data.get('id')
    print("ID:")
    print(id)
    logs = podman_logs(id)
    emit('event://get-message', logs)
    # session['receive_count'] = session.get('receive_count', 0) + 1
    # emit('my_response', {'data': message['data'], 'count': session['receive_count']})

# @socketio.on('event://send-message')
# def handle_message(data):
#     print('received message: ' + data)

# @socketio.on('event://get-message')
# def handle_my_custom_event():
#     emit('my response')


# app.run(debug=True)
if __name__ == '__main__':
    socket_.run(app, debug=True)


# app.run(port=5000)
# socketio.run(app, port=5005)
