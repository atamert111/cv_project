from flask import Blueprint, render_template, request, session, redirect, url_for
import re
import os
from werkzeug.utils import secure_filename
import json
import time
from cv_data import merge_data

step1_page = Blueprint('step1_page', __name__)

UPLOAD_FOLDER = 'uploads'  # Yüklenen dosyaların kaydedileceği klasör
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}  # İzin verilen dosya türleri

# Flask dosya yükleme ayarları
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@step1_page.route('/', methods=['GET', 'POST'])
def step1():
    if request.method == 'GET':
        # Formun tekrar yüklenmesi durumunda session verilerini aktar
        return render_template('step1.html', data=session.get('cv_data', {}))
    elif request.method == 'POST':

        print("################ REQUEST FROM ######################")
        print(request.form)
        print("####################################################")
        print(request.files)
        print("####################################################")
      

        # Zorunlu alanları kontrol et
        if not request.form.get('name') or not request.form.get('surname') or not request.form.get('phone') or not request.form.get('email'):
            return render_template('step1.html', error="Lütfen tüm zorunlu alanları doldurun.", data=request.form)

        # E-posta doğrulaması
        email = request.form.get('email')
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return render_template('step1.html', error="Geçerli bir e-posta adresi girin.", data=request.form)

        # Profil fotoğrafını işle
        file = request.files.get('profile_photo')
        profile_photo_path = None
        profile_photo_uploaded = False
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            profile_photo_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(profile_photo_path)
            profile_photo_uploaded = True  # Fotoğrafın yüklendiğini işaretle

        # Verileri session'da sakla
        new_data = {
            'name': request.form.get('name'),
            'surname': request.form.get('surname'),
            'personal_info_name': f"{request.form.get('name')} {request.form.get('surname')}",
            'personal_info_phone': request.form.get('phone'),
            'personal_info_email': request.form.get('email'),
            'personal_info_address': request.form.get('address'),
            'personal_info_birthday': request.form.get('birthday'),
            'military_service_status': request.form.get('military_service_status'),
            'driver_license': request.form.get('driver_license'),
            'marital_status': request.form.get('marital_status'),
            'personal_info_profile_photo': profile_photo_path,
            'profile_photo_uploaded': profile_photo_uploaded,  # Fotoğraf durumu
        }
        session['cv_data'] = merge_data(session.get('cv_data', {}), new_data)

        print("################ SESSION cv_data ################")
        print(json.dumps(session.get('cv_data', {}), indent=2))
        print("####################################################")

        # Bir sonraki adıma yönlendir
        return redirect(url_for('step2_page.step2'))

    return
