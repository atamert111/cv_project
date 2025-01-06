from flask import Blueprint, render_template, request, session, redirect, url_for
import re
import os
from werkzeug.utils import secure_filename

step1_page = Blueprint('step1_page', __name__)

UPLOAD_FOLDER = 'uploads'  # Yüklenen dosyaların kaydedileceği klasör
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}  # İzin verilen dosya türleri

# Flask dosya yükleme ayarları
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@step1_page.route('/', methods=['GET', 'POST'])
def step1():
    if request.method == 'POST':
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
        session['step1_data'] = {
            'name': request.form.get('name'),
            'surname': request.form.get('surname'),
            'personal_info_name': f"{request.form.get('name')} {request.form.get('surname')}",
            'personal_info.phone': request.form.get('phone'),
            'personal_info.email': email,
            'personal_info.address': request.form.get('address'),
            'military_service_status': request.form.get('military_service'),
            'driver_license': request.form.get('driver_license'),
            'marital_status': request.form.get('marital_status'),
            'personal_info.profile_photo': profile_photo_path,
            'profile_photo_uploaded': profile_photo_uploaded,  # Fotoğraf durumu
        }

        # Bir sonraki adıma yönlendir
        return redirect(url_for('step2_page.step2'))

    # Formun tekrar yüklenmesi durumunda session verilerini aktar
    return render_template('step1.html', data=session.get('step1_data', {}))
