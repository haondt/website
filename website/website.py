from flask import Flask, render_template, request, send_from_directory, url_for
from jinja2 import TemplateNotFound
import os

website = Flask(__name__, template_folder='templates', static_folder='static')

@website.route('/', methods=['GET'])
def default():
    return render_template("index.html")

@website.route('/favicon.ico')
def favicon():
    return send_from_directory(
            os.path.join(website.root_path, 'static'),
            'favicon.ico',
            mimetype='image/vnd.microsoft.icon')

@website.route('/hx/<template>')
def hx_render(template):
    query_params = request.args.to_dict()
    try:
        return render_template(f'{template}.html', **query_params)
    except TemplateNotFound:
        return render_template('404.html', template=template)
    except:
        return render_template('500.html')

@website.route('/<template>')
def render(template):
    return render_template("index.html", target=template)


if __name__ == '__main__':
    from livereload import Server
    server = Server(website.wsgi_app)
    website.config.update({'DEBUG': True})
    server.serve()



