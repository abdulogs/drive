function customercard(item) {
    return `
    <td class="align-middle px-3"><p class="m-0 text-break">${createdby(item)}</p></td>
    <td class="align-middle"><p class="m-0 text-break">${item.email}</p></td>
    <td class="align-middle">${is_active(item.is_email_verified)}</td>;
    <td class="align-middle px-3">${timenow(item.created_at)}</td>`;
}



function loadCustomers(page = 1) {
    let template = "";

    $.ajax({
        url: ApiUrl("d/user"),
        method: "GET",
        data: {
            page: 1,
            records: 5,
            ordering: "-created_at",
            is_superuser: false,
            is_staff: false,
        },
        cache: false,
        async: true,
        headers: Tokens({ access: true }),
        beforeSend: function () {
            $("#loader").html(Loader());
        },
        success: function (data) {
            if (data.count == 0) {
                $("#customers").html(`<tr id="emptyrow"><td colspan="4" class="border-0 text-center text-danger fw-bold">0 Customers found!</td><tr>`);
            } else if (data.count != 0) {
                data.results.forEach(item => { template += `<tr>${customercard(item)}</tr>`; });
                $("#customers").html(template);
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
            } else {
                msgError("Something went wrong!");
            }
        }
    });
}
loadCustomers();