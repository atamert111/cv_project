document.addEventListener("DOMContentLoaded", function () {
    // Yeni dil ekleme fonksiyonu
    window.addLanguage = function () {
        let container = document.getElementById("language-list");
        let entries = document.querySelectorAll(".language-entry");
        let lastEntry = entries[entries.length - 1];

        // Yeni giriş için kopya oluştur
        let newEntry = lastEntry.cloneNode(true);

        // Form içindeki inputları temizle
        newEntry.querySelectorAll("input, select").forEach(input => {
            input.value = "";
        });

        // Eski silme butonunu kaldır
        newEntry.querySelectorAll(".remove-btn").forEach(btn => btn.remove());

        // Yeni satır sonuna "-" butonu ekle
        let removeButton = document.createElement("b");
        removeButton.className = "cta-button_lang remove-btn";
        removeButton.innerText = "-";
        removeButton.onclick = function () {
            removeLanguage(this);
        };

        newEntry.appendChild(removeButton);

        // Yeni giriş sayfaya eklenir
        container.appendChild(newEntry);

        // "+ Ekle" butonunun yerini sabit tut
        moveAddButton();
    };

    // Dil silme fonksiyonu
    window.removeLanguage = function (btn) {
        let entries = document.querySelectorAll(".language-entry");
        if (entries.length > 1) {
            btn.closest(".language-entry").remove();
            moveAddButton();
        } else {
            alert("En az bir dil bilgisi girilmelidir!");
        }
    };

    // "+ Ekle" butonunu en sona taşıyan fonksiyon
    function moveAddButton() {
        let container = document.getElementById("language-section");
        let addButtonWrapper = document.querySelector(".lang-add-button-wrapper");

        // "+ Ekle" butonu varsa en sona taşır
        if (addButtonWrapper) {
            container.appendChild(addButtonWrapper);
        }
    }

    // Sayfa yüklendiğinde butonları düzenle
    moveAddButton();
});
