// step2.js

document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.accordion-header');

    // Accordion başlıklarına tıklanarak içeriklerin açılıp kapanmasını sağla
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');
                content.style.display = 'block';
            }
        });
    });

    // Yeni iş deneyimi ekleme fonksiyonu
    const addJobButton = document.getElementById('addJob');
    if (addJobButton) {
        addJobButton.addEventListener('click', () => {
            const jobContainer = document.getElementById('job-experiences');
            const newJob = document.querySelector('.job-entry').cloneNode(true);
            newJob.querySelectorAll('input').forEach(input => input.value = '');
            jobContainer.appendChild(newJob);
        });
    }

    // İş deneyimi kaldırma fonksiyonu
    const removeJobButton = document.getElementById('removeJob');
    if (removeJobButton) {
        removeJobButton.addEventListener('click', () => {
            const jobEntries = document.querySelectorAll('.job-entry');
            if (jobEntries.length > 1) {
                jobEntries[jobEntries.length - 1].remove();
            }
        });
    }

    // "Aynı iş yeri" seçildiğinde şirket adını gizle
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('same-company-checkbox')) {
            const companyName = e.target.closest('.job-entry').querySelector('#company_name');
            if (e.target.checked) {
                companyName.value = '';
                companyName.style.display = 'none';
            } else {
                companyName.style.display = 'block';
            }
        }
    });
});
