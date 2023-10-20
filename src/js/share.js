$(document).on("click", ".shareBtn", function () {
    const type = $(this).data("type");
    const link = window.location;
    if (type == "twitter") {
        window.open("https://twitter.com/intent/tweet?text=" + link)
    } else if (type == "facebook") {
        window.open("https://www.facebook.com/sharer.php?u=" + link)
    } else if (type == "linkedin") {
        window.open("https://www.linkedin.com/shareArticle?mini=true&url=" + link)
    } else if (type == "link") {
        navigator.clipboard.writeText(link);
    }
});