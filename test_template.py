from flask import Flask, render_template, Response
from weasyprint import HTML

app = Flask(__name__)

@app.route('/')
def cv_preview():
    # HTML şablonunu tarayıcıda önizleyin
    return render_template('template1.html')

@app.route('/pdf')
def generate_pdf():
    # HTML şablonunu alın ve PDF'ye dönüştürün
    html = render_template('template1.html')
    pdf = HTML(string=html).write_pdf()

    # PDF'yi yanıt olarak döndür
    response = Response(pdf, content_type='application/pdf')
    response.headers['Content-Disposition'] = 'inline; filename=cv.pdf'
    return response

if __name__ == '__main__':
    app.run(debug=True)
