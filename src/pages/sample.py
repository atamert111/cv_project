
from flask import Blueprint, render_template, request, session, redirect, url_for
from cv_data import get_sample_data

sample_page = Blueprint('sample_page', __name__)

@sample_page.route('/', methods=['GET'])
def sample():
    session['cv_data'] = get_sample_data()
    return redirect(url_for('step1_page.step1'))