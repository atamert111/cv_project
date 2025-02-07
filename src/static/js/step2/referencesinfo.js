document.addEventListener("DOMContentLoaded", function () {
    checkReferenceButtonVisibility();
});

function addReferenceEntry() {
    let referenceSection = document.getElementById("references-section");
    let referenceEntries = document.getElementsByClassName("reference-entry");
    let referenceNumber = referenceEntries.length + 1; // Yeni referans numarası

    let newEntry = document.createElement("div");
    newEntry.classList.add("reference-entry");

    newEntry.innerHTML = `
        <div class="ref-title">${referenceNumber}. Referans Bilgileri</div>

        <div class="inline">
            <input type="text" name="reference_name[]" placeholder=" " required>
            <label for="reference_name">Referans Adı:</label>
        </div>

        <div class="reference-group">
            <div class="inline position-field">
                <input type="text" name="reference_position[]" placeholder=" " required>
                <label for="reference_position">Referansın Pozisyonu:</label>
            </div>

            <div class="inline contact-field">
                <input type="text" name="reference_contact[]" placeholder=" " required>
                <label for="reference_contact">İletişim Bilgileri:</label>
            </div>
        </div>

        <b class="cta-button_ref remove-btn" onclick="removeReferenceEntry(this)">-</b>
    `;

    let addButtonContainer = document.getElementById("add-reference-container");
    referenceSection.insertBefore(newEntry, addButtonContainer);

    updateReferenceNumbers();
    checkReferenceButtonVisibility();
}


function removeReferenceEntry(button) {
    let entry = button.closest(".reference-entry");
    entry.remove();
    updateReferenceNumbers();
    checkReferenceButtonVisibility();
}

function updateReferenceNumbers() {
    let referenceEntries = document.getElementsByClassName("reference-entry");
    for (let i = 0; i < referenceEntries.length; i++) {
        let title = referenceEntries[i].querySelector(".ref-title");
        title.textContent = `${i + 1}. Referans Bilgileri`;
    }
}

function checkReferenceButtonVisibility() {
    let referenceEntries = document.getElementsByClassName("reference-entry");
    let addButtonContainer = document.getElementById("add-reference-container");

    if (referenceEntries.length === 0) {
        addButtonContainer.style.display = "block";
    } else {
        addButtonContainer.style.display = "flex";
    }
}
