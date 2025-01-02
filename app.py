from flask import Flask
from main import main_page
from step1 import step1_page
from step2 import step2_page

app = Flask(__name__)

# Ana sayfa rota kaydı
app.register_blueprint(main_page, url_prefix='/')

# Step 1 sayfa rota kaydı
app.register_blueprint(step1_page, url_prefix='/step1')

# Step 2 sayfa rota kaydı
app.register_blueprint(step2_page, url_prefix='/step2')

if __name__ == '__main__':
    app.run(debug=True)
