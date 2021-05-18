# Mock Objects/Classes to simulate an objects that can be accessed with the dot notation, just like the output
# generated by the subprocess.run method (.stdout, .stderr)
# The other Mocked classes are necessary to simulate getting an HTTP request and get its JSON data.

class Output:
            stdout = ""
            stderr = ""

class MockedGet:
    def get(self, something):
        return ["123456"]

class MockedRequest:
    headers = MockedGet()
    def get_json(self):
        return MockedGet()

class MockedGetConnections:
    def get(self, something):
        return {'username': 'username', 'ip': 'ip', 'podmanSocketPath': 'podmanSocketPath'}

class MockedRequestConnections:
    headers = MockedGetConnections()
    def get_json(self):
        return MockedGetConnections()

class MockedJson:
    def loads(self, something):
        return something

# These are constants to avoid mistakes when checking for specific status codes
SUCCESS = 200
ERROR = 400
