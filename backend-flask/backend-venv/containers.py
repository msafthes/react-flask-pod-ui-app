from flask import Flask, jsonify, request, Blueprint
import subprocess
import json


containers_api = Blueprint('containers_api', __name__)

##############################################################
# Functions
##############################################################

def podman_ps():
    print("podman_ps()")
    # Example: separating each info with #
    # 54a48d41f6d9#registry.fedoraproject.org/f29/httpd:latest#/usr/bin/run-http...#2 minutes ago#0.0.0.0:8080->8080/tcp#laughing_bassi#Running

    command = 'podman ps -a --format "{{.ID}}#{{.Image}}#{{.Command}}#{{.RunningFor}}#{{.Ports}}#{{.Names}}#{{.Status}}"'

    # output = subprocess.run("{0}".format(
    #     command), shell=True, capture_output=True).stdout.decode('utf-8')

    output = ''
    while len(output) == 0:
        output = subprocess.run(['podman', 'ps', '-a', '--format', '{{.ID}}#{{.Image}}#{{.Command}}#{{.RunningFor}}#{{.Ports}}#{{.Names}}#{{.Status}}'], 
                                stdout=subprocess.PIPE, 
                                universal_newlines=True).stdout

    print("podman_ps output executed")

    # IMAGES
    # command = subprocess.run(['podman', 'images', '--format', '{{.Repository}}#{{.Tag}}#{{.ID}}#{{.Created}}#{{.Size}}'],
    #                           stdout=subprocess.PIPE,
    #                           universal_newlines=True)

    print("output")
    print(output)
    print("len(output)")
    print(len(output))

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

##############################################################
# REST API
##############################################################

##############################################################
# Containers
# GET /containers
@containers_api.route('/containers', methods=['GET'])
def get_containers():
    containers = podman_ps()
    return jsonify(containers)

# DELETE /containers
@containers_api.route('/containers', methods=['DELETE'])
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
@containers_api.route('/container-run', methods=['POST'])
def container_run():
    run_command = request.get_json().get("command")
    count = len(run_command)
    command = "podman run {0}".format(run_command)

    if count != 0:
        subprocess.run("{0}".format(command), shell=True,
                       capture_output=True).stdout

    containers = podman_ps()

    return jsonify(containers)

# POST /containers/stop
@containers_api.route('/containers/stop', methods=['POST'])
def containers_stop():
    container_ids = request.get_json().get("IDs")
    print("containers_stop()")
    print("container_ids:")
    print(container_ids)

    count = len(container_ids)

    all_ids = " ".join(container_ids)
    print("all_ids:")
    print(all_ids)

    command = "podman stop {0}".format(all_ids)
    print("command:")
    print(command)

    if count != 0:
        subprocess.run("{0}".format(command), shell=True,
                       capture_output=True).stdout

    print("containers_stop command executed")

    containers = podman_ps()
    print("containers:")
    print(containers)

    return jsonify(containers)

# POST /containers/kill
@containers_api.route('/containers/kill', methods=['POST'])
def containers_kill():
    container_ids = request.get_json().get("IDs")

    count = len(container_ids)

    all_ids = " ".join(container_ids)

    command = "podman kill {0}".format(all_ids)

    if count != 0:
        subprocess.run("{0}".format(command), shell=True,
                       capture_output=True).stdout

    containers = podman_ps()

    return jsonify(containers)
