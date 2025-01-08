from flask import Blueprint, render_template, request, session, redirect, url_for, Response
from weasyprint import HTML
import os


pdf_page = Blueprint('pdf_page', __name__)

@pdf_page.route('/', methods=['GET'])
def pdf():
    
    data = session.get('cv_data', {})

    dir_path = os.path.dirname(os.path.realpath(__file__))
    image_paths = {
        'nameicon': f"file://{os.path.join(dir_path, '../templates/pdf-templates/static/images/nameicon.png')}",
        'phoneicon': f"file://{os.path.join(dir_path, '../templates/pdf-templates/static/images/phoneicon.png')}",
        'mailicon': f"file://{os.path.join(dir_path, '../templates/pdf-templates/static/images/mailicon.png')}",
        'addressicon': f"file://{os.path.join(dir_path, '../templates/pdf-templates/static/images/addressicon.png')}",
        'liceanceicon': f"file://{os.path.join(dir_path, '../templates/pdf-templates/static/images/liceanceicon.png')}",
        'mailiconicon': f"file://{os.path.join(dir_path, '../templates/pdf-templates/static/images/mailiconicon.png')}",
        'mariedicon': f"file://{os.path.join(dir_path, '../templates/pdf-templates/static/images/mariedicon.png')}",
        'jobicon': f"file://{os.path.join(dir_path, '../templates/pdf-templates/static/images/jobicon.png')}",
        'eduicon': f"file://{os.path.join(dir_path, '../templates/pdf-templates/static/images/eduicon.png')}",
        'proicon': f"file://{os.path.join(dir_path, '../templates/pdf-templates/static/images/proicon.png')}",
        'cericon': f"file://{os.path.join(dir_path, '../templates/pdf-templates/static/images/cericon.png')}",
        'reficon': f"file://{os.path.join(dir_path, '../templates/pdf-templates/static/images/reficon.png')}"
    }


    # Dosya yollarını 'data' içine eklemek isterseniz:
    data['image_paths'] = image_paths
    # HTML şablonunu işleme
    html = render_template('pdf-templates/template1.html', **data)

    # WeasyPrint ile PDF oluştur
    pdf = HTML(string=html).write_pdf()

    # Tarayıcıda PDF'yi göster
    response = Response(pdf, content_type='application/pdf')
    response.headers['Content-Disposition'] = 'inline; filename=cv_test.pdf'
    return response