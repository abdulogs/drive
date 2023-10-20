$(document).on("click", ".createBtn", function (e) {
    e.preventDefault();
    $("#hiddenFields").html("")
    $("#modelTitle").html(`<b class="bx bx-plus-circle me-2 font-20 text-primary bg-dark p-2 rounded-circle"></b><b class="text-white">Create</b>`);
    $(".modalForm").attr("id", "create").trigger("reset");
    modalOpen("createupdateform");
});


$(document).on("submit", "#create", function (e) {
    e.preventDefault();
    const formdata = new FormData(this);
    const name = $("#name").val();
    const description = $("#description").val()

    if (name == "") {
        msgError("Name is required");
    } else if (description == "") {
        msgError("Description is required");
    } else {
        formdata.append("name", name);
        formdata.append("description", description);

        $.ajax({
            url: ApiUrl("note/"),
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            cache: false,
            headers: Tokens({ csrf: true, access: true }),
            beforeSend: function () {
                $("#btn").text("Loading...").prop("disabled", true);
            },
            success: function (item) {
                if (item) {
                    msgSuccess("Created successfully!");
                    $("#listing").prepend(`<tr id="row${item.id}">${card(item)}</tr>`);
                    if ($("#listing").html() != "") {
                        $("#emptyrow").remove();
                    }
                    modalClose("createupdateform");
                }
            },
            complete: function () {
                $("#btn").text("Proceed").prop("disabled", false);
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
                } else if (data["name"]) {
                    msgError(data["name"][0]);
                } else if (data["description"]) {
                    msgError(data["description"][0]);
                } else {
                    msgError("Something went wrong!");
                }
            }
        });
    }
});