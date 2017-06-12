$(document).ready(function () {
    var previewId = "#preview";
    var fileId = "#file";
    var submitId = "#submit";
    var messageClass = ".message";
    var fileName = "";
    var fileData = "";
    var fileInfo = {data:0};
    var exp = "";
    var mas_exp = [];
    $(submitId).prop('disabled', true);

    $("#file_name").on('input', function () {
        if (/[\\/:*?"<>!]/.test($("#file_name").val())){
            $(submitId).prop('disabled', true);
            $(".check_file_name").css("display", "inline");
        }
        else {
            $(submitId).prop('disabled', false);
            $(".check_file_name").css("display", "none");
        }
            
    });

    $(fileId).change(function () {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            $(submitId).prop('disabled', false);
            fileData = event.target.result;
            $(previewId).attr("src", fileData);
            fileInfo.filename = file.name;
            fileInfo.data = fileData;
            $("#file_name").val(fileInfo.filename.split(".")[0]);
            $(".check_submit").css("display", "none");
        };
        reader.readAsDataURL(file);
    });

    $(submitId).click(function (e) {
        if (fileInfo.data == 0) {
            $(submitId).prop('disabled', true);
            $(".check_submit").css("display", "inline");
        } else {
            $(submitId).prop('disabled', false);
            $(".check_submit").css("display", "none");
        }
        mas_exp = fileInfo.filename.split(".");
        if ($("#file_name").val() != '') {
            fileInfo.filename = $("#file_name").val() + "." + mas_exp[mas_exp.length-1];
        }
        $(submitId).prop('disabled', true);
        $.ajax({
             url: "/Image/AddImageAjax",
             type: 'POST',
             data: {
                 fileName: fileInfo.filename,
                 data: fileInfo.data
             },
             success: function (data) {
                $(submitId).prop('disabled', false);
                $(previewId).attr("src", "");
                $(fileId).val("");
                $("#file_name").val("");
                $(".content__gallery").append('<img class="content__gallery__item__image" src="' + fileData + '" />');
                if (mas_exp[mas_exp.length - 1] == "png")
                    $(".content__gallery__item__image:last-child").css("border", "10px solid #fc5f45");
                if (mas_exp[mas_exp.length - 1] == "jpg" || mas_exp[mas_exp.length - 1] == "jpeg")
                    $(".content__gallery__item__image:last-child").css("border", "10px solid #3f51b5");
                if (mas_exp[mas_exp.length - 1] != "png" && mas_exp[mas_exp.length - 1] != "jpg"
               && mas_exp[mas_exp.length - 1] != "jpeg")
                    $(".content__gallery__item__image:last-child").css("border", "10px solid #e8c817");
                $(messageClass).hide();
                $(messageClass).text('Upload completed');
                $(messageClass).show(500);
                $(messageClass).hide(2000);
             }
        });
        e.preventDefault();
    });

    $(".content__gallery").on("click", "img", function () {
        $(".full_view").css("display", "flex");
        var src = $(this).attr("src");
        $(".full_view__image").attr("src", src);
    });
    $(".full_view").on("click", ".full_view__image", function () {
        $(".full_view").css("display", "none");
    });

    $("#checkbox1").change(function () {
        $(".content__gallery__item__image").each(function () {
            mas_exp = $(this).attr("src").split(".");
            if (mas_exp[mas_exp.length - 1] == "jpg" || mas_exp[mas_exp.length - 1] == "jpeg") {
                if ($("#checkbox1").prop('checked')) {
                    $(this).css("display", "block");
                } else {
                    $(this).css("display", "none");
                }
            }
        });
    });

    $("#checkbox2").change(function () {
        $(".content__gallery__item__image").each(function () {
            mas_exp = $(this).attr("src").split(".");
            if (mas_exp[mas_exp.length - 1] == "png") {
                if ($("#checkbox2").prop('checked')) {
                    $(this).css("display", "block");
                } else {
                    $(this).css("display", "none");
                }
            }
        });
    });

    $("#checkbox3").change(function () {
        $(".content__gallery__item__image").each(function () {
            mas_exp = $(this).attr("src").split(".");
            if (mas_exp[mas_exp.length - 1] != "png" && mas_exp[mas_exp.length - 1] != "jpg"
                && mas_exp[mas_exp.length - 1] != "jpeg") {
                if ($("#checkbox3").prop('checked')) {
                    $(this).css("display", "block");
                } else {
                    $(this).css("display", "none");
                }
            }
        });
    });
  
});