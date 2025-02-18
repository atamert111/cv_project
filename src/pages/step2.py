from flask import Blueprint, render_template, request, session, redirect, url_for
import json
from cv_data import merge_data, get_default_data
from pages.translations import get_translations  # Çeviri fonksiyonunu içe aktar

step2_page = Blueprint('step2_page', __name__)

@step2_page.route('/', methods=['GET', 'POST'])
def step2():
    # Kullanıcı dilini belirleme
    lang = session.get("lang", "tr")  # Varsayılan dil Türkçe
    translations = get_translations(lang)  # Dile göre çevirileri al

    if request.method == 'GET':
        # Varsayılan verileri al ve session ile birleştir
        cv_data = session.get('cv_data', get_default_data())
        return render_template('step2.html', translations=translations, data=cv_data)

    elif request.method == 'POST':
        print("################ REQUEST FORM ######################")
        print(request.form)
        print("####################################################")

        # Boş array yazmasını önlemek için eski cv_data alınıyor
        old_data = session.get('cv_data', get_default_data())

        # İş Deneyimleri
        job_experiences = []
        company_reference = None
        work_types = request.form.getlist('work_type')
        work_locations = request.form.getlist('work_location')

        for i in range(len(request.form.getlist('job_position'))):
            same_company = 'same_company' in request.form and request.form.getlist('same_company')[i] == 'true'
            company_name = company_reference if same_company else request.form.getlist('job_company_name')[i]

            if not same_company:
                company_reference = company_name

            job_experiences.append({
                'company_name': company_name,
                'position': request.form.getlist('job_position')[i],
                'start_date': request.form.getlist('job_start_date')[i],
                'end_date': request.form.getlist('job_end_date')[i],
                'description': request.form.getlist('job_description')[i],
                'location': request.form.getlist('job_location')[i],
                'work_type': work_types[i] if i < len(work_types) else "",
                'work_location': work_locations[i] if i < len(work_locations) else "",
                'same_company': same_company
            })

        # Eğitim Bilgileri
        education = []
        edu_names = request.form.getlist('edu_school_name[]')

        if edu_names:  # Eğer hiç veri gelmemişse boş olarak kaydetme
            for i in range(len(edu_names)):
                currently_studying = 'currently_studying[]' in request.form and request.form.getlist('currently_studying[]')[i] == 'true'
                education.append({
                    'school_name': edu_names[i],
                    'department': request.form.getlist('edu_department[]')[i],
                    'faculty_name': request.form.getlist('edu_faculty[]')[i],
                    'degree': request.form.getlist('edu_degree[]')[i],
                    'start_year': request.form.getlist('edu_start_year[]')[i],
                    'end_year': request.form.getlist('edu_end_date[]')[i] if not currently_studying else "Halen",
                    'grade': request.form.getlist('edu_grade[]')[i] if request.form.getlist('edu_grade[]')[i] else None,
                    'currently_studying': currently_studying
                })
        else:
            education = old_data.get('education', [])  # Eğer hiç eğitim bilgisi gelmediyse, eskisini kullan

        # Sertifikalar
        certificates = []
        cert_names = request.form.getlist('certificate_name[]')

        if cert_names:
            for i in range(len(cert_names)):
                certificates.append({
                    'name': cert_names[i],
                    'date': request.form.getlist('certificate_year[]')[i],
                    'issuer': request.form.getlist('certificate_place[]')[i]
                })
        else:
            certificates = old_data.get('certificates', [])  # Eski veriyi kullan

        # Diller
        languages = []
        for i in range(len(request.form.getlist('language_name'))):
            languages.append({
                'name': request.form.getlist('language_name')[i],
                'level': request.form.getlist('language_level')[i]
            })

        # Teknik Beceriler
        technical_skills = []
        for i in range(len(request.form.getlist('technical_skill_name'))):
            technical_skills.append({
                'name': request.form.getlist('technical_skill_name')[i],
                'level': request.form.getlist('technical_skill_level')[i]
            })

        # Kişisel Yetenekler
        soft_skills = []
        for i in range(len(request.form.getlist('soft_skill_name'))):
            soft_skills.append({
                'name': request.form.getlist('soft_skill_name')[i],
                'level': request.form.getlist('soft_skill_level')[i]
            })

        # Hakkında
        self_about = request.form.get('self_about_text', '')

        # Projeler
        projects = []
        for i in range(len(request.form.getlist('project_name'))):
            projects.append({
                'name': request.form.getlist('project_name')[i],
                'date': request.form.getlist('project_date')[i],
                'link': request.form.getlist('project_link')[i],
                'description': request.form.getlist('project_description')[i]
            })

        # Referanslar
        references = []
        for i in range(len(request.form.getlist('reference_name'))):
            references.append({
                'name': request.form.getlist('reference_name')[i],
                'contact': request.form.getlist('reference_contact')[i],
                'position': request.form.getlist('reference_position')[i]
            })

        # Tüm verileri session'da saklama
        new_data = {
            'job_experiences': job_experiences,
            'education': education,
            'certificates': certificates,
            'languages': languages,
            'technical_skills': technical_skills,
            'soft_skills': soft_skills,
            'projects': projects,
            'references': references,
            'self_about': self_about
        }
        session['cv_data'] = merge_data(old_data, new_data)

        print("################ SESSION cv_data ################")
        print(json.dumps(session.get('cv_data', {}), indent=2))
        print("####################################################")

        # step3'e yönlendirme
        return redirect(url_for('step3_page.step3'))

    return
