$('.file-upload').change(function() {
    console.log("**");
    if ($(this).val() != '') $(this).prev().text('Файл вибрано');
    else $(this).prev().text('Виберіть файл');
});

