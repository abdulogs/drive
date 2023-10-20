function files(ids) {
    let template = "";
    $.ajax({
        url: ApiUrl("file/"),
        type: 'GET',
        data: {
            records: 1000,
        },
        headers: Tokens({ access: true }),
        beforeSend: function () {
            $("#loader").html(Loader());
        },
        success: function (data) {
            data.results.forEach(item => {
                template += `<p>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="file${item.id}" name="files" value="${item.id}">
                    <label class="form-check-label fw-bold font-14 text-white" for="file${item.id}">${item.name}</label>
                    </div>
                </p>`
            });
            $("#files").html(template)
        },
        complete: function () {
            $("#loader").html("");
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
                redirect("/dashboard/logout/");
            } else if (response.status == 403) {
                msgError("Forbidden user [403]");
                redirect("/dashboard/logout/");
            } else if (exception === 'parsererror') {
                msgError('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                msgError('Time out error.');
            } else if (exception === 'abort') {
                msgError('Ajax request aborted.');
            } else if (data["non_field_errors"]) {
                msgError(data["non_field_errors"][0]);
            } else {
                msgError('Something went wrong!');
            }
        }
    });
    return template;
}
files()