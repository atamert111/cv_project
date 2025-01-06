from flask import Blueprint, render_template, request, session, redirect, url_for, Response
from weasyprint import HTML
import os



pdf_page = Blueprint('pdf_page', __name__)

@pdf_page.route('/', methods=['GET', 'POST'])
def pdf():
    
    dir_path = os.path.dirname(os.path.realpath(__file__))

    # Tüm session verilerini topla
    step1_data = session.get('step1_data', {})
    step2_data = session.get('step2_data', {})
    step3_data = session.get('step3_data', {})

    data = {
        'personal_info_name': 'Ayla Candan',
        'personal_info_phone': '+90 212 123 45 67',
        'personal_info_email': 'ayla.candan@example.com',
        'personal_info_address': 'İstanbul',
        'driver_license': [] ,
        'soft_skills': [],  # Yetenekler boş
        'technical_skills': [],  # Teknik beceriler boş
        'languages': [],  # Diller boş
        'job_experiences': [
            {
                'experiences.company_name': 'Medika Hastanesi',
                'experiences.start_date': '2018',
                'experiences.end_date': '2023',
                'experiences.position': 'Kardiyoloji Doktoru',
                'experiences.description': 'Hastane başvuran hastaların kardiyovasküler rahatsızlıklarını teşhis ve tedavi ettim.'
            },
            {
                'experiences.company_name': 'Ege Üniversitesi',
                'experiences.start_date': '2017',
                'experiences.end_date': '2018',
                'experiences.position': 'İntörn Doktor',
                'experiences.description': 'Haftanın iki günü acil serviste görev aldım.'
            }
        ],
        'education': [
            {
                'education.school_name': 'Ege Üniversitesi',
                'start_date': '2018',
                'end_date': '2023',
                'field_of_study': 'Makine Mühendisliği',
                'faculty_name': 'Mühendislik Fakültesi',
                'degree': 'Lisans',
                'gpa': '2.9'
            },
            {
                'education.school_name': 'Bilgi Anadolu Lisesi',
                'start_date': '2017',
                'end_date': '2018',
                'field_of_study': 'Matematik Fen Bölümü',
                'faculty_name': '',
                'degree': 'Lise',
                'gpa': '80.4'
            }
        ],
        'projects': [
            {'name': 'Kalp Hastalıkları Araştırması', 'description': 'Türkiye\'de yapılan kapsamlı bir araştırma.'},
            {'name': 'Toplum Sağlığı Projesi', 'description': 'İzmir\'de yürütülen bir sosyal sorumluluk projesi.'}
        ],
        'certificates': [],  # Sertifikalar boş
        'references': [
            {'name': 'Ali Yılmaz', 'contact': 'Yeditepe Üniversitesi', 'relation': 'Öğretim Görevlisi'},
            {'name': 'Ayşe Kınak', 'contact': 'MEg AŞ', 'relation': 'İK Direktörü'},
            {'name': 'Ali Yılmaz', 'contact': 'Yeditepe Üniversitesi', 'relation': 'Öğretim Görevlisi'},
            {'name': 'Ayşe Kınak', 'contact': 'MEg AŞ', 'relation': 'İK Direktörü'},
            {'name': 'Ali Yılmaz', 'contact': 'Yeditepe Üniversitesi', 'relation': 'Öğretim Görevlisi'},
            {'name': 'Ayşe Kınak', 'contact': 'MEg AŞ', 'relation': 'İK Direktörü'},
        ],
        'image_paths' : {
            'profilresmi' :  'file://' + os.path.join(dir_path, '../templates/pdf-templates/static', 'images/profilresmi.png')
        }
    }

    # HTML şablonunu işleme
    html = render_template('pdf-templates/template1.html', **data)

    # WeasyPrint ile PDF oluştur
    pdf = HTML(string=html).write_pdf()

    # Tarayıcıda PDF'yi göster
    response = Response(pdf, content_type='application/pdf')
    response.headers['Content-Disposition'] = 'inline; filename=cv_test.pdf'
    return response