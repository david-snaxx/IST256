$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const service = window.Service;

    service.getConference(id)
        .then(entry => {
            $("#detailsCard").removeClass("d-none");
            $("#detailsId").text(entry.id);
            $("#detailsTitleText").text(entry.title);
            $("#detailsDescription").text(entry.description);
            $("#detailsCategory").text(entry.category);
            $("#detailsFormat").text(entry.format);
            $("#detailsPrice").text(Number(entry.entryPrice).toFixed(2));
            $("#detailsAdditional").text(entry.additionalInfo ? entry.additionalInfo : "N/A");

            $("#editLink").attr("href", `conference-entry.html?id=${entry.id}`);
        })
        .catch(() => {
            $("#notFound").removeClass("d-none");
        });
});
