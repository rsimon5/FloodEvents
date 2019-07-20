from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_flood

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
mongo=PyMongo(app)

@app.route("/")
def home():
    flood_info = mongo.db.flood_info.find_one()

    return render_template("index.html", flood_info=flood_info)

@app.route("/scrape")
def scrape():
    flood_info = mongo.db.flood_info
    flood_data = scrape_flood.scrape_image()
    flood_info.update({}, flood_data, upsert=True)
    
    return redirect("/", code=302)

if __name__ == "__main__": 
    app.run(debug= True)