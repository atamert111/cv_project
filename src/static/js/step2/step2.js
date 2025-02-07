// 🏁 Önceki ve Sonraki Sayfaya Yönlendirme
function navigatePrevious() {
    window.location.href = '/step1';
}

function navigateNext() {
    window.location.href = '/step3';
}

// 🔄 Accordion Aç/Kapa İşlevi
function toggleAccordion(header) {
    const allContents = document.querySelectorAll('.accordion-content');
    const allHeaders = document.querySelectorAll('.accordion-header');
    const content = header.nextElementSibling;
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        header.classList.remove('active');
    } else {
        allContents.forEach(item => item.classList.remove('active'));
        allHeaders.forEach(item => item.classList.remove('active'));

        content.classList.add('active');
        header.classList.add('active');
    }
}

// ✅ İş Deneyimi Alanında Bitiş Tarihini Devre Dışı Bırakma (Halen Çalışıyorum)
function toggleEndDate(checkbox) {
    const jobEntry = checkbox.closest('.job-entry'); // Doğru parent sınıfı hedefleyin
    const endDateContainer = jobEntry.querySelector("#end_date_container");
    const endDateInput = jobEntry.querySelector('[name="job_end_date"]');

    if (checkbox.checked) {
        if (endDateInput) {
            endDateInput.value = '';
            endDateInput.disabled = true;
        }
        if (endDateContainer) endDateContainer.style.display = "none";
    } else {
        if (endDateInput) endDateInput.disabled = false;
        if (endDateContainer) endDateContainer.style.display = "block";
    }
}


// 🔄 **"Aynı şirkette çalışıyorum" butonu aktif/pasif yapma**
function toggleSameCompany(button) {
    const jobEntries = document.querySelectorAll('.job-entry'); // Tüm iş deneyimlerini al
    const jobEntry = button.closest('.job-entry'); // İlgili iş formunu bul
    const companySection = jobEntry.querySelector('.inline'); // Şirket adı bölümünü bul
    const jobTitle = jobEntry.querySelector('.job-title'); // Başlığı bul
    let previousEntry = null;

    // Önceki iş girişini bul
    for (let i = 1; i < jobEntries.length; i++) {
        if (jobEntries[i] === jobEntry) {
            previousEntry = jobEntries[i - 1]; // Bir önceki iş deneyimini bul
            break;
        }
    }

    if (button.classList.contains('active')) {
        // **Pasif Durum (Mavi) - Şirket Adını ve Başlığı Geri Getir**
        if (companySection) companySection.style.display = 'flex';
        if (jobTitle) jobTitle.style.display = 'block';

        button.style.backgroundColor = 'transparent';
        button.style.color = '#007bff';

        // **Önceki girişin Remove butonunu geri getir**
        if (previousEntry) {
            let prevRemoveButton = previousEntry.querySelector('.remove-btn');
            if (prevRemoveButton) {
                prevRemoveButton.style.display = 'inline-block';
                prevRemoveButton.disabled = false;
            }
        }
    } else {
        // **Aktif Durum (Yeşil) - Şirket Adı ve Başlığı Gizle**
        if (companySection) companySection.style.display = 'none';
        if (jobTitle) jobTitle.style.display = 'none';

        button.style.backgroundColor = 'transparent';
        button.style.color = '#218838';

        // **Önceki girişin Remove butonunu gizle**
        if (previousEntry) {
            let prevRemoveButton = previousEntry.querySelector('.remove-btn');
            if (prevRemoveButton) {
                prevRemoveButton.style.display = 'none';
                prevRemoveButton.disabled = true;
            }
        }
    }

    // Butona tıklayınca sınıfı değiştir
    button.classList.toggle('active');

    // Başlıkları güncelle
    updateJobTitles();
}

// 🔄 **Sayfa Yüklendiğinde Çalıştırılacak İşlemler**
document.addEventListener("DOMContentLoaded", function () {
    const stillWorkingCheckbox = document.getElementById("still_working");
    toggleEndDate(stillWorkingCheckbox);
});

// ✅ **İş Deneyimi Ekleme Fonksiyonu**// ✅ **İş Deneyimi Ekleme Fonksiyonu**
window.addJobEntry = function () {
    let container = document.getElementById("job-experiences");
    let entries = document.querySelectorAll(".job-entry");
    let lastEntry = entries[entries.length - 1];

    if (!lastEntry) return;

    // Yeni giriş için kopya oluştur
    let newEntry = lastEntry.cloneNode(true);

    // Form içindeki inputları temizle
    newEntry.querySelectorAll("input, select, textarea").forEach(input => {
        if (input.type !== "checkbox") {
            input.value = "";
        } else {
            input.checked = false; // Yeni girişte checkbox işaretli olmayacak
        }
    });

    // Checkbox durumu sıfırlandığı için bitiş tarihi alanını aç
    let stillWorkingCheckbox = newEntry.querySelector('input[name="still_working"]');
    if (stillWorkingCheckbox) {
        stillWorkingCheckbox.checked = false; // Varsayılan olarak işaretli olmasın
        toggleEndDate(stillWorkingCheckbox); // Bitiş tarihini aktif et
    }

    // Yeni başlık numarasını belirle
    let newIndex = entries.length + 1;
    let title = newEntry.querySelector(".job-title");
    if (title) {
        title.innerText = `${newIndex}. Şirket Bilgileri`;
    }

    // Yeni giriş içindeki `+` butonunu kaldır
    let clonedAddButton = newEntry.querySelector(".job-add-button-wrapper");
    if (clonedAddButton) {
        clonedAddButton.remove();
    }

    // ✅ "Aynı İş Yeri" butonunu pasif hale getir
    let sameCompanyButton = newEntry.querySelector(".toggle-button");
    if (sameCompanyButton) {
        sameCompanyButton.classList.remove("active"); // Aktif sınıfını kaldır
    }

    // Yeni girişte "Aynı İş Yeri" butonunu sıfırla ve tekrar göster
    let sameCompanyButtonContainer = newEntry.querySelector(".toggle-container");
    if (sameCompanyButtonContainer) {
        sameCompanyButtonContainer.style.display = "block"; // Yeni eklenenlerde butonu göster
    }

    // Yeni girişin şirket adı ve başlık bölümlerini görünür yap
    let companySection = newEntry.querySelector(".inline");
    let jobTitle = newEntry.querySelector(".job-title");

    if (companySection) companySection.style.display = "flex"; // Şirket adını göster
    if (jobTitle) jobTitle.style.display = "block"; // Pozisyon başlığını göster

    // Yeni giriş sayfaya eklenir
    container.appendChild(newEntry);

    // Başlıkları ve butonları güncelle
    updateJobTitles();
    updateJobAddButton();
};

