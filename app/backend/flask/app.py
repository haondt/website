from flask import Flask, request, Response, jsonify
from flask_restful import Resource, Api, abort, reqparse
import subprocess

# App setup
app = Flask(__name__)
api = Api(app)

class AsciiHandler():
	d = '/projects/ascii-art'
	def test(self):
		return subprocess.call(['python','main.py','-h'], cwd=self.d)
		

class Test(Resource):
	def get(self):
		return AsciiHandler().test()

	def put(self):
		return "PUT"

	def post(self):
		return "POST"

	def delete(self):
		return "DELETE"

# Route views
api.add_resource(Test, "/api/test/")

# Run app
if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=8000)
