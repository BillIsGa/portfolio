from flask import Flask, render_template, jsonify, send_file, send_from_directory
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