// Sayfa yüklendiğinde ilk girişin buton durumunu düzelt
window.onload = function () {
    let entries = document.querySelectorAll(".job-entry");
    entries.forEach((entry, index) => {
        let toggleContainer = entry.querySelector(".toggle-container");
        if (index > 0) {
            toggleContainer.style.display = "block"; // İlk giriş hariç butonu göster
        } else {
            toggleContainer.style.display = "none"; // İlk girişte buton görünmesin
        }
    });
};


// 🗑 **İş Deneyimi Silme Fonksiyonu**
window.removeJobEntry = function (btn) {
    let container = document.getElementById("job-experiences");
    let entries = document.querySelectorAll(".job-entry");

    if (entries.length <= 1) {
        alert("En az bir iş deneyimi kalmalıdır!");
        return;
    }

    let entryToRemove = btn.closest(".job-entry");
    let previousEntry = null;

    // Önceki girişin hangisi olduğunu bul
    for (let i = 1; i < entries.length; i++) {
        if (entries[i] === entryToRemove) {
            previousEntry = entries[i - 1];
            break;
        }
    }

    // Eğer önceki girişin Remove butonu gizlenmişse, tekrar görünür yap
    if (previousEntry) {
        let prevSameCompanyButton = previousEntry.querySelector('.same-company-btn');

        if (prevSameCompanyButton && prevSameCompanyButton.classList.contains('active')) {
            let prevRemoveButton = previousEntry.querySelector('.remove-btn');
            if (prevRemoveButton) {
                prevRemoveButton.style.display = 'inline-block';
                prevRemoveButton.disabled = false;
            }
        }
    }

    // Eğer silinecek giriş `+` butonunu içeriyorsa, önceki girişe taşı
    let addButtonWrapper = document.querySelector(".job-add-button-wrapper");
    if (entryToRemove.contains(addButtonWrapper)) {
        let previousEntry = entryToRemove.previousElementSibling;
        if (previousEntry && previousEntry.classList.contains("job-entry")) {
            previousEntry.appendChild(addButtonWrapper);
        } else {
            // Eğer önceki giriş yoksa butonu job-experiences içine ekle
            container.appendChild(addButtonWrapper);
        }
    }

    // Girişi kaldır
    entryToRemove.remove();

    // Başlıkları ve butonları güncelle
    updateJobTitles();
    updateJobAddButton();
};


function updateJobTitles() {
    const jobEntries = document.querySelectorAll('.job-entry');
    let jobCounter = 1;

    jobEntries.forEach((entry, index) => {
        const jobTitle = entry.querySelector('.job-title');

        if (jobTitle) {
            if (jobTitle.style.display !== 'none') { 
                // Görünür başlıkları say ve numaralandır
                jobTitle.textContent = ` ${jobCounter}. Şirket Bilgileri`;
                jobCounter++;
            }
        }
    });
}

// ✅ **Job "Add" Butonunu Yönet**
function updateJobAddButton() {
    let container = document.getElementById("job-experiences");
    let addButtonWrapper = document.querySelector(".job-add-button-wrapper");
    let entries = document.querySelectorAll(".job-entry");

    if (!addButtonWrapper) return;

    // Eğer hiç iş deneyimi kalmadıysa, `+` butonunu doğrudan `job-experiences` div'ine ekle
    if (entries.length === 0) {
        container.appendChild(addButtonWrapper);
        addButtonWrapper.style.display = "flex";
        return;
    }

    // Her zaman son girişe `+` butonunu taşı
    let lastEntry = entries[entries.length - 1];
    if (lastEntry) {
        lastEntry.appendChild(addButtonWrapper);
        addButtonWrapper.style.display = "flex";
    }
}



// 🏁 **Sayfa Yüklendiğinde Başlıkları ve Butonları Güncelle**
document.addEventListener("DOMContentLoaded", function () {
    updateJobTitles();
    updateJobAddButton();
});


function centerAddButton() {
    const addButton = document.querySelector('.add-btn');
    if (addButton) {
        addButton.style.position = 'relative';
        addButton.style.left = '50%';
        addButton.style.transform = 'translateX(-50%)';
    }
}

// Sayfa yüklendiğinde çağır
window.onload = centerAddButton;
