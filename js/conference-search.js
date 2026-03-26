let entries = [];

function render(filtered) {
    const body = $("#entriesBody");
    body.empty();

    filtered.forEach(e => {
        body.append(`
        <tr>
            <td>${e.id}</td>
            <td>${e.title}</td>
            <td>${e.category}</td>
            <td>${e.format}</td>
            <td>${e.entryPrice}</td>
            <td>
                <a href="conference-details.html?id=${e.id}" class="btn btn-sm btn-info">View</a>
                <a href="conference-entry.html?id=${e.id}" class="btn btn-sm btn-warning">Edit</a>
                <button class="btn btn-sm btn-danger deleteBtn" data-id="${e.id}">Delete</button>
            </td>
        </tr>
        `);
    });
}

function fetchConferences() {
    const service = window.Service;

    service.getConferencesByApproval(true)
        .then(data => {
            entries = Array.isArray(data) ? data : [];
            render(entries);
        })
        .catch(() => {
            alert('Could not load conferences from the API.');
        });
}

$(document).ready(function () {
    fetchConferences();

    $("#searchInput").on("input", function () {
        const value = $(this).val().toLowerCase();
        const filtered = entries.filter(e =>
            e.title.toLowerCase().includes(value) ||
            e.category.toLowerCase().includes(value)
        );
        render(filtered);
    });

    $("#entriesBody").on("click", ".deleteBtn", function () {
        const id = Number($(this).data("id"));
        const service = window.Service;

        service.deleteConference(id)
            .then(() => {
                entries = entries.filter(e => e.id !== id);
                render(entries);
            })
            .catch(() => {
                alert('Error deleting conference.');
            });
    });
});
