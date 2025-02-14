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

    // registrationForm.addEventListener("submit", function (event) {
    //     event.preventDefault();

    //     const formData = {
    //         email: getInputValue("email"),
    //         segment: getInputValue("segment"),
    //         team_name: getInputValue("team_name"),
    //         team_leader_name: getInputValue("team_leader_name"),
    //         team_leader_phone: getInputValue("team_leader_phone"),
    //         team_leader_email: getInputValue("team_leader_email"),
    //         transaction_id: getInputValue("transaction_id"),
    //         team_size: parseInt(getInputValue("team_size")) || 1,
    //         team_members: []
    //     };

    //     // Validate dynamically added fields manually
    //     let isValid = true;
    //     if (formData.team_size > 1) {
    //         for (let i = 2; i <= formData.team_size; i++) {
    //             let name = getInputValue(`member_${i}_name`);
    //             let email = getInputValue(`member_${i}_email`);
    //             let phone = getInputValue(`member_${i}_phone`);
                
    //             if (!name || !email || !phone) {
    //                 alert(`Please fill all fields for Team Member ${i}`);
    //                 isValid = false;
    //                 break;
    //             }
    //             formData.team_members.push({ name, email, phone });
    //         }
    //     }

    //     if (!isValid) return;

    //     console.log("Collected Data:", formData);

    //     fetch("https://festive-form.onrender.com/api/register/", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(formData),
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log("Success:", data);
    //         alert("Registration successful!");
    //     })
    //     .catch(error => {
    //         console.error("Error:", error);
    //         alert("Registration failed.");
    //     });
    // });

    function getInputValue(name) {
        return document.querySelector(`[name='${name}']`)?.value.trim() || "";
    }
});
