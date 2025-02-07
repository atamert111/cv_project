from flask import Blueprint, session, redirect, url_for
from cv_data import get_default_data

reset_page = Blueprint('reset_page', __name__)

@reset_page.route('/', methods=['GET'])
def reset():
    # Tüm session verilerini sıfırla ve varsayılan veri yapısını ayarla
    session['cv_data'] = get_default_data()
    # Kullanıcıyı step1.html'e yönlendir
    return redirect(url_for('step1_page.step1'))


