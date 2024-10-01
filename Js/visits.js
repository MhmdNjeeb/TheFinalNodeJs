let raw_data = [];

function createTable() {
    let str = "";
    for (let line of raw_data) {
        str += "<tr>";
        str += `<td>${line.id}</td>`;
        str += `<td>${line.guard_name}</td>`;
        str += `<td>${line.notes}</td>`;
        str += `<td>${new Date(line.visit_time).toLocaleString()}</td>`;
        str += "</tr>";
    }
    document.getElementById("mainTable").innerHTML = str;
}

async function getList() {
    let response = await fetch('/visits/list');
    let data = await response.json();
    raw_data = data;
    createTable();
}

async function addNewVisit() {
    let pointId = document.getElementById("pointId").value;
    let guardName = document.getElementById("guardName").value;
    let notes = document.getElementById("notes").value;

    let response = await fetch('/visits/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pointId, guardName, notes })
    });

    if (response.ok) {
        getList();
    } else {
        console.error('Error adding visit:', response.statusText);
    }
}

async function deleteVisit() {
    let visitID = document.getElementById("deleteVisitID").value;

    try {
        let response = await fetch(`/visits/delete/${visitID}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            getList();
        } else {
            console.error('Error deleting visit:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function editVisit() {
    let visitID = document.getElementById("updateVisitID").value;
    let updatedGuardName = document.getElementById("updatedGuardName").value;
    let updatedNotes = document.getElementById("updatedNotes").value;

    if (!visitID || (!updatedGuardName && !updatedNotes)) {
        return;
    }

    let response = await fetch(`/visits/edit/${visitID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guardName: updatedGuardName, notes: updatedNotes })
    });

    if (response.ok) {
        getList();
    } else {
        console.error('Error updating visit:', response.statusText);
    }
}

// Initialize the list on page load
getList();
