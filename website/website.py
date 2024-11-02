from flask import Flask, render_template, request
from jinja2 import TemplateNotFound

website = Flask(__name__, template_folder='templates', static_folder='static')

@website.route('/', methods=['GET'])
def default():
    return render_template("index.html")

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



