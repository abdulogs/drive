function gunique() {
    const currentDate = new Date();
    const randomComponent = Math.floor(Math.random() * 9000) + 1000; // Generate a random 4-digit number
    const uniqueNumber = parseInt(`${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}${randomComponent}`);
    return uniqueNumber;
}

$(document).on("click", "#sendOtp", function (e) {
    e.preventDefault();
    const email = $("#email").val();
    const code = gunique();
    if (email == "") {
        msgError("Please enter email...")
        return false;
    } else {
        $.ajax({
            url: ApiUrl("otp/"),
            type: "POST",
            cache: false,
            data: {
                email: email,
                code: code
            },
            headers: Tokens({ csrf: true }),
            beforeSend: function () {
                $("#sendOtp").prop("disabled", true).html("Loading...");
            },
            success: function (data) {
                if (data) {
                    msgSuccess("We sent you a code on your email address for email verification");
                }
            },
            complete: function () {
                $("#sendOtp").prop("disabled", false).html("Send again...");
            },
            error: function (response, exception) {
                const data = response.responseJSON
                if (response.status === 0) {
                    msgError('Not connect.\n Verify Network.');
                } else if (response.status == 404) {
                    msgError('Requested page not found. [404]');
                } else if (response.status == 500) {
                    msgError('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    msgError('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    msgError('Time out error.');
                } else if (exception === 'abort') {
                    msgError('Ajax request aborted.');
                } else {
                    msgError('Something went wrong!');
                }
            },
        });
    }

});



$(document).on("submit", "#requestForm", function (e) {
    e.preventDefault();
    const name = $("#name").val();
    const email = $("#email").val();
    const code = $("#code").val();
    const phone_number = phone.getNumber();
    const country = $("#country").val();
    const province = $("#province").val();
    const city = $("#city").val();
    const postal_code = $("#postal_code").val();
    const address = $("#address").val();
    const company = $("#company").val();
    const is_not_us_citizen = document.getElementById("is_not_us_citizen").checked;
    const is_agreed = document.getElementById("is_agreed").checked;

    if (name == "") {
        msgError("Please enter your name...")
        return false;
    } else if (email == "") {
        msgError("Please enter email...")
        return false;
    } else if (code == "") {
        msgError("Please enter email confirmation code...")
        return false;
    } else if (phone_number == "") {
        msgError("Please enter your phone...")
        return false;
    } else if (country == "") {
        msgError("Please enter country...")
        return false;
    } else if (province == "") {
        msgError("Please enter province...")
        return false;
    } else if (city == "") {
        msgError("Please enter city...")
        return false;
    } else if (postal_code == "") {
        msgError("Please enter postal code...")
        return false;
    } else if (address == "") {
        msgError("Please enter your address...")
        return false;
    } else if (!is_not_us_citizen) {
        msgError("Please check you are not us citizen...")
        return false;
    } else if (!is_agreed) {
        msgError("Please check you are agree with our terms...")
        return false;
    } else {
        $.ajax({
            url: ApiUrl("w/request/"),
            type: "POST",
            cache: false,
            data: {
                name: name,
                email: email,
                code: code,
                phone: phone_number,
                country: country,
                province: province,
                city: city,
                address: address,
                company: company,
                postal_code: postal_code,
                is_agreed: is_agreed,
                is_not_us_citizen: is_not_us_citizen,
                is_active: true,
            },
            headers: Tokens({ csrf: true }),
            beforeSend: function () {
                $("#btn").prop("disabled", true).html("Loading...");
            },
            success: function (data) {
                if (data) {
                    msgSuccess("Please wait for the admin approval!");
                    $("#requestForm").trigger("reset");
                    redirect("/thank-you")
                }
            },
            complete: function () {
                $("#btn").prop("disabled", false).html("Proceed");
            },
            error: function (response, exception) {
                const data = response.responseJSON
                console.log(data);
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
                } else if (data["non_field_errors"]) {
                    msgError(data["non_field_errors"]);
                } else {
                    msgError('Something went wrong!');
                }
            },
        });
    }
});