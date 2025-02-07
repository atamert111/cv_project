const profilePhotoInput = document.getElementById("profile_photo");
const profilePreview = document.getElementById("profile-preview");
const hoverText = document.getElementById("hover-text");
const photoStatus = document.getElementById("photo-status");
const removePhotoButton = document.getElementById("remove-photo");
const infoButton = document.getElementById("info-button");
const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.top-buttons');

// Hamburger Menü Aç/Kapa
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Form Gönderimini Desteklemek İçin redirectToStep2 Kaldırıldı
// Form zaten "action" ve "method" ile sunucuya gönderilecek

// Hover Yazısına veya Resme Tıklayınca Dosya Yükleme
hoverText.addEventListener("click", () => {
    profilePhotoInput.click();
});

profilePreview.addEventListener("click", () => {
    profilePhotoInput.click();
});

// Dosya Seçildiğinde İşlemler
profilePhotoInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
        // Resmi Önizlemek İçin FileReader
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePreview.src = e.target.result;
            profilePreview.alt = "Yüklenen Profil Resmi";
        };
        reader.readAsDataURL(file);

        // Profil Resminin Altında Durum Yazısını Göster
        photoStatus.textContent = "Profil Resmi Yüklendi";
        photoStatus.style.color = "green";
        photoStatus.style.display = "block";

        // Çarpı Butonunu Göster, Soru İşaretini Gizle
        removePhotoButton.style.display = "block";
        infoButton.style.display = "none";
    }
});

// Çarpı Butonuna Tıklayınca Resmi Kaldır
removePhotoButton.addEventListener("click", () => {
    profilePreview.src = "/static/images/profilresmi.png";
    profilePreview.alt = "Varsayılan Profil Resmi";

    // Durum Yazısını Gizle
    photoStatus.style.display = "none";

    // Soru İşaretini Göster, Çarpı Butonunu Gizle
    removePhotoButton.style.display = "none";
    infoButton.style.display = "block";
});

// Soru İşaretine Tıklayınca Pop-Up Göster
infoButton.addEventListener("click", () => {
    alert("Profil resmini yüklemek için fotoğrafa tıklayın.");
});

document.addEventListener('DOMContentLoaded', function () {
    // Mevcut URL'yi al
    const currentPath = window.location.pathname;

    // Tüm linkleri kontrol et
    const links = document.querySelectorAll('.top-button');

    links.forEach(link => {
        // Linkin href özelliğini al
        const linkHref = link.getAttribute('href');

        // Eğer URL'ler eşleşirse active sınıfını ekle, yoksa kaldır
        if (currentPath === linkHref || (currentPath === '/' && linkHref === '/#')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
document.querySelector('form').addEventListener('submit', function (event) {
    console.log('Form gönderiliyor...');
});
