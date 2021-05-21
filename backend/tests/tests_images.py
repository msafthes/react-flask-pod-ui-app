import unittest
from unittest.mock import patch
from unittest.mock import Mock, MagicMock

from main import app
from endpoints.images import podman_images
from tests.mocks import *


# Tests for the IMAGES Endpoints
class ImagesTests(unittest.TestCase):
    def test_podman_images_success(self):
        # Expected Result
        expected = {'images': [{'repository': 'docker.io/library/nginx', 'tag': 'latest', 'id': '62d49f9bab67', 'created': '3 weeks ago', 'size': '137 MB'}]}
        # Mocked Output
        Output.stdout = "docker.io/library/nginx#latest#62d49f9bab67#3 weeks ago#137 MB\ndocker.io/library/busybox#latest#491198851f0c#2 months ago#1.45 MB"
        Output.stderr = ""
        Output.returncode = 0
        # Mock, Call, Assert
        with patch('subprocess.run', Mock(return_value=Output)):
            images, error = podman_images("Local")
            self.assertEqual(images, expected)


    def test_podman_images_error(self):
        expected = []
        Output.stdout = ""
        Output.stderr = "ERROR"
        Output.returncode = 1
        with patch('subprocess.run', Mock(return_value=Output)):
            images, error = podman_images("Local")
            self.assertEqual(images, expected)
    
    def test_get_images_success(self):
        expected = {'images': [{'repository': 'docker.io/library/nginx', 'tag': 'latest', 'id': '62d49f9bab67', 'created': '3 weeks ago', 'size': '137 MB'}]}
        images_output = (expected, "")
        with patch('endpoints.images.podman_images', Mock(return_value=images_output)):
            response = app.test_client(self).get("/api/images")
            result = response.json
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_get_images_error(self):
        images_output = ([], "ERROR")
        with patch('endpoints.images.podman_images', Mock(return_value=images_output)):
            response = app.test_client(self).get("/api/images")
            status = response.status_code
            self.assertEqual(status, ERROR)
    
    def test_remove_images_success(self):
        expected = {"images": []}
        images_output = (expected, "")
        Output.stderr = ""
        Output.returncode = 0

        with patch('endpoints.images.podman_images', Mock(return_value=images_output)), \
            patch('endpoints.images.subprocess.run', Mock(return_value=Output)), \
            patch('endpoints.images.request', MagicMock(return_value=["123456"])):
            response = app.test_client(self).delete("/api/images")
            result = response.json
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_remove_images_error(self):
        expected = "ERROR"
        images_output = (expected, "")
        Output.stderr = "ERROR"
        Output.returncode = 1
        
        with patch('endpoints.images.podman_images', Mock(return_value=images_output)),\
            patch('endpoints.images.subprocess.run', Mock(return_value=Output)),\
            patch('endpoints.images.request', MockedRequest()):
            response = app.test_client(self).delete("/api/images")
            result = response.data.decode('utf-8')
            status = response.status_code
            self.assertEqual(status, ERROR)
            self.assertEqual(result, expected)
    
    def test_prune_images_success(self):
        expected = {"images": []}
        images_output = (expected, "")
        Output.stderr = ""
        Output.returncode = 0
        
        with patch('endpoints.images.podman_images', Mock(return_value=images_output)), \
            patch('endpoints.images.subprocess.run', Mock(return_value=Output)), \
            patch('endpoints.images.request', MagicMock(return_value=["123456"])):
            response = app.test_client(self).delete("/api/images/prune")
            result = response.json
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_prune_images_error(self):
        expected = "ERROR"
        images_output = (expected, "")
        Output.stderr = "ERROR"
        Output.returncode = 1
        
        with patch('endpoints.images.podman_images', Mock(return_value=images_output)),\
            patch('endpoints.images.subprocess.run', Mock(return_value=Output)),\
            patch('endpoints.images.request', MockedRequest()):
            response = app.test_client(self).delete("/api/images/prune")
            result = response.data.decode('utf-8')
            status = response.status_code
            self.assertEqual(status, ERROR)
            self.assertEqual(result, expected)

    def test_images_pull_success(self):
        expected = {"images": []}
        images_output = (expected, "")
        Output.stderr = ""
        Output.returncode = 0
        
        with patch('endpoints.images.podman_images', Mock(return_value=images_output)), \
            patch('endpoints.images.subprocess.run', Mock(return_value=Output)), \
            patch('endpoints.images.request', MagicMock(return_value=["123456"])):
            response = app.test_client(self).post("/api/images/pull")
            result = response.json
            status = response.status_code
            self.assertEqual(status, SUCCESS)
            self.assertEqual(result, expected)
    
    def test_images_pull_error(self):
        expected = "ERROR"
        images_output = (expected, "")
        Output.stderr = "ERROR"
        Output.returncode = 1
        
        with patch('endpoints.images.podman_images', Mock(return_value=images_output)),\
            patch('endpoints.images.subprocess.run', Mock(return_value=Output)),\
            patch('endpoints.images.request', MockedRequest()):
            response = app.test_client(self).post("/api/images/pull")
            result = response.data.decode('utf-8')
            status = response.status_code
            self.assertEqual(status, ERROR)
            self.assertEqual(result, expected)
