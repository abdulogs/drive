$(document).on("click", ".deleteBtn", function (e) {
    const id = $(this).data("id");

    confirmbox({
        id: "confirmbox",
        title: "Are you sure?",
        description: "Do you really want to delete this note?"
    }).then(function () {
        $.ajax({
            url: ApiUrl("note/" + id),
            type: "DELETE",
            headers: Tokens({ csrf: true, access: true }),
            beforeSend: function () {
                $("#loader").html(Loader());
            },
            success: function () {
                msgSuccess("Deleted successfully!")
                $("#row" + id).remove();
                if ($("#listing").has("tr").length == 0) {
                    $("#listing").html(`<tr id="emptyrow"><td colspan="4" class="border-0">${is_empty("0 Notes found!")}</td><tr>`);
                }
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
    })
});
// Delete