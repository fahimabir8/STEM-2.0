document.addEventListener("DOMContentLoaded", function () {
    const segmentSelect = document.getElementById("segment");
    const teamDetails = document.getElementById("teamDetails");
    const teamSizeField = document.getElementById("teamSize");
    const teamMembersDiv = document.getElementById("teamMembers");
    const registrationForm = document.getElementById("registrationForm");

    // Hide team fields initially
    teamDetails.style.display = "none";

    segmentSelect.addEventListener("change", function () {
        if (segmentSelect.value === "iq_test") {
            teamDetails.style.display = "none";
        } else {
            teamDetails.style.display = "block";
        }
        updateTeamMemberFields();
    });

    teamSizeField.addEventListener("change", updateTeamMemberFields);

    function updateTeamMemberFields() {
        teamMembersDiv.innerHTML = "";
        let teamSize = parseInt(teamSizeField.value) || 1;

        if (teamSize > 1) {
            for (let i = 2; i <= teamSize; i++) {
                let memberDiv = document.createElement("div");
                memberDiv.classList.add("team-member");

                memberDiv.innerHTML = `
                    <label>Team Member ${i} Name:
                        <input type="text" name="member_${i}_name" class="member-input" />
                    </label>
                    <label>Team Member ${i} Email:
                        <input type="email" name="member_${i}_email" class="member-input" />
                    </label>
                    <label>Team Member ${i} Phone:
                        <input type="text" name="member_${i}_phone" class="member-input" />
                    </label>
                `;
                teamMembersDiv.appendChild(memberDiv);
            }
        }
    }



    function getInputValue(name) {
        return document.querySelector(`[name='${name}']`)?.value.trim() || "";
    }
});
