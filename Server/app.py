from flask import Flask, request, jsonify
import pandas as pd
from pymongo import MongoClient
from flask_cors import CORS
from datetime import datetime


datetime_now = {"date/time": datetime.now()}
client = MongoClient('mongodb://localhost:27017/')
db = client['RCTS']
collection = db['Raw']

app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = {'csv'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload_csv():
    if 'csv_file' not in request.files:
        return {'msg': 'No file uploaded', "status": "danger"}

    file = request.files['csv_file']
    # if file.filename == '':
    #     return {'msg':'No selected file'}

    if not allowed_file(file.filename):
        return {"msg": 'Invalid file type. Only CSV files are allowed', "status": "danger"}

    df = pd.read_csv(file)

    header = df.columns.tolist()

    if header != ['Name', 'Age', 'Gender', 'Favourite animal', 'Favourite Colour']:
        return {"msg": "Invalid data file", "status": "danger"}

    # Convert the dataframe to a list of dictionaries
    data = df.to_dict('records')
    collection.insert_many(data)

    return {'msg': 'CSV file uploaded successfully', "status": "success"}


@app.route('/Add', methods=['POST'])
def Add_form():
    if request.method == 'POST':
        data = request.get_json()
        if data == {} :
            return {"msg": "Please enter the full from.", "status": "danger"}
        if list(data.keys()) != ['Name', 'Age', 'Gender', 'Favourite animal', 'Favourite Colour']:
            return {"msg": "Invalid data form", "status": "danger"}

        collection.insert_one(data)

        return {"msg": "data inserted into MongoDB", "status": "success"}


if __name__ == '__main__':
    app.run(debug=True)
