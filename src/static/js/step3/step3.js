document.addEventListener("DOMContentLoaded", function () {
    const selectedTemplateInput = document.getElementById("selectedTemplate");
    const buttons = document.querySelectorAll(".select-btn");
    const containers = document.querySelectorAll(".carousel-container");
    const prevButton = document.getElementById("prevStep");
    const nextButton = document.getElementById("nextStep");
    const body = document.querySelector("body");
    const images = document.querySelectorAll(".carousel-container img");
    const overlays = document.querySelectorAll(".overlay-text");
    const warningPopup = document.getElementById("popupWarning"); 
    const closePopupButton = document.getElementById("closePopup");

    console.log("nextButton:", nextButton);
    if (!nextButton) {
        console.error("HATA: Sonraki Adım butonu bulunamadı!");
        return;
    }

    nextButton.removeAttribute("disabled");
    
    console.log("Sonraki Adım butonu bulundu, event listener ekleniyor...");
    
    function showWarning(message) {
        const warningText = warningPopup.querySelector("p");
        if (warningText) {
            warningText.innerText = message;
        }
        warningPopup.style.display = "block";
        warningPopup.classList.add("show");
        
        setTimeout(() => {
            warningPopup.classList.remove("show");
            warningPopup.style.display = "none";
        }, 3000);
    }

    if (closePopupButton) {
        closePopupButton.addEventListener("click", function () {
            warningPopup.classList.remove("show");
            warningPopup.style.display = "none";
        });
    }

    function updateSelection(template) {
        console.log(`Şablon ${template} seçildi!`);
    
        // Eğer aynı butona tekrar tıklanırsa seçimi kaldır
        if (selectedTemplateInput.value === template) {
            console.log(`Şablon ${template} kaldırıldı!`);
            selectedTemplateInput.value = ""; // Seçili şablonu sıfırla
    
            containers.forEach(container => container.classList.remove("selected"));
            buttons.forEach(btn => {
                btn.classList.remove("selected");
                btn.innerText = "Seç";
            });
    
            return; // Fonksiyondan çık
        }
    
        // Yeni şablon seçildiğinde önce tüm seçili olanları temizle
        containers.forEach(container => container.classList.remove("selected"));
        buttons.forEach(btn => {
            btn.classList.remove("selected");
            btn.innerText = "Seç";
        });
    
        // Seçili şablonu güncelle
        selectedTemplateInput.value = template;
    
        // Seçili butonu belirle ve güncelle
        const selectedBtn = document.querySelector(`.select-btn[data-template="${template}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add("selected");
            selectedBtn.innerText = "Seçildi";
        }
    }
    

    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const template = this.getAttribute("data-template");
            updateSelection(template);
        });
    });

    nextButton.addEventListener("click", function (event) {
        console.log("Sonraki Adım butonuna tıklandı!");
        
        if (!selectedTemplateInput.value) {
            event.preventDefault();
            console.log("Şablon seçilmedi! Uyarı gösteriliyor.");
    
            // Eğer uyarı zaten varsa tekrar ekleme
            if (document.getElementById("custom-warning-box")) return;
    
            // Uyarı kutusunu oluştur
            const warningBox = document.createElement('div');
            warningBox.id = "custom-warning-box";
            warningBox.innerHTML = `
                <div class="warning-content">
                    <h3>Şablon Seçilmedi!</h3>
                    <p>Lütfen bir <strong>şablon</strong> seçin ve tekrar deneyin.</p>
                    <button id="closeWarning">Tamam</button>
                </div>
            `;
    
            document.body.appendChild(warningBox);
    
            // Kapatma butonunu çalıştır
            document.getElementById("closeWarning").addEventListener("click", function () {
                document.body.removeChild(warningBox);
            });
        } else {
            console.log("Şablon seçildi, yönlendirme yapılıyor...");
            window.location.href = "/result";
        }
    });
    

    prevButton.addEventListener("click", function () {
        window.location.href = "/step2";
    });

    images.forEach(image => {
        image.addEventListener("click", function () {
            openImage(this);
        });
    });

    function openImage(imgElement) {
        const existingExpanded = document.querySelector(".expanded-img-container");
        if (existingExpanded) {
            existingExpanded.remove();
        }

        const expandedImgContainer = document.createElement("div");
        expandedImgContainer.classList.add("expanded-img-container");

        const imgClone = document.createElement("img");
        imgClone.src = imgElement.src;
        imgClone.classList.add("expanded-img");

        const closeButton = document.createElement("button");
        closeButton.innerHTML = "×";
        closeButton.classList.add("close-btn");
        closeButton.addEventListener("click", function () {
            expandedImgContainer.remove();
        });

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        buttonContainer.appendChild(closeButton);

        expandedImgContainer.appendChild(imgClone);
        expandedImgContainer.appendChild(buttonContainer);
        document.body.appendChild(expandedImgContainer);
    }

    overlays.forEach(overlay => {
        overlay.addEventListener("click", function (event) {
            event.stopPropagation();
            const parentImg = this.closest(".carousel-container").querySelector("img");
            if (parentImg) {
                openImage(parentImg);
            }
        });
    });
});
