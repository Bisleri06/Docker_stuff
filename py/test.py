from flask import Flask,request
import os

app = Flask(__name__)
 
@app.route('/')
def hello_world():
    a=request.remote_addr
    return "{} {} {}".format("Hello",str(a),str(os.environ["SEKRUT"]))
 
if __name__ == '__main__':
    app.run(host="0.0.0.0",port=5000,debug=True)