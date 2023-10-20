$(document).on("submit", "#changeavatar", function (e) {
    e.preventDefault();
    const formdata = new FormData(this);
    const image = $("#image")[0].files[0];
    formdata.append("avatar", image);
    $.ajax({
        url: ApiUrl("user/" + user_id + "/"),
        type: "PATCH",
        data: formdata,
        contentType: false,
        processData: false,
        cache: false,
        headers: Tokens({ csrf: true, access: true }),
        beforeSend: function () {
            $("#btn1").prop("disabled", true).html("Loading...");
        },
        success: function (response) {
            if (response) {
                msgSuccess("Changed successfully");
                reload();
            }
        },
        complete: function () {
            $("#btn1").prop("disabled", false).html("Upload");
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
            } else if (data["avatar"]) {
                msgError(data["avatar"][0]);
            } else {
                msgError('Something went wrong!');
            }
        },
    });
});


$(document).on("change", "#image", function (e) {
    e.preventDefault();
    $("#uploadbtn").html(`<button type="submit" class="btn btn-dark rounded-pill px-4 py-2 font-14 fw-bold ms-2">Change</button>`)
});


$(document).on("submit", "#aboutdetails", function (e) {
    e.preventDefault();
    const first_name = $("#firstname").val();
    const last_name = $("#lastname").val();
    const username = $("#username").val();
    const email = $("#email").val();

    if (first_name == "") {
        msgError("Firstname is required");
    } else if (last_name == "") {
        msgError("Lastname is required");
    } else if (username == "") {
        msgError("Username is required");
    } else if (email == "") {
        msgError("Email is required");
    } else {
        $.ajax({
            url: ApiUrl("user/" + user_id + "/"),
            type: "PATCH",
            data: {
                first_name: first_name,
                last_name: last_name,
                username: username,
                email: email
            },
            cache: false,
            headers: Tokens({ csrf: true, access: true }),
            beforeSend: function () {
                $("#btn2").prop("disabled", true).html("Loading...");
            },
            success: function (response) {
                if (response) {
                    msgSuccess("Updated successfully");
                    reload();
                }
            },
            complete: function () {
                $("#btn2").prop("disabled", false).html("Update");
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
                } else if (data["first_name"]) {
                    msgError(data["first_name"][0]);
                } else if (data["last_name"][0]) {
                    msgError(data["last_name"][0]);
                } else if (data["username"][0]) {
                    msgError(data["username"][0]);
                } else if (data["email"]) {
                    msgError(data["email"][0]);
                } else {
                    msgError('Something went wrong!');
                }
            },
        });
    }
});


$(document).on("submit", "#changepassword", function (e) {
    e.preventDefault();
    const formdata = new FormData(this);
    const password = $("#password").val();
    const password2 = $("#password2").val();

    if (password == "") {
        msgError("New password is required");
    } else if (password2 == "") {
        msgError("Confirm password is required");
    } else if (password2 !== password) {
        msgError("Passwords not matched");
    } else {
        formdata.append("password", password);
        formdata.append("password2", password2);
        formdata.append("userid", user_id);

        $.ajax({
            url: ApiUrl("change-password/"),
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            cache: false,
            headers: Tokens({ csrf: true, access: true }),
            beforeSend: function () {
                $("#btn3").prop("disabled", true).html("Loading...");
            },
            success: function (response) {
                if (response) {
                    msgSuccess("Changed successfully");
                    reload();
                }
            },
            complete: function () {
                $("#btn3").prop("disabled", false).html("Change");
            },
            error: function (response, exception) {
                const data = response.responseJSON
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
                } else if (data["password"]) {
                    msgError(data["password"][0]);
                } else if (data["password2"]) {
                    msgError(data["password2"][0]);
                } else {
                    msgError('Something went wrong!');
                }
            },
        });
    }
});


