from flask import Blueprint, render_template, request, session, redirect, url_for
import os
from werkzeug.utils import secure_filename

step1_page = Blueprint('step1_page', __name__)

UPLOAD_FOLDER = 'uploads'  # Yüklenen dosyaların kaydedileceği klasör
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Dosya formatını kontrol eden yardımcı fonksiyon
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@step1_page.route('/', methods=['GET', 'POST'])
def step1():
    if request.method == 'POST':
        # Profil fotoğrafını işle
        file = request.files.get('profile_photo')
        profile_photo_uploaded = False
        profile_photo_path = None

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            profile_photo_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(profile_photo_path)
            profile_photo_uploaded = True

        # Verileri session'da sakla
        session['step1_data'] = {
            'name': request.form.get('name'),
            'surname': request.form.get('surname'),
            'phone': request.form.get('phone'),
            'email': request.form.get('email'),
            'profile_photo': profile_photo_path,
            'profile_photo_uploaded': profile_photo_uploaded,
        }

        return redirect(url_for('step2_page.step2'))

    return render_template('step1.html', data=session.get('step1_data', {}))
