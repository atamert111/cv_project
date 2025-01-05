// Yeni sertifika bilgisi ekle
function addCertificate() {
    const container = document.getElementById('certificate-section');
    const firstCertificate = container.querySelector('.certificate-entry');

    // Yeni sertifika girişi oluştur
    const newCertificate = firstCertificate.cloneNode(true);

    // İçerikleri temizle
    newCertificate.querySelectorAll('input').forEach(input => {
        input.value = '';
    });

    // Yeni alanı butonların önüne ekle
    container.insertBefore(newCertificate, container.querySelector('.action-buttons-certificate'));
}

// Sertifika bilgisi sil
function removeCertificate() {
    const container = document.getElementById('certificate-section');
    const certificateEntries = container.querySelectorAll('.certificate-entry');

    // En az bir giriş kalmalı
    if (certificateEntries.length > 1) {
        certificateEntries[certificateEntries.length - 1].remove();
    }
}
