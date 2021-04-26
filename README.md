# Podman UI Application

`React` Frontend + `Flask` Backend<br  />
There are 2 ways of running the application:
1) `Production`: Combined Application where Frontend is served by Flask
2) `Development`: Separate Frontend and Backend

Below you can find instructions to run the application in either of the 2 modes.

# Production: Combined Application
In `flask-backend` folder there is `requirements.txt` file which contains a list of all required Python dependencies. To run the application you either need to have all of the dependencies already installed on your system or create a `Virtual Environment` and with activated Virtual Environment and in the `flask-backend` folder, use the Python `pip` command:<br/>
### `python -m pip install -r requirements.txt`

Example of installing and creating a Virtual Environment (adjust the commands according to your Operating System): 

`sudo apt install python-venv` => to install Python Virtual Environment<br  />
`python -m venv app-venv` => to create a folder named "app-venv" with the environment<br  />
`source app-venv/bin/activate` => to activate the Virtual Environment

In the `flask-backend` folder run this command to start the Flask Server:<br  />

### `python main.py`

The Frontend React project is pre-built and served through Flask. All you need to do is set up the address to your Backend Server where your application is running
in the `src/config.tsx` file (you can also find examples there). After that, run `npm run build` to apply your updated addresses.
(If you want to make changes to the Frontend application and see it in this combined application, you need to run `npm run build` in the `react-app` folder. If you want to have a Hot Reload feature while making the changes, use the Separate version of the application according to the instructions below.)

# Development: Separate Applications
The Backend Flask Server part works the same way as described above so make sure you have everything set up as described in the instructions for the "Combined" application.<br  />

Once you have it ready and the server is successfully running, go to `react-app` folder and run:<br  />

### `npm install`<br />

### `npm start`<br />

(You do not need to run the Flask Server before running `npm install` and `npm start` but it is recommended the first time you are setting it up to make sure the server is working correctly.)

This will start a React application that communicates with the Flask server separately<br  />