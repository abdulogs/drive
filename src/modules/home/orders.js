function ordercard(item) {
    return `
    <td class="align-middle px-3">
        <a href="/dashboard/order/${item.id}/" class="text-dark text-nowrap fw-bold text-decoration-none">
            ${item.code}
        </a>
    </td>
    <td class="align-middle">${fullname(item)}</td>
    <td class="align-middle">${item.email}</td>
    <td class="align-middle"><span class="badge bg-dark text-white rounded-pill p-2 px-3">Pending</span></td>
    <td class="align-middle">${createdby(item.created_by)}</td>
    <td class="align-middle">${timenow(item.created_at)}</td>`;
}



function loadOrders(page = 1) {
    let template = "";

    $.ajax({
        url: ApiUrl("d/order"),
        method: "GET",
        data: {
            page: 1,
            records: 5,
            is_status: 0
        },
        cache: false,
        async: true,
        headers: Tokens({ access: true }),
        beforeSend: function () {
            $("#loader").html(Loader());
        },
        success: function (data) {
            if (data.count == 0) {
                $("#orders").html(`<tr id="emptyrow"><td colspan="7" class="border-0">${is_empty("0 pending orders found!")}</td><tr>`);
            } else if (data.count != 0) {
                data.results.forEach(item => { template += `<tr>${ordercard(item)}</tr>`; });
                $("#orders").html(template);
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
loadOrders();