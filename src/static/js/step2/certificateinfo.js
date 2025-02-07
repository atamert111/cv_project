document.addEventListener("DOMContentLoaded", function () {
    checkCertificateButtonVisibility();
});

function addCertificateEntry() {
    let certificateSection = document.getElementById("certificate-section");
    let certificateEntries = document.getElementsByClassName("certificate-entry");
    let certificateNumber = certificateEntries.length + 1; // Yeni sertifika numarası

    let newEntry = document.createElement("div");
    newEntry.classList.add("certificate-entry");

    newEntry.innerHTML = `
        <div class="cert-title">${certificateNumber}. Sertifika Bilgileri</div>

        <div class="inline">
            <input type="text" name="certificate_name[]" placeholder=" " required>
            <label for="certificate_name">Sertifika Adı:</label>
        </div>

        <div class="grouped2">
            <div class="inline">
                <input type="number" name="certificate_year[]" placeholder="" min="1900" max="2099">
                <label for="certificate_year">Sertifika Yılı (Opsiyonel):</label>
            </div>
            <div class="inline">
                <input type="text" name="certificate_place[]" placeholder=" ">
                <label for="certificate_place">Alındığı Yer (Opsiyonel):</label>
            </div>
        </div>

        <b class="cta-button_cert remove-btn" onclick="removeCertificateEntry(this)">-</b>
    `;

    let addButtonContainer = document.getElementById("add-certificate-container");
    certificateSection.insertBefore(newEntry, addButtonContainer);

    updateCertificateNumbers();
    checkCertificateButtonVisibility();
}

function removeCertificateEntry(button) {
    let entry = button.closest(".certificate-entry");
    entry.remove();
    updateCertificateNumbers();
    checkCertificateButtonVisibility();
}

function updateCertificateNumbers() {
    let certificateEntries = document.getElementsByClassName("certificate-entry");
    for (let i = 0; i < certificateEntries.length; i++) {
        let title = certificateEntries[i].querySelector(".cert-title");
        title.textContent = `${i + 1}. Sertifika Bilgileri`;
    }
}

function checkCertificateButtonVisibility() {
    let certificateEntries = document.getElementsByClassName("certificate-entry");
    let addButtonContainer = document.getElementById("add-certificate-container");

    if (certificateEntries.length === 0) {
        addButtonContainer.style.display = "block";
    } else {
        addButtonContainer.style.display = "flex";
    }
}
