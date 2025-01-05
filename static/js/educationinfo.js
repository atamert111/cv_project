// Yeni eğitim bilgisi ekle
function addEducation() {
    const container = document.getElementById('education-experiences');
    const firstEducation = container.querySelector('.education-entry');
    const newEducation = firstEducation.cloneNode(true); // İlk formu klonla

    // İçerikleri temizle
    newEducation.querySelectorAll('input, select').forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });

    container.insertBefore(newEducation, container.querySelector('.action-buttons')); // Yeni alanı butonların önüne ekle
}

// Eğitim bilgisi sil
function removeEducation() {
    const container = document.getElementById('education-experiences');
    const educationEntries = container.querySelectorAll('.education-entry');

    if (educationEntries.length > 1) {
        educationEntries[educationEntries.length - 1].remove(); // Son girişi sil
    }
}

// "Halen devam ediyorum" seçildiğinde mezuniyet yılı alanını devre dışı bırak
function toggleEndYear(checkbox) {
    const endYear = checkbox.closest('.three-column').querySelector('#end_year');
    if (checkbox.checked) {
        endYear.value = '';
        endYear.disabled = true;
    } else {
        endYear.disabled = false;
    }
}
