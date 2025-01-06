from bs4 import BeautifulSoup

# HTML dosyasını yükle
html_path = '/mnt/data/cv_template2.html'
with open(html_path, 'r', encoding='utf-8') as file:
    html_content = file.read()

# BeautifulSoup ile HTML'i parse et
soup = BeautifulSoup(html_content, 'html.parser')

# Sayfa yüksekliği ve başlangıç değerleri
max_page_height = 940  # Beyaz alan maksimum yüksekliği (px)
remaining_height = max_page_height  # Kalan yükseklik
pages = []  # Sayfaları tutacak liste
current_page = []  # Mevcut sayfanın içeriği

# Yardımcı fonksiyonlar
def calculate_text_height(text, chars_per_line, line_height):
    """
    Metin için toplam yüksekliği hesaplar.
    """
    text = text.strip()
    num_chars = len(text)
    num_lines = -(-num_chars // chars_per_line)  # Yukarı yuvarlama
    return num_lines * line_height

def append_to_page(section_html, height):
    """
    Bir bölümü mevcut sayfaya ekler veya yeni bir sayfa başlatır.
    """
    global remaining_height, current_page, pages
    if remaining_height < height:  # Kalan alan yetersizse yeni sayfa oluştur
        pages.append(current_page)
        current_page = []
        remaining_height = max_page_height
    current_page.append(section_html)
    remaining_height -= height

# 1. İsim Soyisim
name_section = soup.find('div', class_='name')
if name_section:
    name_html = str(name_section)
    name_text = name_section.get_text(strip=True)
    name_height = calculate_text_height(name_text, chars_per_line=26, line_height=28)
    append_to_page(name_html, name_height)

# 2. Ön Yazı
intro_section = soup.find('p')
if intro_section:
    intro_html = str(intro_section)
    intro_text = intro_section.get_text(strip=True)
    intro_height = calculate_text_height(intro_text, chars_per_line=67, line_height=16)
    append_to_page(intro_html, intro_height)

# 3. Deneyimler
experience_section = soup.find('h2', id='experience')
if experience_section:
    experience_html = str(experience_section)
    append_to_page(experience_html, 30)  # Başlık yüksekliği
    experience_items = experience_section.find_next_sibling('div', class_='timeline')
    if experience_items:
        for item in experience_items.find_all('div', class_='timeline-item'):
            item_html = str(item)
            job_position_text = item.find('p').get_text(strip=True)
            job_height = calculate_text_height(job_position_text, chars_per_line=80, line_height=16)
            append_to_page(item_html, job_height)

# 4. Eğitim
education_section = soup.find('h2', id='education')
if education_section:
    education_html = str(education_section)
    append_to_page(education_html, 30)  # Başlık yüksekliği
    education_items = education_section.find_next_sibling('div', class_='timeline')
    if education_items:
        for item in education_items.find_all('div', class_='timeline-item'):
            item_html = str(item)
            education_text = item.find('p').get_text(strip=True)
            edu_height = calculate_text_height(education_text, chars_per_line=80, line_height=16)
            append_to_page(item_html, edu_height)

# 5. Projeler
project_section = soup.find('h2', id='projects')
if project_section:
    project_html = str(project_section)
    append_to_page(project_html, 30)  # Başlık yüksekliği
    project_items = project_section.find_next_sibling('div', class_='timeline')
    if project_items:
        for item in project_items.find_all('div', class_='timeline-item'):
            item_html = str(item)
            project_text = item.find('p').get_text(strip=True)
            proj_height = calculate_text_height(project_text, chars_per_line=80, line_height=16)
            append_to_page(item_html, proj_height)

# Mevcut sayfayı ekle
if current_page:
    pages.append(current_page)

# Sonuçları yazdırma
for i, page in enumerate(pages, 1):
    print(f"Sayfa {i} ({len(page)} bölüm):")
    for section in page:
        print(section[:100], "...")  # İlk 100 karakteri göster
