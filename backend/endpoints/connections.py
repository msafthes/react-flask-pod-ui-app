from flask import Flask, jsonify, request, Blueprint
import subprocess
import json


# For detailed information about what each Endpoint does, 
# see the Swagger REST API Documentation (link in README.md)

# allows to be imported in the main.py file
connections_api = Blueprint('connections_api', __name__)

##############################################################
# Functions
##############################################################

# no helper functions yet

##############################################################
# REST API
##############################################################

##############################################################
# Connections

# GET /connections/key
@connections_api.route('/api/connections/key', methods=['GET'])
def connections_key_get():
    command = "cat ~/.ssh/id_rsa.pub"

    output = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True)

    key = output.stdout
    
    if output.returncode != 0:
        error_connections = output.stderr
        return handle_error_connections(400, error_connections)

    result = {"sshKey": key}

    return jsonify(result)

# POST /connections
@connections_api.route('/api/connections', methods=['POST'])
def connections_add():
    connection = request.get_json().get("connection")
    username = connection['username']
    ip = connection['ip']
    podman_socket_path = connection['podmanSocketPath']

    command = "podman --remote system connection add {0} \
        --identity ~/.ssh/id_rsa \
            ssh://{0}@{1}{2}".format(username, ip, podman_socket_path)


    output = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True)

    if output.returncode != 0:
        error_connections = output.stderr
        return handle_error_connections(400, error_connections)
    
    return "success"

# DELETE /connections
@connections_api.route('/api/connections', methods=['DELETE'])
def connections_remove():
    connection = request.get_json().get("connection")
    username = connection['username']

    command = "podman --remote system connection remove {0}".format(username)


    output = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True)

    if output.returncode != 0:
        error_connections = output.stderr
        return handle_error_connections(400, error_connections)
    
    return "success"

# POST /connections/activate
@connections_api.route('/api/connections/activate', methods=['POST'])
def connections_activate():
    connection = request.get_json().get("connection")
    username = connection['username']

    command = "podman --remote system connection default {0}".format(username)

    output = subprocess.run("{0}".format(command), shell=True,
                       capture_output=True, universal_newlines=True)

    if output.returncode != 0:
        error_connections = output.stderr
        return handle_error_connections(400, error_connections)
    
    return "success"

# Errors
@connections_api.errorhandler(400)
def handle_error_connections(e, text):
    return text, e
