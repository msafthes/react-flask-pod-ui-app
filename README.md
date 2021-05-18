# Podman UI Application

`React` Frontend + `Flask` Backend<br  />
There are 2 ways of running the application:
1) `Production`: Combined Application where Frontend is served by Flask
2) `Development`: Separate Frontend and Backend

Below you can find instructions to run the application in either of the 2 modes.

Link to the GitHub repository:<br/>https://github.com/msafthes/react-flask-pod-ui-app

## Podman Configuration
`Podman` is recommended to be set up as `Rootless`.
### as a User
1. Make sure you have a Podman Service running on your machine. You can verify that the socket is listening with Podman command: `podman --remote info`
2. In order for the Podman client to communicate with the server you need to enable and start the SSH daemon on your Linux machine, if it is not currently enabled. You will be adding an SSH key to your authorized keys. The frontend application gives you the key when you are adding a new remote connection.

### as a Host
1. You need to generate an SSH key `~/.ssh/id_rsa.pub`. This key is sent to the application user while creating a remote connection.

For more information, see the following links:<br/>
Podman Remote setup for Linux:<br/>https://github.com/containers/podman/blob/master/docs/tutorials/remote_client.md
Podman Remote setup for macOS and Windows:<br/>https://github.com/containers/podman/blob/master/docs/tutorials/mac_win_client.md
Running Podman Service:<br/>https://www.redhat.com/sysadmin/podmans-new-rest-api?extIdCarryOver=true
Podman-remote documentation:<br/>https://github.com/containers/podman/blob/master/docs/source/markdown/podman-remote.1.md

## Python
`Python` version should be `3.7` or higher.

## Configuration Files
`frontend/src/config.tsx` is a configuration file for Frontend. It contains `API_BASE` variable which holds the IP address for the REST API (`localhost:5000/api` by default). `WS_BASE` which holds the IP address for the WebSocket (`localhost:5000` by default). Similarly, for Backend in `main.py` there is a `ip_address` variable (`localhost` by default). These values can be modified as needed based on the host server. Note that the configuration allows the frontend and backend to be run separately on different hosts.

# Production: Combined Application
In `backend` folder there is `requirements.txt` file which contains a list of all required Python dependencies. To run the application you either need to have all of the dependencies already installed on your system or create a `Virtual Environment` and with activated Virtual Environment and in the `backend` folder, use the Python `pip` command:<br/>
### `python -m pip install -r requirements.txt`

Example of installing and creating a Virtual Environment (adjust the commands according to your Operating System): 

`sudo apt install python-venv` => to install Python Virtual Environment<br  />
`python -m venv app_venv` => to create a folder named "app-venv" with the environment<br  />
`source app_venv/bin/activate` => to activate the Virtual Environment

In the `backend` folder run this command to start the Flask Server:<br  />

### `python main.py`

The Frontend React project is pre-built and served through Flask. All you need to do is set up the address to your Backend Server where your application is running
in the `src/config.tsx` file (you can also find examples there). After that, run `npm run build` to apply your updated addresses.
(If you want to make changes to the Frontend application and see it in this combined application, you need to run `npm run build` in the `frontend` folder. If you want to have a Hot Reload feature while making the changes, use the Separate version of the application according to the instructions below.)

# Development: Separate Applications
The Backend Flask Server part works the same way as described above so make sure you have everything set up as described in the instructions for the "Combined" application.<br  />

Once you have it ready and the server is successfully running, go to `frontend` folder and run:<br  />

### `npm install`<br />

### `npm start`<br />

(You do not need to run the Flask Server before running `npm install` and `npm start` but it is recommended the first time you are setting it up to make sure the server is working correctly.)

This will start a React application that communicates with the Flask server separately<br  />

# Documentation

## Backend

### REST API
Full REST API documentation for all Endpoints was created in Swagger<br/>https://app.swaggerhub.com/apis/M1362/Podman-UI/1.0.0<br/>It also contains examples of input parameters, returned results, as well as the objects that are used in the application such as Images, Containers, Volumes, and Connections.
### Backend Structure
Here is a quick summary of the backend project structure and the meaning of its contents.
`requirements.txt` = contains all Python dependencies used in this application.
`main.py` = contains Flask application setup, routing, and WebSocket functionality.
`endpoints` = contains all implementation of all REST API Endpoints.
`templates` = contains index.html file that was built from frontend and is rendered by Flask application.
`static` = contains all files required for frontend.
`tests` = contains all unit test files and a `mock.py` file for mocking functions, objects, and classes.

## Frontend
x

## Tests
Frontend tests can be run in the `frontend` folder by executing `npm test` command.<br/>The tests cover some basic rendering as well as basic user interaction (for example clicking a button).

Backend tests can be run in the `backend` foldery by executing `python -m unittest` command.<br/>The tests cover basic success and error tests for each endpoint.