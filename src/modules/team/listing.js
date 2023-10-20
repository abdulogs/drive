function card(item) {
    return `
    <td class="align-middle text-white border-dark px-3 cursor-pointer detailBtn" data-id="${item.id}">${createdby(item)}</td>
    <td class="align-middle text-white border-dark">${item.email}</td>
    <td class="align-middle text-white border-dark">${is_active(item.is_active)}</td>
    <td class="align-middle text-white border-dark">${is_role(item)}</td>
    <td class="align-middle text-white border-dark">${timenow(item.created_at)}</td>
    <td class="align-middle text-white border-dark px-3">
        <a class="btn btn-primary btn-sm font-16 p-1 rounded-circle bx bx-pencil text-dark updateBtn" data-id="${item.id}" href="javascript:void(0)"></a>
        <a class="btn btn-primary btn-sm font-16 p-1 rounded-circle bx bx-lock text-dark changePasswordBtn" data-id="${item.id}" href="javascript:void(0)"></a>
        <a class="btn btn-primary btn-sm font-16 p-1 rounded-circle bx bx-show text-dark detailBtn" data-id="${item.id}" href="javascript:void(0)"></a>
        <a class="btn btn-primary btn-sm font-16 p-1 rounded-circle bx bx-trash text-dark deleteBtn" data-id="${item.id}" href="javascript:void(0)"></a>
    </td>`;


}


function loadData(page = 1) {
    let limit = parseInt($("#limit").val());
    let search = $("#search").val();
    let ordering = $("#ordering").val();
    let availability = $("#availability").val();
    let role = $("#role").val();
    let template = "";

    $.ajax({
        url: ApiUrl("user"),
        method: "GET",
        data: {
            page: page,
            records: limit,
            search: search,
            ordering: ordering,
            is_active: availability,
            [role]: true
        },
        cache: false,
        headers: Tokens({ access: true }),
        beforeSend: function () {
            $("#loader").html(Loader());
        },
        success: function (data) {
            if (data.count == 0) {
                $('#listing').html(`<tr id="emptyrow"><td colspan="6" class="border-0">${is_empty("0 Members found!")}</td><tr>`);
            } else if (data.count != 0) {
                data.results.forEach(item => {
                    template += `<tr id="row${item.id}">${card(item)}</tr>`;
                });
                $('#listing').html(template);
            }
            NextPreviousBtns(data, page, limit);
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
}
loadData();