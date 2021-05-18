import unittest
from unittest.mock import patch
from unittest.mock import Mock, MagicMock

from main import app
from endpoints.containers import podman_ps
from tests.mocks import *


# CONTAINERS
class ContainersTests(unittest.TestCase):
    def test_podman_ps_success(self):
        expected = {"containers": [{'containerId': "54a48d41f6d9", 'image': "registry.fedoraproject.org/f29/httpd:latest", 'command': "/usr/bin/run-http...", 'created': "2 minutes ago", 'ports': "0.0.0.0:8080->8080/tcp", 'names': "laughing_bassi", 'status': "Running"}]}
        Output.stdout = "54a48d41f6d9#registry.fedoraproject.org/f29/httpd:latest#/usr/bin/run-http...#2 minutes ago#0.0.0.0:8080->8080/tcp#laughing_bassi#Running\n"
        Output.stderr = ""
        with patch('subprocess.run', Mock(return_value=Output)):
            containers, error = podman_ps("Local")
            self.assertEqual(containers, expected)
    
    def test_podman_ps_error(self):
        expected = []
        Output.stdout = ""
        Output.stderr = "ERROR"
        with patch('subprocess.run', Mock(return_value=Output)):
            containers, error = podman_ps("Local")
            self.assertEqual(containers, expected)
    
    def test_get_containers_success(self):
        expected = {"containers": [{'containerId': "54a48d41f6d9", 'image': "registry.fedoraproject.org/f29/httpd:latest", 'command': "/usr/bin/run-http...", 'created': "2 minutes ago", 'ports': "0.0.0.0:8080->8080/tcp", 'names': "laughing_bassi", 'status': "Running"}]}
        containers_output = (expected, "")
        with patch('endpoints.containers.podman_ps', Mock(return_value=containers_output)):
            response = app.test_client(self).get("/api/containers")
            result = response.json
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_get_containers_error(self):
        containers_output = ([], "ERROR")
        with patch('endpoints.containers.podman_ps', Mock(return_value=containers_output)):
            response = app.test_client(self).get("/api/containers")
            status = response.status_code
            self.assertEqual(status, ERROR)
    
    def test_remove_containers_success(self):
        expected = {"containers": []}
        containers_output = (expected, "")
        Output.stderr = ""

        with patch('endpoints.containers.podman_ps', Mock(return_value=containers_output)), \
            patch('endpoints.containers.subprocess.run', Mock(return_value=Output)), \
            patch('endpoints.containers.request', MagicMock(return_value=["123456"])):
            response = app.test_client(self).delete("/api/containers")
            result = response.json
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_remove_containers_error(self):
        expected = "ERROR"
        containers_output = (expected, "")
        Output.stderr = "ERROR"
        
        with patch('endpoints.containers.podman_ps', Mock(return_value=containers_output)),\
            patch('endpoints.containers.subprocess.run', Mock(return_value=Output)),\
            patch('endpoints.containers.request', MockedRequest()):
            response = app.test_client(self).delete("/api/containers")
            result = response.data.decode('utf-8')
            status = response.status_code
            self.assertEqual(status, ERROR)
            self.assertEqual(result, expected)

    def test_containers_stop_success(self):
        expected = {"containers": []}
        containers_output = (expected, "")
        Output.stderr = ""

        with patch('endpoints.containers.podman_ps', Mock(return_value=containers_output)), \
            patch('endpoints.containers.subprocess.run', Mock(return_value=Output)), \
            patch('endpoints.containers.request', MagicMock(return_value=["123456"])):
            response = app.test_client(self).post("/api/containers/stop")
            result = response.json
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_containers_stop_error(self):
        expected = "ERROR"
        containers_output = (expected, "")
        Output.stderr = "ERROR"
        
        with patch('endpoints.containers.podman_ps', Mock(return_value=containers_output)),\
            patch('endpoints.containers.subprocess.run', Mock(return_value=Output)),\
            patch('endpoints.containers.request', MockedRequest()):
            response = app.test_client(self).post("/api/containers/stop")
            result = response.data.decode('utf-8')
            status = response.status_code
            self.assertEqual(status, ERROR)
            self.assertEqual(result, expected)

    def test_containers_kill_success(self):
        expected = {"containers": []}
        containers_output = (expected, "")
        Output.stderr = ""

        with patch('endpoints.containers.podman_ps', Mock(return_value=containers_output)), \
            patch('endpoints.containers.subprocess.run', Mock(return_value=Output)), \
            patch('endpoints.containers.request', MagicMock(return_value=["123456"])):
            response = app.test_client(self).post("/api/containers/kill")
            result = response.json
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_containers_kill_error(self):
        expected = "ERROR"
        containers_output = (expected, "")
        Output.stderr = "ERROR"
        
        with patch('endpoints.containers.podman_ps', Mock(return_value=containers_output)),\
            patch('endpoints.containers.subprocess.run', Mock(return_value=Output)),\
            patch('endpoints.containers.request', MockedRequest()):
            response = app.test_client(self).post("/api/containers/kill")
            result = response.data.decode('utf-8')
            status = response.status_code
            self.assertEqual(status, ERROR)
            self.assertEqual(result, expected)
    
    def test_container_run_success(self):
        expected = {"containers": []}
        containers_output = (expected, "")
        Output.stderr = ""

        with patch('endpoints.containers.podman_ps', Mock(return_value=containers_output)), \
            patch('endpoints.containers.subprocess.run', Mock(return_value=Output)), \
            patch('endpoints.containers.request', MagicMock(return_value=["123456"])):
            response = app.test_client(self).post("/api/containers/run")
            result = response.json
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_container_run_error(self):
        expected = "ERROR"
        containers_output = (expected, "")
        Output.stderr = "ERROR"
        
        with patch('endpoints.containers.podman_ps', Mock(return_value=containers_output)),\
            patch('endpoints.containers.subprocess.run', Mock(return_value=Output)),\
            patch('endpoints.containers.request', MockedRequest()):
            response = app.test_client(self).post("/api/containers/run")
            result = response.data.decode('utf-8')
            status = response.status_code
            self.assertEqual(status, ERROR)
            self.assertEqual(result, expected)
