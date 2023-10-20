$(document).on("click", ".updateBtn", function (e) {
    e.preventDefault();
    const id = $(this).data("id");
    $("#hiddenFields").html(`<input type="hidden" id="id">`)
    $("#modelTitle").html(`<b class="bx bx-edit me-2 font-20 text-primary bg-dark p-2 rounded-circle"></b><b class="text-white">Update</b>`);
    $(".modalForm").attr("id", "update");
    $(".password-field").addClass("d-none");

    $.ajax({
        url: ApiUrl("d/request/" + id),
        type: "GET",
        headers: Tokens({ access: true }),
        beforeSend: function () {
            $("#loader").html(Loader());
        },
        success: function (item) {
            $("#requestDetails").html(`
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
            $("#id").val(id);
            $("#subject").val(item.subject);
            $("#message").val(item.message);
            setChecked("#is_approved", item.is_superuser);
            setChecked("#is_send_email", item.is_email_verified);
            setChecked("#is_active", item.is_active);
            modalOpen("createupdateform");
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




$(document).on("submit", "#update", function (e) {
    e.preventDefault();
    const id = $("#id").val();
    const subject = $("#subject").val();
    const message = $("#message").val();
    const is_approved = getChecked("#is_approved");
    const is_send_email = getChecked("#is_send_email");
    const is_active = getChecked("#is_active");
    let files = [];

    document.querySelectorAll(`[name='files']`).forEach(function (item) {
        (item.checked) ? files.push(item.value) : files;
    });
    files = files.toString()
    console.log(files);

    $.ajax({
        url: ApiUrl("d/request/" + id + "/"),
        type: "PATCH",
        data: {
            subject: subject,
            message: message,
            files: files,
            is_approved: is_approved,
            is_send_email: is_send_email,
            is_active: is_active
        },
        cache: false,
        headers: Tokens({ csrf: true, access: true }),
        beforeSend: function () {
            $("#btn").text("Loading...").prop("disabled", true);
        },
        success: function (item) {
            if (item) {
                msgSuccess("Updated successfully!");
                $("#row" + id).html(card(item));
                modalClose("createupdateform");
            }
        },
        complete: function () {
            $("#btn").text("Proceed").prop("disabled", false);
        },
        error: function (response, exception) {
            const data = response.responseJSON;
            console.log(data);
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
            } else if (data["first_name"]) {
                msgError(data["first_name"][0]);
            } else if (data["last_name"]) {
                msgError(data["last_name"][0]);
            } else if (data["username"]) {
                msgError(data["username"][0]);
            } else if (data["email"]) {
                msgError(data["email"][0]);
            } else if (data["is_active"]) {
                msgError(data["is_active"][0]);
            } else {
                msgError("Something went wrong!");
            }
        }
    });

});
