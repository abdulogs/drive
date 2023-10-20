$(document).on("click", ".detailBtn", function (e) {
    e.preventDefault();
    const id = $(this).data("id");

    $.ajax({
        url: ApiUrl("d/request/" + id),
        type: "GET",
        headers: Tokens({ access: true }),
        beforeSend: function () {
            $("#loader").html(Loader());
        },
        success: function (item) {
            $("#details").html(`
            <h3 class="m-0 fw-semibold font-14 py-1">Name</h3>
            <p class="m-0 font-14 mb-2">${item.name}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Email</h3>
            <p class="m-0 font-14 mb-2">${item.email}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Phone</h3>
            <p class="m-0 font-14 mb-2">${item.phone}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Country</h3>
            <p class="m-0 font-14 mb-2">${item.country}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Province</h3>
            <p class="m-0 font-14 mb-2">${item.province}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">City</h3>
            <p class="m-0 font-14 mb-2">${item.city}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Postal code</h3>
            <p class="m-0 font-14 mb-2">${item.postal_code}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Address</h3>
            <p class="m-0 font-14 mb-2">${item.address}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Company</h3>
            <p class="m-0 font-14 mb-2">${item.company}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Email subject</h3>
            <p class="m-0 font-14 mb-2">${item.subject}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Email Message</h3>
            <p class="m-0 font-14 mb-2">${item.message}</p>
            <h3 class="m-0 fw-semibold font-14 py-1">Approved</h3>
            <p class="m-0 font-14 mb-2">${is_active(item.is_approved)}</p>    
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
$(document).on("click", ".historyBtn", function (e) {
    e.preventDefault();
    const id = $(this).data("id");

    $.ajax({
        url: ApiUrl("d/request/" + id),
        type: "GET",
        headers: Tokens({ access: true }),
        beforeSend: function () {
            $("#loader").html(Loader());
        },
        success: function (item) {
            let template = ""
            if (item.files.length == 0) {
                 template = "<h3 class='text-center text-white py-5'>No files assigned yet!</h3>"
            } else {
                template = "<ul>"
                item.files.forEach(file => {
                    template += `<li><a href="${BASEURL("media/pdf/" + file.code + ".pdf")}">${file.code}.pdf</a></li>`
                });
                template += "</ul>"
            }

            $("#details").html(template);
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