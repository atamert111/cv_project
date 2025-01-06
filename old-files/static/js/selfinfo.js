// Yeni referans bilgisi ekle
function addReference() {
    const container = document.getElementById('references-section');
    const firstReference = container.querySelector('.reference-entry');
    const newReference = firstReference.cloneNode(true);

    // İçerikleri temizle
    newReference.querySelectorAll('input, textarea').forEach(input => {
        input.value = '';
    });

    container.insertBefore(newReference, container.querySelector('.action-buttons-reference'));
}

// Referans bilgisi sil
function removeReference() {
    const container = document.getElementById('references-section');
    const referenceEntries = container.querySelectorAll('.reference-entry');

    // En az bir giriş kalmalı
    if (referenceEntries.length > 1) {
        referenceEntries[referenceEntries.length - 1].remove();
    }
}
