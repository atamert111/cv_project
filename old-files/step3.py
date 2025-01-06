from flask import Blueprint, render_template, session, request, redirect, url_for

step3_page = Blueprint('step3_page', __name__)

@step3_page.route('/', methods=['GET', 'POST'])
def step3():
    #if 'step2_data' not in session:
     #   return redirect(url_for('step2_page.step2'))  # Step 2'ye geri yönlendirme

    if request.method == 'POST':
        # Step 3'ten gelen verileri session'a kaydet
        session['step3_data'] = {
            'template': request.form.get('template'),
        }
        # Result sayfasına yönlendir
        return redirect(url_for('result_page.result'))

    return render_template('step3.html')
