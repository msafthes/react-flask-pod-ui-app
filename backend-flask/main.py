from flask import Flask, jsonify, request
from flask_cors import CORS

import subprocess

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
    process = subprocess.run(['echo', 'Trying echo command'],
                             stdout=subprocess.PIPE,
                             universal_newlines=True)
    print("process:")
    print(process.stdout)

    process2 = subprocess.run(['ls'],
                             stdout=subprocess.PIPE,
                             universal_newlines=True)
    print("process2:")
    print(process2.stdout)

    # process3 = subprocess.run(['ls -a'],
    #                          stdout=subprocess.PIPE,
    #                          universal_newlines=True)
    # print("process3:")
    # print(process3.stdout)

    process4 = subprocess.run(['ls', '-a'],
                             stdout=subprocess.PIPE,
                             universal_newlines=True)

    # print("process4: " + process4.stdout)
    # print(type(process4.stdout))
    print("testing" + process4.stdout + "length:" + str(len(process4.stdout)))
    for char in process4.stdout:
        print("char " + str(ord(char)) + " = " + char)

    test = process4.stdout.split()
    test = ' '.join(test)
    print("test: " + test)

    return f"Main Page for Flask Backend, test message: {process.stdout} | ls: {process2.stdout} | ls -a: {process4.stdout} | > done"


# GET /store
@app.route('/store', methods=['GET', 'POST'])
def get_stores_store():
    response = jsonify({'stores': stores})
    return response


app.run(debug=True)
