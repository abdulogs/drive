$(document).on("click", ".detailBtn", function (e) {
    e.preventDefault();
    const id = $(this).data("id");
    $.ajax({
        url: ApiUrl("note/" + id),
        type: "GET",
        headers: Tokens({ access: true }),
        beforeSend: function () {
            $("#loader").html(Loader());
        },
        success: function (item) {
            $("#details").html(`
            <h3 class="m-0 fw-semibold font-14 py-1">Name</h3>
            <p class="m-0 font-14 mb-2">${item.name}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Description</h3>
            <div class="m-0 font-14 mb-2">${item.description}</div>
            <h3 class="m-0 fw-semibold font-14 py-1">Created by</h3>
            <p class="m-0 font-14 mb-2">${createdby(item.created_by)}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Created at</h3>
            <p class="m-0 font-14 mb-2">${time(item.created_at)}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Updated at</h3>
            <p class="m-0 font-14 mb-2">${time(item.updated_at)}</p>`);
            modalOpen("detailsModal");
        },
        complete: function () {
            $("#loader").html("");
        },
        error: function (response, exception) {
            const data = response.responseJSON
            if (response.status === 0) {
                msgError("Not connect.\n Verify Network.");
            } else if (response.status == 404) {
                msgError("Requested page not found. [404]");
            } else if (response.status == 500) {
                msgError("Internal Server Error [500].");
            } else if (response.status == 401) {
                msgError("Your session timesout");
                redirect("/dashboard/logout/");
            } else if (response.status == 403) {
                msgError("Forbidden user [403]");
                redirect("/dashboard/logout/");
            } else if (exception === "parsererror") {
                msgError("Requested JSON parse failed.");
            } else if (exception === "timeout") {
                msgError("Time out error.");
            } else if (exception === "abort") {
                msgError("Ajax request aborted.");
            } else if (data["non_field_errors"]) {
                msgError(data["non_field_errors"][0]);
            } else {
                msgError("Something went wrong!");
            }
        }
    });
});
