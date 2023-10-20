$(document).on("submit", "#login", function (e) {
    e.preventDefault();
    const email = $("#email").val();
    const password = $("#password").val();

    if (email == "") {
        msgError("Please enter email...")
        return false;
    } else if (password == "") {
        msgError("Please enter password...")
        return false;
    } else {
        $.ajax({
            url: ApiUrl("login/"),
            type: "POST",
            cache: false,
            data: {
                email: email,
                password: password
            },
            headers: Tokens({ csrf: true }),
            beforeSend: function () {
                $("#btn").prop("disabled", true).html("Loading...");
            },
            success: function (data) {
                if (data) {
                    localStorage.setItem("user_id", data.id);
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                    msgSuccess("Login successfull!");
                    redirect("/");
                } else {
                    msgError("Incorrect credentials!");
                }
            },
            complete: function () {
                $("#btn").prop("disabled", false).html("Login");
            },
            error: function (response, exception) {
                const data = response.responseJSON
                if (response.status === 0) {
                    msgError('Not connect.\n Verify Network.');
                } else if (response.status == 404) {
                    msgError('Requested page not found. [404]');
                } else if (response.status == 500) {
                    msgError('Internal Server Error [500].');
                } else if (response.status == 401) {
                    msgError("Your session timesout");
                    redirect("/logout/");
                } else if (response.status == 403) {
                    msgError("Forbidden user [403]");
                    redirect("/logout/");
                } else if (exception === 'parsererror') {
                    msgError('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    msgError('Time out error.');
                } else if (exception === 'abort') {
                    msgError('Ajax request aborted.');
                } else if (data["email"]) {
                    msgError(data["email"][0]);
                } else if (data["password"]) {
                    msgError(data["password"][0]);
                } else if (data["message"]) {
                    msgError(data["message"]);
                } else {
                    msgError('Something went wrong!');
                }
            },
        });
    }
});