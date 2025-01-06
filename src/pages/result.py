from flask import Blueprint, render_template, request, session, redirect, url_for

result_page = Blueprint('result_page', __name__)




@result_page.route('/', methods=['GET', 'POST'])
def result():
    if request.method == 'POST':
        # Bir sonraki adıma yönlendir
        return redirect(url_for('pdf_page.pdf'))

    # Tüm session verilerini topla
    step1_data = session.get('step1_data', {})
    step2_data = session.get('step2_data', {})
    step3_data = session.get('step3_data', {})

    return render_template('result.html', step1_data=step1_data, step2_data=step2_data, step3_data=step3_data)
