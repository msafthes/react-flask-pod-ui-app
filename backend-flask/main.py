from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask("__main__")
CORS(app)


stores = [
    {
        'name': 'My Testing Store',
        'items': [
            {
                'name': 'chocolate',
                'price': 15.99,
                'liked': True
            }
        ]
    }
]

# GET /
@app.route('/', methods=['GET', 'POST'])
def get_stores():
    return "Main Page for Flask Backend, test message"

# GET /store
@app.route('/store', methods=['GET', 'POST'])
def get_stores_store():
    response = jsonify({'stores': stores})
    return response


app.run(debug=True)
