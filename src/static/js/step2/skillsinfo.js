function addTechSkill() {
    let techSkillsList = document.getElementById("tech-skills-list");

    // Yeni beceri girişini oluştur
    let newEntry = document.createElement("div");
    newEntry.classList.add("tech-skill-entry");
    newEntry.innerHTML = `
        <div class="grouped_skill">
            <div class="inline">
                <input type="text" class="wide-input" name="tech_skill_name" placeholder="Teknik Beceri (Matlab, Excel vb.)" required>
                <label for="tech_skill_name">Teknik Beceri</label>
            </div>
            <div class="inline">
                <select name="tech_skill_level" required>
                    <option value="" disabled selected hidden>Seçiniz</option>
                    <option value="1">1 - Çok Az</option>
                    <option value="2">2</option>
                    <option value="3">3 - Orta</option>
                    <option value="4">4</option>
                    <option value="5">5 - Çok İyi</option>
                </select>
                <label for="tech_skill_level">Bilgi Seviyesi</label>
            </div>
        </div>
        <b class="cta-button_tech remove-btn" onclick="removeTechSkill(this)">-</b>
    `;

    // Yeni girişleri listeye ekle
    techSkillsList.appendChild(newEntry);
}

function removeTechSkill(element) {
    let techSkillsList = document.getElementById("tech-skills-list");

    // En az bir beceri girişinin kalmasını sağla
    if (techSkillsList.children.length > 1) {
        element.parentElement.remove();
    } else {
        alert("En az bir teknik beceri girişi olmalıdır.");
    }
}
