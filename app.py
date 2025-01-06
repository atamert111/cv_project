from flask import Flask, render_template, session, send_file
from weasyprint import HTML
import io

# Flask uygulaması
app = Flask(__name__)
app.secret_key = 'supersecretkey'

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
    Session'dan gelen verilerle bir CV PDF oluşturur ve tarayıcıda görüntüler.
    """
    # Session'dan verileri topla
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

    # HTML'i oluştur
    rendered_html = render_template('sample.html', **data)

    # WeasyPrint ile PDF oluştur
    try:
        pdf = HTML(string=rendered_html).write_pdf()
        return send_file(
            io.BytesIO(pdf),
            mimetype='application/pdf',
            as_attachment=False,  # Tarayıcıda açılmasını sağlar
            download_name='cv.pdf'
        )
    except Exception as e:
        return f"PDF oluşturulurken bir hata oluştu: {e}"

# Uygulamayı çalıştır
if __name__ == '__main__':
    app.run(debug=True)
