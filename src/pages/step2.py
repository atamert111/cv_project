from flask import Blueprint, render_template, request, session, redirect, url_for
import json

step2_page = Blueprint('step2_page', __name__)

@step2_page.route('/', methods=['GET', 'POST'])
def step2():
    if request.method == 'GET':
        return  render_template('step2.html')
    elif request.method == 'POST':

        print("################ REQUEST FROM ######################")
        print(request.form)
        print("####################################################")
        # İş Deneyimleri
        job_experiences = []
        company_reference = None  # En son kullanılan şirket adı
        for i in range(len(request.form.getlist('job_position'))):
            same_company = 'same_company' in request.form and request.form.getlist('same_company')[i] == 'true'

            # Eğer aynı iş checkbox'ı seçiliyse önceki şirket adını kullan
            if same_company:
                company_name = company_reference
            else:
                company_name = request.form.getlist('company_name')[i]
                company_reference = company_name  # Şirket adını güncelle

            job_experiences.append({
                'company_name': company_name,
                'position': request.form.getlist('job_position')[i],
                'start_date': request.form.getlist('job_start_date')[i],
                'end_date': request.form.getlist('job_end_date')[i],
                'description': request.form.getlist('job_description')[i],
                'same_company': same_company
            })

        # Eğitim Bilgileri
        education = []
        for i in range(len(request.form.getlist('school_name[]'))):
            currently_studying = 'currently_studying[]' in request.form and request.form.getlist('currently_studying[]')[i] == 'true'
            education.append({
                'school_name': request.form.getlist('school_name[]')[i],
                'faculty_name': request.form.getlist('faculty_name[]')[i],
                'degree': request.form.getlist('degree[]')[i],
                'field_of_study': request.form.getlist('field_of_study[]')[i],
                'start_date': request.form.getlist('education_start_date[]')[i],
                'end_date': request.form.getlist('education_end_date[]')[i] if not currently_studying else "Halen",
                'currently_studying': currently_studying
            })

        # Sertifikalar
        certificates = []
        for i in range(len(request.form.getlist('certificate_name[]'))):
            certificates.append({
                'name': request.form.getlist('certificate_name[]')[i],
                'date': request.form.getlist('certificate_date[]')[i],
                'issuer': request.form.getlist('certificate_issuer[]')[i]
            })

        # Diller
        languages = []
        for i in range(len(request.form.getlist('language_name[]'))):
            languages.append({
                'name': request.form.getlist('language_name[]')[i],
                'level': request.form.getlist('language_level[]')[i]
            })

        # Teknik Beceriler
        technical_skills = []
        for i in range(len(request.form.getlist('technical_skill_name[]'))):
            technical_skills.append({
                'name': request.form.getlist('technical_skill_name[]')[i],
                'level': request.form.getlist('technical_skill_level[]')[i]
            })

        # Kişisel Yetenekler
        soft_skills = []
        for i in range(len(request.form.getlist('soft_skill_name[]'))):
            soft_skills.append({
                'name': request.form.getlist('soft_skill_name[]')[i],
                'level': request.form.getlist('soft_skill_level[]')[i]
            })

        # Projeler
        projects = []
        for i in range(len(request.form.getlist('project_name[]'))):
            projects.append({
                'name': request.form.getlist('project_name[]')[i],
                'description': request.form.getlist('project_description[]')[i],
                'date': request.form.getlist('project_date[]')[i]
            })

        # Referanslar
        references = []
        for i in range(len(request.form.getlist('reference_name[]'))):
            references.append({
                'name': request.form.getlist('reference_name[]')[i],
                'contact': request.form.getlist('reference_contact[]')[i],
                'relation': request.form.getlist('reference_relation[]')[i]
            })

        # Tüm verileri session'da saklama
        session['step2_data'] = {
            'job_experiences': job_experiences,
            'education': education,
            'certificates': certificates,
            'languages': languages,
            'technical_skills': technical_skills,
            'soft_skills': soft_skills,
            'projects': projects,
            'references': references
        }

        print("################ SESSION step2_data ################")
        print(json.dumps(session.get('step2_data', {}), indent=2))
        print("####################################################")

        # step3'e yönlendirme
        return redirect(url_for('step3_page.step3'))

    return
