document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        $("#response").html(Loader());
    } else {
        $("#response").html("");
    }
};

function Loader(timer = "") {
    return `
    <div class="toast shadow border-0 rounded-4 p-2 show bg-gray-700 d-flex align-items-center w-100 px-3">
        <span class="font-20 bx bx-loader-alt bg-dark text-primary rounded-circle p-1 me-2 bx-spin"></span>
        <p class="m-0 font-14 fw-bold me-2 text-white">${timer} Loading...</p>
    </div>`
}

function ApiUrl(name) {
    return `${window.location.origin}/api/${name}`;
}

function Tokens(tokens) {
    let data = {};
    if (tokens.access == true) {
        data["Authorization"] = "Bearer " + localStorage.getItem("access_token");
    }

    if (tokens.csrf == true) {
        data["X-CSRFToken"] = document.getElementById("token").value;
    }
    return data;
}

function timenow(timestamp) {
    return `<p class="text-muted ms-auto m-0 font-12 d-flex align-items-center" title="${moment(timestamp).format('MMMM Do YYYY, hh:mm A')}">
                <b class="text-warning bx bx-time me-1 font-16"></b> 
                <span data-time="${timestamp}" class="getTime">${moment(timestamp).fromNow()}</span>
            </p>`;
}

function updateTime() {
    $(".getTime").each(function () {
        let time = $(this).data("time");
        $(this).html(moment(time).fromNow());
    });
}
setInterval(updateTime, 10000);

function fullname(data) {
    let first_name = (data.first_name) ? data.first_name : "";
    let last_name = (data.last_name) ? data.last_name : "";

    return first_name + " " + last_name;
}

function username(data) {
    return (data.username != null) ? `<span class="fw-normal">@${data.username}</span>` : `<span class="fw-normal">@anonymous</span>`;
}

function avatar(data, size = "30") {
    return `<a href="${placeholder(data.avatar)}" data-lightbox="avatar" data-title="${data.first_name} ${data.last_name}" class="size-${size} d-inline-block swipebox" data-id="${data.id}" title="${fullname(data)}">
                <img src="${placeholder(data.avatar)}"  class="rounded-circle border w-100 h-100 object-center object-cover"/>
            </a>`;
}

function createdby(data) {
    return `
    <div class="d-flex align-items-center">
        <div class="me-2">
            ${avatar(data, 30)}
        </div>
        <div class="me-2 text-muted">
            <h6 class="m-0 font-14 text-truncate"><b>${fullname(data)}</b></h6>
            <p class="m-0 text-truncate text-muted">${username(data)}</p>
        </div>
    </div>`
}

function spinner() {
    return `
    <p class="m-0 d-flex align-items-center justify-content-center py-3 m-auto" id="spinner">
        <span class="spinner-border text-success spinner-sm"></span>  
        <span class="ms-2">Loading...</span>
    </p>
    `;
}

const access_token = localStorage.getItem('access_token')
const user_id = localStorage.getItem('user_id')

function placeholder(name) {
    if (BASEURL("media/placeholder.png") == name) {
        return BASEURL("src/images/placeholder.png");
    } else if (BASEURL("media/avatar.png") == name) {
        return BASEURL("src/images/avatar.png");
    } else if ("src/images/avatar.png" == name) {
        return BASEURL("src/images/avatar.png");
    } else if ("src/images/placeholder.png" == name) {
        return BASEURL("src/images/placeholder.png");
    } else if (name == "") {
        return BASEURL("src/images/placeholder.png");
    } else {
        return name
    }
}

function image(name) {
    return ` <a href="${placeholder(name)}" class="lightbox text-decoration-none">
                <img src="${placeholder(name)}" width="25" height="25" class="rounded"/>
            </a>`;
}

function is_active(data) {
    if (data == 1) {
        return `<b class="text-success bx bxs-check-circle font-16 mx-1 d-inline-block bx-tada-hover" title="Active"></b>`;
    } else {
        return `<b class="text-success bx bx-circle font-16 mx-1 d-inline-block bx-tada-hover" title="Inactive"></b>`;
    }
}

function is_empty(msg = "No data") {
    let template = `
        <div class="text-center w-100 py-4" id="empty-card">
            <svg viewBox="0 0 48 48" fill="none" width="200" xmlns="http://www.w3.org/2000/svg" stroke="#666"
                stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter">
                <path  d="M24 5v6m7 1 4-4m-18 4-4-4m28.5 22H28s-1 3-4 3-4-3-4-3H6.5M40 41H8a2 2 0 0 1-2-2v-8.46a2 2 0 0 1 .272-1.007l6.15-10.54A2 2 0 0 1 14.148 18H33.85a2 2 0 0 1 1.728.992l6.149 10.541A2 2 0 0 1 42 30.541V39a2 2 0 0 1-2 2Z"></path>
            </svg>
            <h5 class="text-muted"><b>${msg}</b></h5>
        </div>`;
    return template;
}

function modalOpen(id) {
    new bootstrap.Modal(document.getElementById(id), {}).show();
}

function modalClose(id) {
    const modal = bootstrap.Modal.getInstance(document.getElementById(id));
    modal.hide();
}

function scrollToUp(id) {
    document.getElementById(id).scrollIntoView({
        block: 'start',
        behavior: 'smooth',
    });
}

