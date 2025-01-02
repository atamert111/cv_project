from flask import Blueprint, render_template, request

step1_page = Blueprint('step1', __name__)

@step1_page.route('/')
def step1():
    return render_template('step1.html')  # step1.html sizin tasarım dosyanız olacak

@step1_page.route('/process', methods=['POST'])
def process_step1():
    data = request.form
    # İşlem mantığı
    return f"Step 1 işlem tamamlandı: {data}"
