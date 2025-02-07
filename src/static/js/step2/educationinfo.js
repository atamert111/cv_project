// Eğitim bölümü ekleme fonksiyonu
window.addEducationEntry = function () {
    let container = document.getElementById("education-experiences");
    let entries = document.querySelectorAll(".education-entry");
    let lastEntry = entries[entries.length - 1];

    if (!lastEntry) return;

    // Yeni giriş için kopya oluştur
    let newEntry = lastEntry.cloneNode(true);

    // Form içindeki inputları temizle
    newEntry.querySelectorAll("input, select").forEach(input => {
        if (input.type !== "checkbox") {
            input.value = "";
        } else {
            input.checked = false; // Checkbox'ı default pasif yap
        }
    });

    // Yeni başlık numarasını belirle
    let newIndex = entries.length + 1;
    let title = newEntry.querySelector(".edu-title");
    if (title) {
        title.innerText = `${newIndex}. Eğitim Kurumu Bilgileri`;
    }

    // Yeni giriş içindeki `+` butonunu kaldır
    let clonedAddButton = newEntry.querySelector(".edu-add-button-wrapper");
    if (clonedAddButton) {
        clonedAddButton.remove();
    }

    // Yeni giriş sayfaya eklenir
    container.appendChild(newEntry);

    // 📌 Eğer yeni girişte "Halen Öğrenciyim" checkbox'ı varsa, güncellemeyi tetikle
    let studentCheckbox = newEntry.querySelector(".edu-checkbox");
    if (studentCheckbox) {
        studentCheckbox.checked = false; // Varsayılan olarak pasif yap
        toggleEndDateEdu(studentCheckbox); // Mezuniyet Yılı & Puanını otomatik aç
    }

    // Başlıkları ve butonları güncelle
    updateEducationTitles();
    updateAddButton();
};

// Eğitim bölümü silme fonksiyonu
function removeEducationEntry(button) {
    let entry = button.closest(".education-entry");
    entry.remove(); // Seçili bölümü kaldır

    let educationContainer = document.getElementById("education-experiences");
    let entries = educationContainer.getElementsByClassName("education-entry");

    // Eğer hiç eğitim bölümü kalmadıysa, bir tane varsayılan olarak ekleyelim
    if (entries.length === 0) {
        addEducationEntry();
    }

    // Mevcut tüm add butonlarını kaldır
    let addButtonWrapper = document.querySelector(".edu-add-button-wrapper");
    if (addButtonWrapper) {
        addButtonWrapper.remove();
    }

    // Yeni son girişin altına add butonunu ekle
    if (entries.length > 0) {
        let lastEntry = entries[entries.length - 1];
        let newAddButtonWrapper = document.createElement("div");
        newAddButtonWrapper.classList.add("edu-add-button-wrapper");
        newAddButtonWrapper.innerHTML = '<a class="cta-button_edu add-btn" onclick="addEducationEntry()">+</a>';
        lastEntry.appendChild(newAddButtonWrapper);
    }
}

// Eğitim başlıklarını güncelleyen fonksiyon
function updateEducationTitles() {
    let entries = document.querySelectorAll(".education-entry");
    entries.forEach((entry, index) => {
        let title = entry.querySelector(".edu-title");
        if (title) {
            title.innerText = `${index + 1}. Eğitim Kurumu Bilgileri`;
        }
    });
}


// Fazladan `+` butonlarını kaldır ve doğru konuma taşı
// Fazladan `+` butonlarını kaldır ve doğru konuma taşı
function updateAddButton() {
    let container = document.getElementById("education-experiences");
    let addButtonWrapper = document.querySelector(".edu-add-button-wrapper");
    let entries = document.querySelectorAll(".education-entry");

    // Eğer hiç eğitim bölümü kalmadıysa butonu doğrudan container'a ekle
    if (!addButtonWrapper) return;
    
    if (entries.length === 0) {
        container.appendChild(addButtonWrapper);
        addButtonWrapper.style.display = "flex";
        return;
    }

    // Eğer halen eğitim bölümü varsa, butonu son aktif sekmeye taşı
    let lastEntry = entries[entries.length - 1];

    if (lastEntry) {
        lastEntry.appendChild(addButtonWrapper);
        addButtonWrapper.style.display = "flex";
    }
}


// "Halen devam ediyorum" seçildiğinde mezuniyet yılı alanını devre dışı bırak
function toggleEndYear(checkbox) {
    const endYear = checkbox.closest('.four-column').querySelector('[name="edu_end_date[]"]');
    if (checkbox.checked) {
        endYear.value = '';
        endYear.disabled = true;
    } else {
        endYear.disabled = false;
    }
}

// Sayfa yüklendiğinde başlıkları ve butonları güncelle
document.addEventListener("DOMContentLoaded", function () {
    updateEducationTitles();
    updateAddButton();
});
function toggleEndDateEdu(checkbox2) {
    let endDateInput = checkbox2.closest('.four-column').querySelector('input[name="edu_end_date[]"]');
    let gradeInput = checkbox2.closest('.four-column').querySelector('input[name="edu_grade[]"]');

    if (checkbox2.checked) {
        // Mezuniyet yılı ve puanı temizle
        if (endDateInput) endDateInput.value = "";
        if (gradeInput) gradeInput.value = "";

        // Alanları gizle
        if (endDateInput) endDateInput.parentElement.style.display = "none";
        if (gradeInput) gradeInput.parentElement.style.display = "none";

        // Metni değiştir
        checkbox2.style.setProperty("--content", "'✔ Halen Öğrenciyim'");
    } else {
        // Alanları tekrar göster
        if (endDateInput) endDateInput.parentElement.style.display = "block";
        if (gradeInput) gradeInput.parentElement.style.display = "block";

        // Varsayılan metne dön
        checkbox2.style.setProperty("--content", "'Halen Öğremciysen Buraya Tıkla'");
    }
}
