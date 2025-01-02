from flask import Blueprint, render_template, request

step2_page = Blueprint('step2', __name__)

@step2_page.route('/')
def step2():
    return render_template('step2.html')  # step2.html sizin tasarım dosyanız olacak

@step2_page.route('/process', methods=['POST'])
def process_step2():
    data = request.form
    # İşlem mantığı
    return f"Step 2 işlem tamamlandı: {data}"
