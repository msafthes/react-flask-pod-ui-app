import unittest
from unittest.mock import patch
from unittest.mock import Mock, MagicMock

from main import app
from tests.mocks import *


# Tests for the CONNECTIONS Endpoints
class ConnectionsTests(unittest.TestCase):
    def test_connections_key_get_success(self):
        Output.stdout = "123456"
        Output.stderr = ""
        Output.returncode = 0
        expected = {"sshKey": "123456"}
        with patch('endpoints.connections.subprocess.run', Mock(return_value=Output)):
            response = app.test_client(self).get("/api/connections/key")
            result = response.json
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_connections_key_get_error(self):
        Output.stdout = ""
        Output.stderr = "ERROR"
        Output.returncode = 1
        expected = "ERROR"
        with patch('endpoints.connections.subprocess.run', Mock(return_value=Output)):
            response = app.test_client(self).get("/api/connections/key")
            status = response.status_code
            self.assertEqual(status, ERROR)
    
    def test_connections_add_success(self):
        expected = "success"
        Output.stderr = ""
        Output.returncode = 0

        with patch('endpoints.connections.subprocess.run', Mock(return_value=Output)), \
            patch('endpoints.connections.request', MockedRequestConnections()),\
            patch('endpoints.connections.json', MockedJson()):
            response = app.test_client(self).post("/api/connections")
            result = response.data.decode('utf-8')
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_cconnections_add_error(self):
        expected = "ERROR"
        Output.stderr = "ERROR"
        Output.returncode = 1
        
        with patch('endpoints.connections.subprocess.run', Mock(return_value=Output)),\
            patch('endpoints.connections.request', MockedRequestConnections()),\
            patch('endpoints.connections.json', MockedJson()):
            response = app.test_client(self).post("/api/connections")
            result = response.data.decode('utf-8')
            status = response.status_code
            self.assertEqual(status, ERROR)
            self.assertEqual(result, expected)

    def test_connections_remove_success(self):
        expected = "success"
        Output.stderr = ""
        Output.returncode = 0

        with patch('endpoints.connections.subprocess.run', Mock(return_value=Output)), \
            patch('endpoints.connections.request', MockedRequestConnections()),\
            patch('endpoints.connections.json', MockedJson()):
            response = app.test_client(self).delete("/api/connections")
            result = response.data.decode('utf-8')
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_cconnections_remove_error(self):
        expected = "ERROR"
        Output.stderr = "ERROR"
        Output.returncode = 1
        
        with patch('endpoints.connections.subprocess.run', Mock(return_value=Output)),\
            patch('endpoints.connections.request', MockedRequestConnections()),\
            patch('endpoints.connections.json', MockedJson()):
            response = app.test_client(self).delete("/api/connections")
            result = response.data.decode('utf-8')
            status = response.status_code
            self.assertEqual(status, ERROR)
            self.assertEqual(result, expected)
    
    def test_connections_activate_success(self):
        expected = "success"
        Output.stderr = ""
        Output.returncode = 0

        with patch('endpoints.connections.subprocess.run', Mock(return_value=Output)), \
            patch('endpoints.connections.request', MockedRequestConnections()),\
            patch('endpoints.connections.json', MockedJson()):
            response = app.test_client(self).post("/api/connections/activate")
            result = response.data.decode('utf-8')
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_cconnections_activate_error(self):
        expected = "ERROR"
        Output.stderr = "ERROR"
        Output.returncode = 1
        
        with patch('endpoints.connections.subprocess.run', Mock(return_value=Output)),\
            patch('endpoints.connections.request', MockedRequestConnections()),\
            patch('endpoints.connections.json', MockedJson()):
            response = app.test_client(self).post("/api/connections/activate")
            result = response.data.decode('utf-8')
            status = response.status_code
            self.assertEqual(status, ERROR)
            self.assertEqual(result, expected)