function scrollToDown(id) {
    document.getElementById(id).scrollIntoView({
        block: 'end',
        behavior: 'smooth',
    });
}

function confirmbox(data = { id: "confirmbox", title: "Are you sure?", description: "Do you really want to delete this" }) {
    let modal = new Promise(function (resolve, reject) {
        modalOpen(data.id);
        document.getElementById("confirmTitle").innerHTML = data.title;
        document.getElementById("confirmDescription").innerHTML = data.description;
        $(document).on("click", ".deleteYes", function () {
            resolve(true)
        });
    })
    return modal;
}

function uploadingStatus(xhr, msg = "Uploading") {
    xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
            let percentComplete = parseInt(((evt.loaded / evt.total) * 100));

            $("#response").html(`
            <div class="toast shadow border-0 rounded-3 show bg-gray-700">
                <div class="toast-body d-flex align-items-center border-0 bg-transparent py-2">
                    <div class="font-16 bx bx-loader bx-spin bg-dark text-primary rounded-circle p-1 border border-light border-5">
                    </div>
                    <div class="ms-2 me-2">
                        <h6 class="text-white fw-bold m-0">${msg} ${percentComplete}%</h6>
                    </div>
                    <button type="button" class="btn-close ms-auto shadow-none btn-dark me-2"
                        data-bs-dismiss="toast"></button>
                </div>
            </div>`)
        }
    }, false);
    return xhr;
}

function NextPreviousBtns(data, page = 1, limit) {

    $("#totalCount").html(`${page} to ${limit} of ${data.count}`);

    if (data.next == null) {
        $("#nextBtn").prop("disabled", true);
    } else {
        $("#nextBtn").prop("disabled", false);
    }

    if (data.previous == null) {
        $("#previousBtn").prop("disabled", true);
    } else {
        $("#previousBtn").prop("disabled", false);
    }

    $("#nextBtn").val(data.next);
    $("#previousBtn").val(data.previous);
}




const BASEURL = (name) => {
    return `${window.location.origin}/${name}`;
}

function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    window.open("/dashboard/", '_self');
}

function time(data) {
    return moment(data).format('MMMM Do YYYY, hh:mm A');
}

function selected(val = null) {
    if (val != null) {
        if (val == 1) {
            return `<option value="1" selected>Yes</option>
            <option value="0">No</option>`;
        } else if (val == 0) {
            return `<option value="1">Yes</option>
            <option value="0" selected>No</option>`;
        }
    } else {
        return `<option value="1">Yes</option><option value="0">No</option>`;
    }
}

function available(check, val) {
    if (check) {
        return check[val];
    } else {
        return `<span class='badge badge-danger'>N/A</span>`;
    }
}

function selectMultiple(id) {
    let values = ''
    $(`#${id} :selected`).each(function (i, value) {
        values += $(value).val() + ", ";
    });
    values = values.replace(/,\s*$/, "");
    return values;
}

function file(id) {
    return $(id)[0].files[0];
}

function checked(id) {
    return ($(id).val() == 0) ? false : true;
}

function setStatus(val, con1, con2) {
    if (val) {
        return `<span class="badge bg-success">${con1}</span>`;
    } else {
        return `<span class="badge bg-dark">${con2}</span>`;
    }
}

function msgError(value = "", target = "#response") {
    $(target).html(
        `<div class="toast shadow border-0 rounded-3 show bg-dark">
          <div class="toast-body d-flex align-items-center border-0 bg-transparent">
            <div class="font-20 bx bx-x bg-danger text-white rounded-circle p-1 border border-dark border-5"></div>
              <div class="ms-2 me-2">
                <p class="m-0 font-14 text-white">${value}</p>
              </div>
              <button type="button" class="btn-close ms-auto shadow-none btn-dark me-2" data-bs-dismiss="toast"></button>
          </div>
      </div>`);
}

function msgSuccess(value = "", target = "#response") {
    $(target).html(
        `<div class="toast shadow border-0 rounded-3 show bg-dark successAlert">
          <div class="toast-body d-flex align-items-center border-0 bg-transparent">
            <div class="font-20 bx bx-check bg-success text-white rounded-circle p-1 border border-dark border-5"></div>
              <div class="ms-2 me-2">
                <p class="m-0 font-14 text-white">${value}</p>
              </div>
              <button type="button" class="btn-close ms-auto shadow-none btn-dark me-2" data-bs-dismiss="toast"></button>
          </div>
      </div>`);
    $(".successAlert").fadeOut(6000);
}

function reload() {
    setTimeout(function () {
        location.reload();
    }, 1000);
}

function redirect(location, time = 1000) {
    setTimeout(function () {
        window.open(location, "_SELF");
    }, time);
}

function loadFile(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }
}

function getChecked(id) {
    return $(id).prop("checked");
}

function setChecked(id, val) {
    return $(id).prop("checked", val);
}

function slug(data) {
    return data.replace(" ", "-").toLowerCase();
}

$(document).on("click", ".opensidenav", (e) => {
    e.preventDefault();
    $("#sidebar").show();
});

$(document).on("click", ".closesidenav", (e) => {
    e.preventDefault();
    $("#sidebar").hide();
});