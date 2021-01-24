from flask import Flask, request, Response, jsonify
from flask_restful import Resource, Api, abort, reqparse
import subprocess
from subprocess import check_output
import uuid
import os
from flaskext.mysql import MySQL
import datetime


class AsciiHandler():
	d = '/projects/ascii-art'
	def test(self):
		#return subprocess.call(['python','main.py','-h'], cwd=self.d)
		return check_output(['ls','-lha', dir_path], cwd=self.d).decode('ascii')
		return check_output(['python','main.py','-h'], cwd=self.d).decode('ascii')

# on second though i actually dont need this class, keeping it though in case i need it in the future
class DBManager():
	mysql = None
	def __init__(self, app):
		# initialized connection info
		self.mysql = MySQL()
		app.config['MYSQL_DATABASE_USER'] = 'root'
		app.config['MYSQL_DATABASE_PASSWORD'] = 'password'
		app.config['MYSQL_DATABASE_DB'] = 'my-app-db'
		app.config['MYSQL_DATABASE_HOST'] = 'db'
		app.config['MYSQL_DATABASE_PORT'] = 3306
		self.mysql.init_app(app)

		# create files table
		conn = self.mysql.connect()
		cur = conn.cursor()
		cur.execute('''
			CREATE TABLE IF NOT EXISTS files (
				id INT AUTO_INCREMENT PRIMARY KEY, 
				name VARCHAR(255),
				expiry DATETIME NOT NULL
			);
			''')
		conn.close()

	def list_data(self):
		conn = self.mysql.connect()
		cur = conn.cursor()
		data = cur.execute('show tables;')
		data = cur.fetchone()

		conn.close()
		return data

	def add_file(self, name, exp):
		conn = self.mysql.connect()
		cur = conn.cursor()
		cur.execute('''
			INSERT INTO files(name, expiry)
			VALUES(%s,%s);
			''', (name, exp))
		conn.commit()
		conn.close()

	def remove_file(self, id):
		pass

	def list_old_files(self, id):
		pass

	def list_files(self):
		conn = self.mysql.connect()
		cur = conn.cursor()
		data = cur.execute('''
			SELECT * FROM files;
		''')
		data = cur.fetchall()
		conn.commit()
		conn.close()
		return str(data)

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
		return Response(self.fm.foo())
		return Response(AsciiHandler().test())

	def post(self):
		if 'file' not in request.files:
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
