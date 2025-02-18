from flask import Blueprint, render_template, session
from pages.translations import get_translations  # Çeviri sistemini ekliyoruz

root_page = Blueprint('root_page', __name__)

@root_page.route('/')
def main():
    lang = session.get("lang", "tr")  # Varsayılan olarak Türkçe kullan
    translations = get_translations(lang)  # Seçilen dile göre çeviri verilerini al
    return render_template('index.html', translations=translations)  # Şablona gönderiyoruz!
