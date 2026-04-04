import { getAllUsers, deleteUser as serviceDeleteUser } from '/api/service.js';

async function renderUsers() {
    const tbody = document.getElementById("memberTableBody");
    const emptyMsg = document.getElementById("emptyMsg");

    tbody.innerHTML = "";

    let users;
    try {
        users = await getAllUsers() || [];
    } catch (e) {
        console.error("Error loading users:", e);
        return;
    }

    if (users.length === 0) {
        emptyMsg.style.display = "block";
        return;
    }

    emptyMsg.style.display = "none";

    users.forEach(u => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
      <td>${u.name ?? ""}</td>
      <td>${u.email ?? ""}</td>
      <td>${u.age ?? ""}</td>
      <td>${u.address ?? ""}</td>
      <td>${u.phone ?? ""}</td>
      <td class="text-end">
        <a class="btn btn-sm btn-outline-primary" href="signup.html?edit=${encodeURIComponent(u.email)}">Edit</a>
        <button class="btn btn-sm btn-outline-danger ms-1" data-email="${u.email}">Delete</button>
      </td>
    `;

        tbody.appendChild(tr);
    });

    tbody.querySelectorAll("button[data-email]").forEach(btn => {
        btn.addEventListener("click", () => {
            deleteUser(btn.getAttribute("data-email"));
        });
    });
}

async function deleteUser(email) {
    const ok = confirm(`Delete "${email}"?`);
    if (!ok) return;

    try {
        await serviceDeleteUser(email);
        renderUsers();
    } catch (e) {
        alert("Error deleting user: " + e.message);
    }
}

document.addEventListener("DOMContentLoaded", renderUsers);
