# Combined Application
A combined version of the application where Backend Flask serves a built React application.<br />
The branch is `combined-flask-react`<br />
# Running Combined Application
To run the combined application make sure you have Python Virtual Environment installed.<br />
For example: `install python3.7-venv`<br />
Run this command in backend-venv folder to install all required Python dependencies:<br />
### `python3.7 -m pip install -r requirements.txt`
Run this command in backend-venv folder to start the Virtual Environment:<br />
### `source backend-venv/bin/activate`
Run this command in backend-venv folder to start the Flask Python Backend server:<br />
### `python3.7 main.py`
The Frontend React project is pre-built and served through Flask.<br /><br />

# Running Separately (Development Environment)
The Backend Flask Server part works the same way as described above. (again in backend-venv folder)<br />
The branch is `latest`<br />
Once you have it ready and the server is running, go to `frontend-react` folder and run:<br />
### `npm install`<br />
### `npm start`<br />
This will start a React application that communicates with the Flask server separately<br />