document.addEventListener("DOMContentLoaded", function () {
    checkAddButtonVisibility();
});

function addProjectEntry() {
    let projectSection = document.getElementById("projects-section");
    let projectEntries = document.getElementsByClassName("project-entry");
    let projectNumber = projectEntries.length + 1; // Yeni proje numarası

    let newEntry = document.createElement("div");
    newEntry.classList.add("project-entry");

    newEntry.innerHTML = `
        <div class="proj-title">${projectNumber}. Proje Bilgileri</div>

        <div class="inline">
            <input type="text" name="project_name[]" placeholder=" " required>
            <label for="project_name">Proje Adı:</label>
        </div>
        
        <div class="grouped2">
            <div class="inline">
                <input type="date" name="project_date[]" placeholder=" " required>
                <label for="project_date">Proje Tarihi:</label>
            </div>
            <div class="inline">
                <input type="text" name="project_link[]" placeholder=" ">
                <label for="project_link">Proje Linki (Opsiyonel): "GitHub veya başka bir link"</label>
            </div>
        </div>

        <div class="inline2">
            <textarea name="project_description[]" class="text-content" placeholder=" " required></textarea>
            <label for="project_description">Proje Açıklaması (Opsiyonel):</label>
        </div>

        <b class="cta-button_proj remove-btn" onclick="removeProjectEntry(this)">-</b>
    `;

    let addButtonContainer = document.getElementById("add-button-container");
    projectSection.insertBefore(newEntry, addButtonContainer);

    updateProjectNumbers();
    checkAddButtonVisibility();
}

function removeProjectEntry(button) {
    let entry = button.closest(".project-entry");
    entry.remove();
    updateProjectNumbers();
    checkAddButtonVisibility();
}

function updateProjectNumbers() {
    let projectEntries = document.getElementsByClassName("project-entry");
    for (let i = 0; i < projectEntries.length; i++) {
        let title = projectEntries[i].querySelector(".proj-title");
        title.textContent = `${i + 1}. Proje Bilgileri`;
    }
}

function checkAddButtonVisibility() {
    let projectEntries = document.getElementsByClassName("project-entry");
    let addButtonContainer = document.getElementById("add-button-container");

    if (projectEntries.length === 0) {
        addButtonContainer.style.display = "block";
    } else {
        addButtonContainer.style.display = "flex";
    }
}
