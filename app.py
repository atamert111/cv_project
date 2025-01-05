from flask import Flask, render_template, session, redirect, url_for, request, send_file
import pdfkit
import io

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Session için gerekli

# PDF oluşturma yapılandırması
PDFKIT_CONFIG = pdfkit.configuration(wkhtmltopdf='/usr/local/bin/wkhtmltopdf')  # `wkhtmltopdf` yolunu kontrol edin

# Blueprint importları
from main import main_page
from step1 import step1_page
from step2 import step2_page
from step3 import step3_page
from result import result_page
from finalize import finalize_page

# Blueprint'leri kaydet
app.register_blueprint(main_page, url_prefix='/')
app.register_blueprint(step1_page, url_prefix='/step1')
app.register_blueprint(step2_page, url_prefix='/step2')
app.register_blueprint(step3_page, url_prefix='/step3')
app.register_blueprint(result_page, url_prefix='/result')
app.register_blueprint(finalize_page, url_prefix='/finalize')

@app.route('/pdf')
def generate_pdf():
    """
    Tüm session verilerinden bir CV PDF oluşturur.
    """
    # Tüm session verilerini topla
    step1_data = session.get('step1_data', {})
    step2_data = session.get('step2_data', {})
    step3_data = session.get('step3_data', {})
    
    # Tüm verileri birleştir
    data = {
        'personal_info': step1_data,
        'experiences': step2_data.get('jobs', []),
        'education': step2_data.get('education', []),
        'languages': step2_data.get('languages', []),
        'hard_skills': step2_data.get('hard_skills', []),
        'soft_skills': step2_data.get('soft_skills', []),
        'certificates': step2_data.get('certificates', []),
        'references': step2_data.get('references', []),
        'summary': step3_data.get('summary', '')
    }

    # HTML'den PDF oluşturma
    options = {
        'enable-local-file-access': None
    }
    rendered_html = render_template('cv.template.html', **data)
    pdf = pdfkit.from_string(rendered_html, False, configuration=PDFKIT_CONFIG, options=options)

    # PDF'yi indirme olarak döndür
    return send_file(
        io.BytesIO(pdf),
        mimetype='application/pdf',
        as_attachment=True,
        download_name='cv.pdf'
    )

if __name__ == '__main__':
    app.run(debug=True)
