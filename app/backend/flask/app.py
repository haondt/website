from flask import Flask, request, Response, jsonify
from flask_restful import Resource, Api, abort, reqparse
import subprocess
from subprocess import check_output
import uuid
import os


class AsciiHandler():
	d = '/projects/ascii-art'
	def list_files(self):
		return check_output(['ls','-lha', dir_path], cwd=self.d).decode('utf-8')
	def generate_output(self, path, width, braille, invert):
		command = ['python', 'main.py', '-i', path, '-w', str(width)] 
		# TODO: crash vulnerability
		if braille:
			command.append('-b')
		else:
			command.append('-A')
		if invert:
			command.append('-I')
		
		return check_output(command, cwd=self.d).decode('utf-8')


class AsciiDemo(Resource):
	ALLOWED_EXTENSIONS = [
		'png',
		'jpg'
		]
	ah = None
	dir_path = None

	def __init__(self, asciiHandler, dir_path):
		self.ah = asciiHandler
		self.dir_path = dir_path

	def allowed_file(self, filename):
		return '.' in filename and filename.rsplit('.',1)[1].lower() in self.ALLOWED_EXTENSIONS

	def post(self):
		if 'file' not in request.files:
			return Response("No file part", status=400)
		f = request.files['file']
		if f.filename == '':
			return Response('No selected file', status=400)
		if f and self.allowed_file(f.filename):
			return self.create_art(f)
		return Response("Unable to download file", status=500)

	def create_art(self, f):

		# save the file
		ext = f.filename.rsplit('.',1)[1].lower()
		_id = str(uuid.uuid1())
		path = os.path.join(self.dir_path, _id + '.' + ext)
		f.save(path)

		# create the output
		output = self.ah.generate_output(
			path,
			int(request.form['width']),
			request.form['braille'].lower() == 'true',
			request.form['invert'].lower() == 'true',
		)

		# delete the file
		os.remove(path)

		# return the art
		return Response(output, status=200)



# App setup
app = Flask(__name__)
dir_path = os.path.dirname(os.path.realpath(__file__))
api = Api(app)
ah = AsciiHandler()

# Route views
api.add_resource(AsciiDemo, "/api/ascii-demo/", resource_class_kwargs={
	'dir_path': dir_path,
	'asciiHandler': ah
})

# Run app
if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=8000)
