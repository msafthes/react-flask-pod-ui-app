from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

import subprocess

import json

from flask_socketio import SocketIO, emit, disconnect

# API Endpoints
from endpoints.images import images_api
from endpoints.containers import containers_api
from endpoints.volumes import volumes_api
from endpoints.connections import connections_api

app = Flask("__main__")
CORS(app)

app.register_blueprint(images_api)
app.register_blueprint(containers_api)
app.register_blueprint(volumes_api)
app.register_blueprint(connections_api)

# Default host IP address is localhost (127.0.01)
ip_address = "127.0.0.1"

@app.route("/")
@app.route("/images")
@app.route("/containers")
@app.route("/volumes")
@app.route("/container_logs:id")
@app.route("/connections")
def frontend_app():
    return render_template("index.html", flask_token="Podman UI Token")

@app.errorhandler(404)
def page_not_found(e):
    return render_template("index.html", flask_token="Podman UI Token")

##############################################################
# Functions
##############################################################

def podman_logs(username, id):
    if(len(id) == 0):
        return ''

    podman_command = "podman --remote"
    if username == "Local":
        podman_command = "podman"

    command = "{0} logs {1}".format(podman_command, id)

    logs = subprocess.run("{0}".format(command), shell=True,
                          capture_output=True).stdout.decode('utf-8')

    output = subprocess.run("{0}".format(
        command), shell=True, capture_output=True).stdout.decode('utf-8')

    if len(logs) == 0:
        logs = "There are no logs for this container yet."

    return {'logs': logs}

##############################################################
# REST API
##############################################################

# GET /
@app.route('/api', methods=['GET', 'POST'])
def get_hello():
    return "Podman REST API"

##############################################################
# WebSockets

async_mode = None
socket_ = SocketIO(app, async_mode=async_mode, cors_allowed_origins="*")

@socket_.on('event://update-logs')
def update_logs(data):
    id = data.get('id')
    username = data.get('username')

    logs = podman_logs(username, id)
    logs_data = {}
    logs_data[id] = logs

    emit('event://get-logs', logs_data)

if __name__ == '__main__':
    # app.run(debug=True)
    # app.run()
    socket_.run(app, host=ip_address, debug=True)
