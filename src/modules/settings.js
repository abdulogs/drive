$(document).on("submit", "#settings", function (e) {
    e.preventDefault();
    const is_approved =  getChecked("#is_production");
    const request_email = $("#request_email").val();
    const request_subject = $("#request_subject").val();
    const request_message = $("#request_message").val();
    const approval_email = $("#approval_email").val();
    const approval_subject = $("#approval_subject").val();
    const approval_message = $("#approval_message").val();
    const remainder_email = $("#remainder_email").val();
    const remainder_subject = $("#remainder_subject").val();
    const remainder_message = $("#remainder_message").val();

    $.ajax({
        url: ApiUrl("setting/" + 1 + "/"),
        type: "PATCH",
        data: {
            is_approved: is_approved,
            request_email: request_email,
            request_subject: request_subject,
            request_message: request_message,
            approval_email: approval_email,
            approval_subject: approval_subject,
            approval_message: approval_message,
            remainder_email: remainder_email,
            remainder_subject: remainder_subject,
            remainder_message: remainder_message,
        },
        cache: false,
        headers: Tokens({ csrf: true, access: true }),
        beforeSend: function () {
            $("#btn").text("Loading...").prop("disabled", true);
        },
        success: function (item) {
            if (item) {
                msgSuccess("Updated successfully!");
            }
        },
        complete: function () {
            $("#btn").text("Update").prop("disabled", false);
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
            } else if (data["non_field_errors"]) {
                msgError(data["non_field_errors"][0]);
            } else {
                msgError("Something went wrong!");
            }
        }
    });
});
