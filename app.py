from flask import Flask, render_template, jsonify, send_file, send_from_directory
import requests
from datetime import datetime
from scipy.stats import norm
import statistics
import os
import io
import base64
import matplotlib.pyplot as plt
import matplotlib
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)


#@app.route('/favicon.ico')
#def favicon():
#    return send_from_directory('static', 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
