// Yeni yetenek/beceri bilgisi ekle
function addSkill() {
    const container = document.getElementById('skills-section');
    const firstSkill = container.querySelector('.skill-entry');
    const newSkill = firstSkill.cloneNode(true);

    // İçerikleri temizle
    newSkill.querySelectorAll('input, select').forEach(input => {
        input.value = '';
    });

    container.insertBefore(newSkill, container.querySelector('.action-buttons-skill'));
}

// Yetenek bilgisi sil
function removeSkill() {
    const container = document.getElementById('skills-section');
    const skillEntries = container.querySelectorAll('.skill-entry');

    if (skillEntries.length > 1) {
        skillEntries[skillEntries.length - 1].remove();
    }
}
