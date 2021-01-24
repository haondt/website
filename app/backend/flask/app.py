from flask import Flask, request, Response, jsonify
from flask_restful import Resource, Api, abort, reqparse
import subprocess
from subprocess import check_output
import uuid
import os
import datetime


class AsciiHandler():
	d = '/projects/ascii-art'
	def test(self):
		#return subprocess.call(['python','main.py','-h'], cwd=self.d)
		#return check_output(['ls','-lha', dir_path], cwd=self.d).decode('ascii')
		return check_output(['python','main.py','-h'], cwd=self.d).decode('ascii')

class FileManager():
	dir_path = None
	def __init__(self, dir_path):
		self.dir_path = dir_path

	def add_file(self, f):
		ext = f.filename.rsplit('.',1)[1].lower()
		_id = str(uuid.uuid1())
		path = os.path.join(self.dir_path, _id + '.' + ext)
		exp = datetime.datetime.now() + datetime.timedelta(minutes=15)
		f.save(path)
		return _id
	
class AsciiDemo(Resource):
	ALLOWED_EXTENSIONS = [
		'png',
		'jpg'
		]
	fm = None
	ah = None

	def __init__(self, fileManager, asciiHandler):
		self.fm = fileManager
		self.ah = asciiHandler

	def allowed_file(self, filename):
		return '.' in filename and filename.rsplit('.',1)[1].lower() in self.ALLOWED_EXTENSIONS

	def get(self):
		return Response(AsciiHandler().test())

	def post(self):
		if 'file' not in request.files:
			return Response(str(list(request.files)))
			return Response(str(list(request.values.keys())))
			return Response("No file part", status=400)
		f = request.files['file']
		if f.filename == '':
			return Response('No selected file', status=400)
		if f and self.allowed_file(f.filename):
			_id = self.fm.add_file(f)
			return Response(_id, status=200)
		return Response("Unable to download file", status=500)


	def delete(self):
		return "DELETE"

# App setup
app = Flask(__name__)
dir_path = os.path.dirname(os.path.realpath(__file__))
api = Api(app)
fm = FileManager(dir_path)
ah = AsciiHandler()

# Route views
api.add_resource(AsciiDemo, "/api/ascii-demo/", resource_class_kwargs={
	'fileManager': fm,
	'asciiHandler': ah
})

# Run app
if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=8000)
