from flask import Flask, render_template, Response
from weasyprint import HTML

app = Flask(__name__)

@app.route('/')
def html_preview():
    # HTML içeriğini önizlemek için
    return render_template('sample.html')

@app.route('/pdf')
def generate_pdf():
    # HTML içeriğini al ve PDF'ye dönüştür
    html = render_template('sample.html')
    try:
        pdf = HTML(string=html).write_pdf()
        response = Response(pdf, content_type='application/pdf')
        response.headers['Content-Disposition'] = 'inline; filename=test.pdf'
        return response
    except Exception as e:
        return f"PDF oluşturulurken bir hata oluştu: {e}"

if __name__ == '__main__':
    app.run(debug=True)
