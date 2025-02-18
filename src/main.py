from flask import Flask, render_template, session, request, redirect, url_for
from pages.root import root_page
from pages.step1 import step1_page
from pages.step2 import step2_page
from pages.step3 import step3_page
from pages.result import result_page
from pages.pdf import pdf_page
from pages.sample import sample_page
from pages.reset import reset_page
from pages.translations import get_translations  # Çeviri dosyasını içe aktarıyoruz
from pages.cv_examples import cv_examples_page  # 📌 CV Örnekleri sayfası için Blueprint
from pages.cvblog import cvblog_page


# Flask uygulaması
app = Flask(__name__)
app.secret_key = 'supersecretkey'

# Blueprint'leri kaydet
app.register_blueprint(root_page, url_prefix='/')
app.register_blueprint(step1_page, url_prefix='/step1')
app.register_blueprint(step2_page, url_prefix='/step2')
app.register_blueprint(step3_page, url_prefix='/step3')
app.register_blueprint(result_page, url_prefix='/result')
app.register_blueprint(pdf_page, url_prefix='/pdf')
app.register_blueprint(sample_page, url_prefix='/sample')
app.register_blueprint(reset_page, url_prefix='/reset')
app.register_blueprint(cv_examples_page, url_prefix='/cv-examples')
app.register_blueprint(cvblog_page, url_prefix='/cvblog')


# Varsayılan dili belirle
@app.before_request
def set_default_language():
    if "lang" not in session:
        session["lang"] = "tr"  # Varsayılan olarak Türkçeyi seç

# Dil değiştirme route'u
@app.route("/set_language/<language>")
def set_language(language):
    if language in ["tr", "en"]:
        session["lang"] = language
    return redirect(request.referrer or url_for("home"))  # Ana sayfaya yönlendir

# Ana sayfa route'u
@app.route("/")
def home():
    lang = session.get("lang", "tr")  # Kullanıcının seçtiği dili al
    translations = get_translations(lang)  # Çeviri verilerini al
    return render_template("index.html", translations=translations)

# Uygulamayı çalıştır
if __name__ == '__main__':
    app.run(debug=True)
