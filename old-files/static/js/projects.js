// Yeni proje bilgisi ekle
function addProject() {
    const container = document.getElementById('projects-section');
    const firstProject = container.querySelector('.project-entry');
    const newProject = firstProject.cloneNode(true);

    // İçerikleri temizle
    newProject.querySelectorAll('input, textarea').forEach(input => {
        input.value = '';
    });

    container.insertBefore(newProject, container.querySelector('.action-buttons-project'));
}

// Proje bilgisi sil
function removeProject() {
    const container = document.getElementById('projects-section');
    const projectEntries = container.querySelectorAll('.project-entry');

    // En az bir giriş kalmalı
    if (projectEntries.length > 1) {
        projectEntries[projectEntries.length - 1].remove();
    }
}
