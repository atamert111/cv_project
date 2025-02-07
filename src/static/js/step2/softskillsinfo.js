function addSoftSkill() {
    let softSkillsList = document.getElementById("soft-skills-list");

    // Yeni yetenek girişini oluştur
    let newEntry = document.createElement("div");
    newEntry.classList.add("soft-skill-entry");
    newEntry.innerHTML = `
        <div class="grouped_skill">
            <div class="inline">
                <input type="text" class="wide-input" name="soft_skill_name" placeholder=" " required>
                <label for="soft_skill_name">Yetenekler (İletişim, Yöneticilik vb.)</label>
            </div>
            <div class="inline">
                <select name="soft_skill_level" required>
                    <option value="" disabled selected hidden>Seçiniz</option>
                    <option value="1">1 - Çok Az</option>
                    <option value="2">2</option>
                    <option value="3">3 - Orta</option>
                    <option value="4">4</option>
                    <option value="5">5 - Çok İyi</option>
                </select>
                <label for="soft_skill_level">Bilgi Seviyesi</label>
            </div>
        </div>
        <b class="cta-button_soft remove-btn" onclick="removeSoftSkill(this)">-</b>
    `;

    // Yeni girişleri listeye ekle
    softSkillsList.appendChild(newEntry);
}

function removeSoftSkill(element) {
    let softSkillsList = document.getElementById("soft-skills-list");

    // En az bir yetenek girişinin kalmasını sağla
    if (softSkillsList.children.length > 1) {
        element.parentElement.remove();
    } else {
        alert("En az bir yetenek girişi olmalıdır.");
    }
}
