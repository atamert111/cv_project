from flask import Blueprint, render_template

main_page = Blueprint('main', __name__)

@main_page.route('/')
def home():
    return render_template('index.html')  # main.html sizin tasarım dosyanız olacak
