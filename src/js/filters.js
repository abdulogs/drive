// Ordering 
$(document).on("change", "#ordering", function (e) {
    e.preventDefault();
    loadData();
});
// Ordering 


// Limit
$(document).on("change", "#limit", function (e) {
    e.preventDefault();
    loadData();
});
// Limit


// Status 
$(document).on("change", "#availability", function (e) {
    e.preventDefault();
    loadData();
});
// Status 


// Filter 
$(document).on("submit", "#filter", function (e) {
    e.preventDefault();
    loadData();
    $("#previous").val(1);
    $("#next").val(2);
});
// Filter 


// Reset filters
$(document).on("click", ".reset-btn", function (e) {
    e.preventDefault();
    $("#limit").val(30);
    $("#search").val("");
    $("#ordering").val("-id");
    $("#availability").val("");
    $(".availability").prop("checked", false);
    $(".ordering").prop("checked", false);
    $(".limit").prop("checked", false);

    $(".availability").prop("checked", false);
    $("#sort1").prop("checked", true);
    $("#record30").prop("checked", true);

    loadData();
    $("#previous").val(1);
    $("#next").val(2);
});
// Reset filters


// Filter selection
$(document).on("submit", "#select_data", function (e) {
    e.preventDefault();
    loadData();
    $("#previous").val(1);
    $("#next").val(2);

});
// Filter selection


// Reset Filter
$(document).on("click", "#reset_selection", function (e) {
    e.preventDefault();
    $('#select_data').trigger("reset");
    loadData();
    $("#previous").val(1);
    $("#next").val(2);
});
// Reset Filter


$(document).on("click", "#previousBtn", function () {
    let page = $(this).val();
    loadData(page);;
});

$(document).on("click", "#nextBtn", function () {
    let page = $(this).val();
    loadData(page);;
});