from flask import Blueprint, render_template, session
from pages.translations import get_translations  # Çeviri fonksiyonunu içe aktar

cv_examples_page = Blueprint('cv_examples_page', __name__)

# CV kategorileri, sadece resim yollarını tutuyor
cv_samples = {
    "chronological": {
        "image": "/static/images/cv_samples/kronolojik.jpeg"
    },
    "functional": {
        "image": "/static/images/cv_samples/fonksiyonel.png"
    },
    "hybrid": {
        "image": "/static/images/cv_samples/hibrid.png"
    },
    "academic": {
        "image": "/static/images/cv_samples/akademik.png"
    },
    "student": {
        "image": "/static/images/cv_samples/ogrenci.png"
    }
}

@cv_examples_page.route('/<category>')
def cv_examples(category):
    lang = session.get("lang", "tr")  # Kullanıcının tercih ettiği dili al
    translations = get_translations(lang)  # Seçilen dile göre çevirileri getir

    # Çeviri dosyasında ilgili CV örneğine ait başlık ve açıklama olup olmadığını kontrol et
    title_key = f"cv_{category}_title"
    description_key = f"cv_{category}_description"

    cv_data = cv_samples.get(category, {
        "image": "/static/images/no-image.png"  # Varsayılan görsel
    })
    
    # Çeviriden başlık ve açıklamayı ekleyelim
    cv_data["title"] = translations.get(title_key, translations["cvNotFoundTitle"])
    cv_data["description"] = translations.get(description_key, translations["cvNotFoundDescription"])
    
    return render_template('cvexamples.html', cv_data=cv_data, translations=translations)
