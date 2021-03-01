from flask import Flask, jsonify, request
from flask_cors import CORS

import subprocess

import json

from flask_socketio import SocketIO, emit, disconnect

# API Endpoints
from images import images_api
from containers import containers_api
from volumes import volumes_api

app = Flask("__main__")
CORS(app)

app.register_blueprint(images_api)
app.register_blueprint(containers_api)
app.register_blueprint(volumes_api)


##############################################################
# Functions
##############################################################
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


##############################################################
# REST API
##############################################################

# GET /
@app.route('/', methods=['GET', 'POST'])
def get_hello():
    return "Podman REST API"

##############################################################
# WebSockets

async_mode = None
# socket_ = SocketIO(app, async_mode=async_mode, cors_allowed_origins="*")
socket_ = SocketIO(app, async_mode=async_mode, cors_allowed_origins=["http://localhost:3000"])
# socketio.init_app(app, cors_allowed_origins=["http://localhost:3000", "https://your-production-domain.com"])

@socket_.on('event://update-logs')
def update_logs(data):
    print('update_logs()')
    print("DATA:")
    print(data)

    id = data.get('id')
    logs = podman_logs(id)
    logs_data = {}
    logs_data[id] = logs
    emit('event://get-logs', logs_data)

if __name__ == '__main__':
    # app.run()
    socket_.run(app, debug=True)
