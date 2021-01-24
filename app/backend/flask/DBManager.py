from flaskext.mysql import MySQL

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
