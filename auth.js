    const segmentSelect = document.getElementById("segment");
    const teamDetails = document.getElementById("teamDetails");
    const teamSizeField = document.getElementById("teamSize");
    const teamMembersDiv = document.getElementById("teamMembers");
    const registrationForm = document.getElementById("registrationForm");

    // Hide team fields initially
    teamDetails.style.display = "none";

    segmentSelect.addEventListener("change", function () {
        if (segmentSelect.value === "iq_test") {
            teamDetails.style.display = "none"; // Hide team details for IQ test
        } else {
            teamDetails.style.display = "block"; // Show team details for team-based events
        }
        updateTeamMemberFields(); // Ensure team member fields update when segment changes
    });

    teamSizeField.addEventListener("change", updateTeamMemberFields);

    function updateTeamMemberFields() {
        teamMembersDiv.innerHTML = ""; // Clear existing member fields
        let teamSize = parseInt(teamSizeField.value) || 1;

        if (teamSize > 1) {
            for (let i = 2; i <= teamSize; i++) {
                let memberDiv = document.createElement("div");
                memberDiv.classList.add("team-member");

                memberDiv.innerHTML = `
                    <label>Team Member ${i} Name:
                        <input type="text" name="member_${i}_name"/>
                    </label>
                    <label>Team Member ${i} Email:
                        <input type="email" name="member_${i}_email"/>
                    </label>
                    <label>Team Member ${i} Phone:
                        <input type="text" name="member_${i}_phone"/>
                    </label>
                `;
                teamMembersDiv.appendChild(memberDiv);
            }
        }
    }
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();
    
        const formData = {
            email: getInputValue("email"),
            segment: getInputValue("segment"),
            team_name: getInputValue("team_name"),
            team_leader_name: getInputValue("team_leader_name"),
            team_leader_phone: getInputValue("team_leader_phone"),
            team_leader_email: getInputValue("team_leader_email"),
            transaction_id: getInputValue("transaction_id"),
            team_size: parseInt(getInputValue("team_size")) || 1,
            team_members: []
        };
    
        if (formData.team_size > 1) {
            for (let i = 2; i <= formData.team_size; i++) {
                let name = getInputValue(`member_${i}_name`);
                let email = getInputValue(`member_${i}_email`);
                let phone = getInputValue(`member_${i}_phone`);
                if (name && email && phone) {
                    formData.team_members.push({ name, email, phone });
                }
            }
        }
    
        console.log("Collected Data:", formData); // Debugging: Check the data structure
    
        fetch("https://festive-form.onrender.com/api/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            window.location.href = "regSuccess.html";
        })
        .catch(error => {
            console.error("Error:", error);
            
        });
    });

    function getInputValue(name) {
        return document.querySelector(`[name='${name}']`)?.value.trim() || "";
    };
