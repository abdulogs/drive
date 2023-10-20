$(document).on("click", ".detailBtn", function (e) {
    e.preventDefault();
    const id = $(this).data("id");

    $.ajax({
        url: ApiUrl("user/" + id),
        type: "GET",
        headers: Tokens({ access: true }),
        beforeSend: function () {
            $("#loader").html(Loader());
        },
        success: function (item) {
            $("#details").html(`
            <div class="mb-3">${avatar(item, 200)}</div>
            <h3 class="m-0 fw-semibold font-14 py-1">Firstname</h3>
            <p class="m-0 font-14 mb-2">${item.first_name}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Lastname</h3>
            <p class="m-0 font-14 mb-2">${item.last_name}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Username</h3>
            <p class="m-0 font-14 mb-2">@${item.username}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Email</h3>
            <p class="m-0 font-14 mb-2">${item.email}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Role</h3>
            <p class="m-0 font-14 mb-2">${is_role(item)}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Active</h3>
            <p class="m-0 font-14 mb-2">${is_active(item.is_active)}</p>
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
            if (response.status === 0) {
                msgError("Not connect.\n Verify Network.");
            } else if (response.status == 404) {
                msgError("Requested page not found. [404]");
            } else if (response.status == 500) {
                msgError("Internal Server Error [500].");
            } else if (response.status == 401) {
                msgError("Your session timesout");
                redirect("/logout/");
            } else if (response.status == 403) {
                msgError("Forbidden user [403]");
                redirect("/logout/");
            } else if (exception === "parsererror") {
                msgError("Requested JSON parse failed.");
            } else if (exception === "timeout") {
                msgError("Time out error.");
            } else if (exception === "abort") {
                msgError("Ajax request aborted.");
            } else {
                msgError("Something went wrong!");
            }
        }
    });
});