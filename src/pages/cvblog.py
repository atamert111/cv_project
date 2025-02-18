from flask import Blueprint, render_template

cvblog_page = Blueprint('cvblog', __name__, template_folder='../templates')

@cvblog_page.route('/')
def cvblog():
    cv_data = {"title": "CV Hazırlama Rehberi"}
    translations = {"ctaButton": "Şimdi Başla"}
    return render_template('cvblog.html', cv_data=cv_data, translations=translations)
