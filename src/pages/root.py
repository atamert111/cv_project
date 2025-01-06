from flask import Blueprint, render_template

root_page = Blueprint('root_page', __name__)

@root_page.route('/')
def main():
    return render_template('index.html')  # Ana sayfa
