document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".modern-form");
    const nextButton = document.querySelector(".cta-button3");
    const accordions = document.querySelectorAll(".accordion-header"); // 🔹 Accordion başlıklarını seç

    function checkRequiredFields() {
        let missingRequiredFields = [];

        accordions.forEach(accordion => {
            const section = accordion.nextElementSibling; // 🔹 Header’in hemen altındaki içerik
            const requiredFields = section.querySelectorAll("input[required], textarea[required]");
            
            let hasRequiredError = false;

            requiredFields.forEach(input => {
                if (input.value.trim() === "") {
                    hasRequiredError = true;
                    missingRequiredFields.push(input.name); // Eksik required alanları listele
                }
            });

            if (hasRequiredError) {
                accordion.style.background = "linear-gradient(to bottom right, #FF0000, #FFFFFF, #FF0000)"; // ❌ Kırmızı gradient (Eksik required alan var)
            } else {
                accordion.style.background = "linear-gradient(to bottom right, #4CAF50, #FFFFFF, #4CAF50)"; // ✅ Yeşil gradient (Tüm required alanlar dolu)
            }
        });

        return missingRequiredFields;
    }

    // Kullanıcı her alanı değiştirdiğinde başlık rengini güncelle
    document.querySelectorAll("input, textarea").forEach(input => {
        input.addEventListener("input", checkRequiredFields);
    });

    nextButton.addEventListener("click", function (event) {
        const missingRequiredFields = checkRequiredFields();

        if (missingRequiredFields.length > 0) {
            event.preventDefault(); // ❗️ Eksik required alan varsa formu göndermeyi engelle
            const warningMessage = document.createElement('div');
            warningMessage.innerHTML = "Lütfen <span style='color:red;'>kırmızı</span> renkle vurgulanan bölümlerde, <strong>zorunlu (*)</strong> alanları doldurduğunuzdan emin olun!";
            warningMessage.style.position = "fixed";
            warningMessage.style.top = "50%";
            warningMessage.style.left = "50%";
            warningMessage.style.transform = "translate(-50%, -50%)";
            warningMessage.style.background = "white";
            warningMessage.style.padding = "15px";
            warningMessage.style.border = "1px solid red";
            warningMessage.style.borderRadius = "5px";
            warningMessage.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.5)";
            warningMessage.style.zIndex = "9999"; // Sayfanın en önüne getir
            warningMessage.style.textAlign = "center";

            const closeButton = document.createElement('button');
            closeButton.innerText = "Kapat";
            closeButton.style.marginTop = "10px";
            closeButton.style.display = "inline-block";
            closeButton.style.width = "auto";
            closeButton.style.background = "gray";
            closeButton.style.color = "white";
            closeButton.style.border = "none";
            closeButton.style.padding = "5px 10px";
            closeButton.style.cursor = "pointer";
            closeButton.style.borderRadius = "3px";

            closeButton.addEventListener("click", function () {
                document.body.removeChild(warningMessage);
            });
            
            warningMessage.appendChild(document.createElement("br")); // Satır atlamak için
            warningMessage.appendChild(closeButton);
            document.body.appendChild(warningMessage);
        } else {
            console.log("Form başarıyla gönderiliyor...");
            form.submit(); // ✅ Eksik alan yoksa formu gönder
        }
    });

    // Sayfa yüklendiğinde eksik alanları kontrol et
    checkRequiredFields();
});
