from flask import Flask, request, jsonify
import pandas as pd
from pymongo import MongoClient
from flask_cors import CORS
from datetime import datetime


datetime_now = {"date/time": datetime.now()}
client = MongoClient('mongodb://localhost:27017/')
db = client['RCTS']
collection = db['Raw']
collection2 = db['output']

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

    dbdata = collection.find()
    df1 = pd.DataFrame(list(dbdata))
    df1 = df1.iloc[:,1:]
    unequal_rows = df[~df.isin(df1)].dropna()
    # Print the unequal rows from df1
    if not unequal_rows.empty:
        print("The unequal rows in df1:")
        data = unequal_rows.to_dict('records')
        collection.insert_many(data)
        return {'msg': 'CSV file uploaded successfully', "status": "success"}
    else:
        return {"msg": "Uploaded data already exist", "status": "warning"}

    


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


@app.route('/Output')
def Output_table():
    data = collection.find()
    df = pd.DataFrame(data)
    df = df.iloc[:,1:]
    l = df.to_dict('records')
    if df.empty:
        return jsonify({})
    return jsonify(l)


@app.route('/Graph')
def Graph():
    data = collection.find()
    df = pd.DataFrame(data)
    df = df.iloc[:,1:]
    coll = {}
    if df.empty:
        return jsonify({})
    result = df['Name'].tolist()
    coll['Name']=result
    #Gender data 
    gender_counts = df['Gender'].value_counts()
    temp= pd.DataFrame({'Gender': gender_counts.index, 'gender_count': gender_counts.values})
    temp.sort_values('Gender', ascending=False, inplace=True)
    result = temp.values.tolist()
    result.insert(0,['Gender', 'gender_count'])
    coll['Gender'] = result

    #Age data
    age_count= df['Age'].value_counts()
    temp= pd.DataFrame({'Age': age_count.index, 'age_count': age_count.values})
    temp['Age']=temp['Age'].astype(str)
    temp.sort_values('Age', ascending=False, inplace=True)
    result = temp.values.tolist()
    result.insert(0,['Age', 'age_count'])
    coll['Age'] = result

    #Favaourite animal
    fav_animal_count = df['Favourite animal'].value_counts()
    temp= pd.DataFrame({'Favourite_animal': fav_animal_count.index, 'Favourite_animal_count': fav_animal_count.values})
    temp.sort_values('Favourite_animal', ascending=False, inplace=True)
    result = temp.values.tolist()
    result.insert(0,['Favourite_animal', 'Favourite_animal_count'])
    coll['Favourite animal']=result

    #Favourite Colour
    fav_colour_count = df['Favourite Colour'].value_counts()
    temp= pd.DataFrame({'Favourite_Colour': fav_colour_count.index, 'Favourite_Colour_count': fav_colour_count.values})
    temp.sort_values('Favourite_Colour', ascending=False, inplace=True)
    result = temp.values.tolist()
    result.insert(0,['Favourite Colour', 'Favourite_Colour_count'])
    coll['Favourite Colour']=result

    df_male = df.groupby('Gender').get_group('Male')
    df_female = df.groupby('Gender').get_group('Female')
    anM = df_male['Favourite animal'].value_counts()
    anF = df_female['Favourite animal'].value_counts()
    coM = df_male['Favourite Colour'].value_counts()
    coF = df_female['Favourite Colour'].value_counts()
    l = pd.concat([anM, anF], axis=1).fillna(0)
    l.columns = ['Male','Female']
    l['Male'] = l['Male'].astype(int)
    l['Female'] = l['Female'].astype(int)
    l=l.reset_index()
    result = l.values.tolist()
    result.insert(0,['Favourite_animal', 'Male','Female'])
    coll['Fav_AGC']=result
    l = pd.concat([coM, coF], axis=1).fillna(0)
    l.columns = ['Male','Female']
    l['Male'] = l['Male'].astype(int)
    l['Female'] = l['Female'].astype(int)
    l=l.reset_index()
    result = l.values.tolist()
    result.insert(0,['Favourite_Colour', 'Male','Female'])
    coll['Fav_CGC']=result
    coll['dt']=[datetime.now()]
    collection2.insert_one(coll)
    coll.pop('_id', None)
    return jsonify(coll)

if __name__ == '__main__':
    app.run(debug=True)
