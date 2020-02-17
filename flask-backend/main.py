import flask

app = flask.Flask("__main__")

@app.route("/")
def my_index():
    return flask.render_template("index.html", flask_token="Hello Flask+React")

app.run(debug=True)