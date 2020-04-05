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
    # process = subprocess.run(['echo', 'Trying echo command'],
    #                          stdout=subprocess.PIPE,
    #                          universal_newlines=True)
    # print("process:")
    # print(process.stdout)

    # process2 = subprocess.run(['ls'],
    #                           stdout=subprocess.PIPE,
    #                           universal_newlines=True)
    # print("process2:")
    # print(process2.stdout)

    # # process3 = subprocess.run(['ls -a'],
    # #                          stdout=subprocess.PIPE,
    # #                          universal_newlines=True)
    # # print("process3:")
    # # print(process3.stdout)

    # process4 = subprocess.run(['ls', '-a'],
    #                           stdout=subprocess.PIPE,
    #                           universal_newlines=True)

    # # print("process4: " + process4.stdout)
    # # print(type(process4.stdout))
    # print("testing" + process4.stdout + "length:" + str(len(process4.stdout)))
    # for char in process4.stdout:
    #     print("char " + str(ord(char)) + " = " + char)

    # test = process4.stdout.split()
    # test = ' '.join(test)
    # print("test: " + test)

    process4 = subprocess.run(['podman', 'images --format "{{.Repository}} {{.Tag}} {{.ID}} {{.Created}} {{.Size}}|"'],
                              stdout=subprocess.PIPE,
                              universal_newlines=True)

    podman_images = process4.stdout.split()
    podman_images = ' '.join(podman_images)
    print("podman_images: " + podman_images)

    # return f"Main Page for Flask Backend, test message: {process.stdout} | ls: {process2.stdout} | ls -a: {process4.stdout} | podman images: {podman_images} > done"

    test_images_output = "REPOSITORY TAG IMAGE ID CREATED SIZE docker.io/library/nginx latest 6678c7c2e56c 4 weeks ago 131 MB docker.io/library/alpine latest e7d92cdc71fe 2 months ago 5.86 MB | podman images: REPOSITORY TAG IMAGE ID CREATED SIZE docker.io/library/nginx latest 6678c7c2e56c 4 weeks ago 131 MB docker.io/library/alpine latest e7d92cdc71fe 2 months ago 5.86 MB"
    images_info = test_images_output
    # images_info = test_images_output.split("SIZE ")[1]

    # REPOSITORY    TAG      IMAGE ID    CREATED    SIZE
    # podman images --format "{{.Repository}} {{.Tag}} {{.ID}} {{.Created}} {{.Size}}|"
    # podman images --format "{{}}"

    return f"Info: {images_info} END"


# GET /store
@app.route('/store', methods=['GET', 'POST'])
def get_stores_store():
    response = jsonify({'stores': stores})
    return response


app.run(debug=True)
