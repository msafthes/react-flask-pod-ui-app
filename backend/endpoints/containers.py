from flask import Flask, jsonify, request, Blueprint
import subprocess
import json


# For detailed information about what each Endpoint does, 
# see the Swagger REST API Documentation (link in README.md)

# allows to be imported in the main.py file
containers_api = Blueprint('containers_api', __name__)

##############################################################
# Functions
##############################################################

# Get a list of all available containers
def podman_ps(username):
    # Example: separating each info with #
    # 54a48d41f6d9#registry.fedoraproject.org/f29/httpd:latest#/usr/bin/run-http...#2 minutes ago#0.0.0.0:8080->8080/tcp#laughing_bassi#Running
    podman_command = "podman --remote"
    if username == "Local":
        podman_command = "podman"

    command = podman_command + " ps -a --format {{.ID}}#{{.Image}}#{{.Command}}#{{.RunningFor}}#{{.Ports}}#{{.Names}}#{{.Status}}"

    output = ''

    output = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True)

    output_containers = output.stdout
    output_error = output.stderr

    # for WSL2 to ignore database error
    if len(output_containers) == 0 and ("does not exist in database" in output_error):
        output = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True)

    output_containers = output.stdout

    if output.returncode != 0:
        output_error = output.stderr
        return [], output_error

    podman_containers_array = output_containers.split('\n')
    # Removing the last '' empty part after split
    podman_containers_array.pop()

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

    return containers, ""

##############################################################
# REST API
##############################################################

##############################################################
# Containers

# GET /containers
@containers_api.route('/api/containers', methods=['GET'])
def get_containers():
    username = request.headers.get('Active-Username')
    containers, error_ps = podman_ps(username)
    if len(error_ps) > 0:
        return handle_error_containers(400, error_ps)
    return jsonify(containers)

# DELETE /containers
@containers_api.route('/api/containers', methods=['DELETE'])
def remove_containers():
    container_ids = request.get_json().get("IDs")
    all_ids = " ".join(container_ids)

    username = request.headers.get('Active-Username')
    podman_command = "podman --remote"
    if username == "Local":
        podman_command = "podman"


    command = "{0} rm {1}".format(podman_command, all_ids)


    output = subprocess.run("{0}".format(command), shell=True,
                    capture_output=True, universal_newlines=True)

    if output.returncode != 0:
        error_remove = output.stderr
        return handle_error_containers(400, error_remove)

    containers, error_ps = podman_ps(username)
    if len(error_ps) > 0:
        return handle_error_containers(400, error_ps)
    return jsonify(containers)

# POST /containers/run
@containers_api.route('/api/containers/run', methods=['POST'])
def container_run():
    run_command = request.get_json().get("command")

    username = request.headers.get('Active-Username')
    podman_command = "podman --remote"
    if username == "Local":
        podman_command = "podman"


    command = "{0} run {1}".format(podman_command, run_command)


    output = subprocess.run("{0}".format(command), shell=True,
                    capture_output=True, universal_newlines=True)

    if output.returncode != 0:
        error_run = output.stderr
        return handle_error_containers(400, error_run)

    containers, error_ps = podman_ps(username)
    if len(error_ps) > 0:
        return handle_error_containers(400, error_ps)
    return jsonify(containers)

# POST /containers/stop
@containers_api.route('/api/containers/stop', methods=['POST'])
def containers_stop():
    container_ids = request.get_json().get("IDs")
    all_ids = " ".join(container_ids)

    username = request.headers.get('Active-Username')
    podman_command = "podman --remote"
    if username == "Local":
        podman_command = "podman"


    command = "{0} stop {1}".format(podman_command, all_ids)

    output = subprocess.run("{0}".format(command), shell=True,
                    capture_output=True, universal_newlines=True)

    if output.returncode != 0:
        error_stop = output.stderr
        return handle_error_containers(400, error_stop)
    
    containers, error_ps = podman_ps(username)
    if len(error_ps) > 0:
        return handle_error_containers(400, error_ps)
    return jsonify(containers)

# POST /containers/kill
@containers_api.route('/api/containers/kill', methods=['POST'])
def containers_kill():
    container_ids = request.get_json().get("IDs")
    all_ids = " ".join(container_ids)

    username = request.headers.get('Active-Username')
    podman_command = "podman --remote"
    if username == "Local":
        podman_command = "podman"

    command = "{0} kill {1}".format(podman_command, all_ids)


    output = subprocess.run("{0}".format(command), shell=True,
                    capture_output=True, universal_newlines=True)

    if output.returncode != 0:
        error_kill = output.stderr
        return handle_error_containers(400, error_kill)
    
    
    containers, error_ps = podman_ps(username)
    if len(error_ps) > 0:
        return handle_error_containers(400, error_ps)
    return jsonify(containers)

# Errors
@containers_api.errorhandler(400)
def handle_error_containers(e, text):
    return text, e
