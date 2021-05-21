import unittest
from unittest.mock import patch
from unittest.mock import Mock, MagicMock

from main import app
from endpoints.volumes import podman_volumes
from tests.mocks import *


# Tests for the VOLUMES Endpoints
class VolumesTests(unittest.TestCase):
    def test_podman_volumes_success(self):
        self.maxDiff = None
        expected = {"volumes": [{ "Name": "test1", "Driver": "local", "Mountpoint": "/home/msafpc/.local/share/containers/storage/volumes/test1/_data", "CreatedAt": "2021-04-21T19:07:42.648999442+02:00", "Labels": {}, "Scope": "local", "Options": {} }]}
        Output.stdout = [{
            "Name": "test1",
            "Driver": "local",
            "Mountpoint": "/home/msafpc/.local/share/containers/storage/volumes/test1/_data",
            "CreatedAt": "2021-04-21T19:07:42.648999442+02:00",
            "Labels": {},
            "Scope": "local",
            "Options": {}
        }]
        Output.stderr = ""
        Output.returncode = 0
        with patch('subprocess.run', Mock(return_value=Output)),\
            patch('endpoints.volumes.json', MockedJson()):
            volumes, error = podman_volumes("Local")
            self.assertEqual(volumes, expected)
    
    def test_podman_volumes_error(self):
        [{
        "Name": "test1",
        "Driver": "local",
        "Mountpoint": "/home/msafpc/.local/share/containers/storage/volumes/test1/_data",
        "CreatedAt": "2021-04-21T19:07:42.648999442+02:00",
        "Labels": {},
        "Scope": "local",
        "Options": {}
        }]
        expected = {}
        Output.stdout = ""
        Output.stderr = "ERROR"
        Output.returncode = 1
        with patch('subprocess.run', Mock(return_value=Output)):
            volumes, error = podman_volumes("Local")
            self.assertEqual(volumes, expected)
    
    def test_volumes_get_success(self):
        expected = {"volumes": [{ "Name": "test1", "Driver": "local", "Mountpoint": "/home/msafpc/.local/share/containers/storage/volumes/test1/_data", "CreatedAt": "2021-04-21T19:07:42.648999442+02:00", "Labels": {}, "Scope": "local", "Options": {} }]}
        volumes_output = (expected, "")
        with patch('endpoints.volumes.podman_volumes', Mock(return_value=volumes_output)):
            response = app.test_client(self).get("/api/volumes")
            result = response.json
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_volumes_get_error(self):
        volumes_output = ([], "ERROR")
        with patch('endpoints.volumes.podman_volumes', Mock(return_value=volumes_output)):
            response = app.test_client(self).get("/api/volumes")
            status = response.status_code
            self.assertEqual(status, ERROR)
    
    def test_volumes_create_success(self):
        expected = {"volumes": [{ "Name": "test1", "Driver": "local", "Mountpoint": "/home/msafpc/.local/share/containers/storage/volumes/test1/_data", "CreatedAt": "2021-04-21T19:07:42.648999442+02:00", "Labels": {}, "Scope": "local", "Options": {} }]}
        volumes_output = (expected, "")
        Output.stderr = ""
        Output.returncode = 0

        with patch('endpoints.volumes.podman_volumes', Mock(return_value=volumes_output)), \
            patch('endpoints.volumes.subprocess.run', Mock(return_value=Output)), \
            patch('endpoints.volumes.request', MagicMock(return_value=["123456"])):
            response = app.test_client(self).post("/api/volumes/create")
            result = response.json
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_volumes_create_error(self):
        expected = "ERROR"
        volumes_output = (expected, "")
        Output.stderr = "ERROR"
        Output.returncode = 1
        
        with patch('endpoints.volumes.podman_volumes', Mock(return_value=volumes_output)),\
            patch('endpoints.volumes.subprocess.run', Mock(return_value=Output)),\
            patch('endpoints.volumes.request', MockedRequest()):
            response = app.test_client(self).post("/api/volumes/create")
            result = response.data.decode('utf-8')
            status = response.status_code
            self.assertEqual(status, ERROR)
            self.assertEqual(result, expected)
    
    def test_volumes_remove_success(self):
        expected = {"volumes": [{ "Name": "test1", "Driver": "local", "Mountpoint": "/home/msafpc/.local/share/containers/storage/volumes/test1/_data", "CreatedAt": "2021-04-21T19:07:42.648999442+02:00", "Labels": {}, "Scope": "local", "Options": {} }]}
        volumes_output = (expected, "")
        Output.stderr = ""
        Output.returncode = 0

        with patch('endpoints.volumes.podman_volumes', Mock(return_value=volumes_output)), \
            patch('endpoints.volumes.subprocess.run', Mock(return_value=Output)), \
            patch('endpoints.volumes.request', MagicMock(return_value=["123456"])):
            response = app.test_client(self).delete("/api/volumes")
            result = response.json
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_volumes_remove_error(self):
        expected = "ERROR"
        volumes_output = (expected, "")
        Output.stderr = "ERROR"
        Output.returncode = 1
        
        with patch('endpoints.volumes.podman_volumes', Mock(return_value=volumes_output)),\
            patch('endpoints.volumes.subprocess.run', Mock(return_value=Output)),\
            patch('endpoints.volumes.request', MockedRequest()):
            response = app.test_client(self).delete("/api/volumes")
            result = response.data.decode('utf-8')
            status = response.status_code
            self.assertEqual(status, ERROR)
            self.assertEqual(result, expected)
