from flask import Blueprint, render_template, session

result_page = Blueprint('result_page', __name__)

@result_page.route('/')
def result():
    # Tüm session verilerini topla
    step1_data = session.get('step1_data', {})
    step2_data = session.get('step2_data', {})
    step3_data = session.get('step3_data', {})

    return render_template('result.html', step1_data=step1_data, step2_data=step2_data, step3_data=step3_data)
