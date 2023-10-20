function card(item) {
    return `
    <td class="align-middle border-dark px-3">
        <a href="javascript:void(0)" class="text-white text-nowrap fw-bold text-decoration-none detailBtn" data-id="${item.id}"> ${item.name}</a>
    </td>
    <td class="align-middle border-dark"><a href="${item.file}" download="${item.name}" class="text-primary fw-bold text-decoration-none">Download<a></td>
    <td class="align-middle border-dark">${is_active(item.is_active)}</td>
    <td class="align-middle border-dark">${createdby(item.created_by)}</td>
    <td class="align-middle border-dark">${timenow(item.created_at)}</td>
    <td class="align-middle border-dark px-3">
        <a class="btn btn-primary text-dark btn-sm font-16 p-1 rounded-circle bx bx-pencil text-dark updateBtn" data-id="${item.id}" href="javascript:void(0)"></a>
        <a class="btn btn-primary text-dark btn-sm font-16 p-1 rounded-circle bx bx-show text-dark detailBtn" data-id="${item.id}" href="javascript:void(0)"></a>
        <a class="btn btn-primary text-dark btn-sm font-16 p-1 rounded-circle bx bx-trash text-dark deleteBtn" data-id="${item.id}" href="javascript:void(0)"></a>
    </td>`;
}


function loadData(page) {
    let limit = parseInt($("#limit").val());
    let search = $("#search").val();
    let ordering = $("#ordering").val();
    let availability = $("#availability").val();
    let template = "";
    $.ajax({
        url: ApiUrl("file"),
        method: "GET",
        data: {
            page: page,
            records: limit,
            search: search,
            ordering: ordering,
            is_active: availability,
        },
        headers: Tokens({ access: true }),
        beforeSend: function () {
            $("#loader").html(Loader());
        },
        success: function (data) {
            if (data.count == 0) {
                $("#listing").html(`<tr id="emptyrow"><td colspan="8" class="border-0 border-dark">${is_empty("0 Files found!")}</td><tr>`);
            } else if (data.count != 0) {
                data.results.forEach(item => { template += `<tr id="row${item.id}">${card(item)}</tr>`; });
                $("#listing").html(template);
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
loadData();