from flask import Blueprint, render_template, session, request, redirect, url_for
import json
from cv_data import merge_data
from pages.translations import get_translations  # Çeviri fonksiyonunu ekledik

step3_page = Blueprint('step3_page', __name__)

@step3_page.route('/', methods=['GET', 'POST'])
def step3():
    lang = session.get("lang", "tr")  # Kullanıcının seçtiği dili al, yoksa varsayılan Türkçe
    translations = get_translations(lang)  # Dile göre çevirileri getir

    if request.method == 'GET':
        return render_template('step3.html', translations=translations, data=session.get('cv_data', {}))

    elif request.method == 'POST':
        print("################ REQUEST FROM ######################")
        print(request.form)
        print("####################################################")

        # Step 3'ten gelen verileri session'a kaydet
        new_data = {
            'template': request.form.get('template'),
        }
        session['cv_data'] = merge_data(session.get('cv_data', {}), new_data)

        print("################ SESSION cv_data ################")
        print(json.dumps(session.get('cv_data', {}), indent=2))
        print("####################################################")

        # Result sayfasına yönlendir
        return redirect(url_for('result_page.result'))

    return
