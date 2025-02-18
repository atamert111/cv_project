from flask import Blueprint, render_template, request, session, redirect, url_for
from pages.translations import get_translations 

result_page = Blueprint('result_page', __name__)

@result_page.route('/', methods=['GET', 'POST'])
def result():
    translations = get_translations(session.get("lang", "tr"))
    if request.method == 'GET':
        return render_template('result.html', translations=translations, data=session.get('cv_data', {}))
    elif request.method == 'POST':
        return redirect(url_for('pdf_page.pdf'))
    return
