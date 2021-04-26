from flask import Flask, jsonify, request, Blueprint
import subprocess
import json


containers_api = Blueprint('containers_api', __name__)

##############################################################
# Functions
##############################################################

def podman_ps():
    # Example: separating each info with #
    # 54a48d41f6d9#registry.fedoraproject.org/f29/httpd:latest#/usr/bin/run-http...#2 minutes ago#0.0.0.0:8080->8080/tcp#laughing_bassi#Running
    command = 'podman --remote ps -a --format "{{.ID}}#{{.Image}}#{{.Command}}#{{.RunningFor}}#{{.Ports}}#{{.Names}}#{{.Status}}"'
    output = ''

    output = subprocess.run(['podman', 'ps', '-a', '--format', '{{.ID}}#{{.Image}}#{{.Command}}#{{.RunningFor}}#{{.Ports}}#{{.Names}}#{{.Status}}'], 
                                capture_output=True,
                                universal_newlines=True)

    output_containers = output.stdout
    output_error = output.stderr

    if len(output_containers) == 0 and ("does not exist in database" in output_error):
        output = subprocess.run(['podman', 'ps', '-a', '--format', '{{.ID}}#{{.Image}}#{{.Command}}#{{.RunningFor}}#{{.Ports}}#{{.Names}}#{{.Status}}'], 
                                stdout=subprocess.PIPE, 
                                universal_newlines=True)
    
    output_containers = output.stdout
    output_error = output.stderr

    if len(output_containers) == 0:
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
    containers, error_ps = podman_ps()
    if len(error_ps) > 0:
        return handle_error_containers(400, error_ps)
    return jsonify(containers)

# DELETE /containers
@containers_api.route('/api/containers', methods=['DELETE'])
def remove_containers():
    container_ids = request.get_json().get("IDs")
    length = len(container_ids)
    all_ids = " ".join(container_ids)

    command = "podman --remote rm {0}".format(all_ids)

    error_remove = ''

    if length != 0:
        error_remove = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True).stderr

    if len(error_remove) != 0:
        return handle_error_containers(400, error_remove)

    containers, error_ps = podman_ps()
    if len(error_ps) > 0:
        return handle_error_containers(400, error_ps)
    return jsonify(containers)

# POST /container-run
@containers_api.route('/api/container-run', methods=['POST'])
def container_run():
    run_command = request.get_json().get("command")
    length = len(run_command)
    command = "podman --remote run {0}".format(run_command)

    error_run = ''

    if length != 0:
        error_run = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True).stderr

    if len(error_run) != 0:
        return handle_error_containers(400, error_run)

    containers, error_ps = podman_ps()
    if len(error_ps) > 0:
        return handle_error_containers(400, error_ps)
    return jsonify(containers)

# POST /containers/stop
@containers_api.route('/api/containers/stop', methods=['POST'])
def containers_stop():
    container_ids = request.get_json().get("IDs")
    length = len(container_ids)
    all_ids = " ".join(container_ids)

    command = "podman --remote stop {0}".format(all_ids)

    error_stop = ''

    if length != 0:
        error_stop = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True).stderr

    if len(error_stop) != 0:
        return handle_error_containers(400, error_stop)
    
    containers, error_ps = podman_ps()
    if len(error_ps) > 0:
        return handle_error_containers(400, error_ps)
    return jsonify(containers)

# POST /containers/kill
@containers_api.route('/api/containers/kill', methods=['POST'])
def containers_kill():
    container_ids = request.get_json().get("IDs")
    length = len(container_ids)
    all_ids = " ".join(container_ids)

    command = "podman --remote kill {0}".format(all_ids)

    error_kill = ''

    if length != 0:
        error_kill = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True).stderr

    if len(error_kill) != 0:
        return handle_error_containers(400, error_kill)
    
    
    containers, error_ps = podman_ps()
    if len(error_ps) > 0:
        return handle_error_containers(400, error_ps)
    return jsonify(containers)

# Errors
@containers_api.errorhandler(400)
def handle_error_containers(e, text):
    print("errorhandler, e, text:", e, text)
    return text, e
