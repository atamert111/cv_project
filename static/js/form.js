const steps = document.querySelectorAll('.step');
const formSteps = document.querySelectorAll('.form-step');
let currentStep = 0;

// Adım Geçişlerini Güncelle
function updateSteps() {
    steps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
    });
    formSteps.forEach((formStep, index) => {
        formStep.classList.toggle('active', index === currentStep);
    });

    // Geri butonu görünürlüğü
    document.getElementById('prevBtn').style.display = currentStep > 0 ? 'inline-block' : 'none';

    // İleri veya Tamamla butonu
    if (currentStep === steps.length - 1) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'inline-block';
    } else {
        document.getElementById('nextBtn').style.display = 'inline-block';
        document.getElementById('submitBtn').style.display = 'none';
    }
}

// Profil Resmi Önizleme
document.getElementById('profile_photo').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-preview').src = e.target.result;
            document.getElementById('photo-status').textContent = "Resim Yüklendi.";
        };
        reader.readAsDataURL(file);
    }
});

// Zorunlu Alan Kontrolü ve "İleri" İşlevi
document.getElementById('nextBtn').addEventListener('click', function () {
    const requiredFields = document.querySelectorAll('.form-step.active [required]');
    let allValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
            allValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });

    if (allValid) {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateSteps();
        }
    } else {
        alert("Lütfen tüm zorunlu alanları doldurun.");
    }
});

// "Geri" İşlevi
document.getElementById('prevBtn').addEventListener('click', function () {
    if (currentStep > 0) {
        currentStep--;
        updateSteps();
    }
});

// İlk Adımı Güncelle
updateSteps();
