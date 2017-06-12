$(document).ready(function () {
    $.get('/Image/GetImages', function (data) {
        data.forEach(function (imgObj) {
            $(".content__gallery").append('<img class="content__gallery__item__image" src="'
                + imgObj.Url + '" />');
        });
    })

    window.onload = function () {
        $(".content__gallery__item__image").each(function () {
            mas_exp = $(this).attr("src").split(".");
            if (mas_exp[mas_exp.length - 1] == "png")
                $(this).css("border", "10px solid #fc5f45");
            if (mas_exp[mas_exp.length - 1] == "jpg" || mas_exp[mas_exp.length - 1] == "jpeg")
                $(this).css("border", "10px solid #3f51b5");
            if (mas_exp[mas_exp.length - 1] != "png" && mas_exp[mas_exp.length - 1] != "jpg"
                && mas_exp[mas_exp.length - 1] != "jpeg")
                $(this).css("border", "10px solid #e8c817");
        });
    };
});


