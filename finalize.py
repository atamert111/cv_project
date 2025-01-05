from flask import Blueprint, session, redirect, url_for

finalize_page = Blueprint('finalize_page', __name__)

@finalize_page.route('/', methods=['POST'])
def finalize():
    # Tüm veriler burada kullanılabilir
    step1_data = session.get('step1_data', {})
    step2_data = session.get('step2_data', {})
    step3_data = session.get('step3_data', {})

    # Burada kaydetme veya PDF oluşturma işlemleri yapılabilir
    print("Step 1 Data:", step1_data)
    print("Step 2 Data:", step2_data)
    print("Step 3 Data:", step3_data)

    return redirect(url_for('main_page.main'))  # Ana sayfaya yönlendir
