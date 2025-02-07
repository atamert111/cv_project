from flask import Flask, render_template, session, send_file

# Flask uygulaması
app = Flask(__name__)
app.secret_key = 'supersecretkey'

# Blueprint importları
from pages.root import root_page
from pages.step1 import step1_page
from pages.step2 import step2_page
from pages.step3 import step3_page
from pages.result import result_page
from pages.pdf import pdf_page

from pages.sample import sample_page
from pages.reset import reset_page

# Blueprint'leri kaydet
app.register_blueprint(root_page, url_prefix='/')
app.register_blueprint(step1_page, url_prefix='/step1')
app.register_blueprint(step2_page, url_prefix='/step2')
app.register_blueprint(step3_page, url_prefix='/step3')
app.register_blueprint(result_page, url_prefix='/result')
app.register_blueprint(pdf_page, url_prefix='/pdf')

app.register_blueprint(sample_page, url_prefix='/sample')
app.register_blueprint(reset_page, url_prefix='/reset')  # Doğru Blueprint kullanıldı

# Uygulamayı çalıştır
if __name__ == '__main__':
    app.run(debug=True)
