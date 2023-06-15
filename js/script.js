$('.file-upload').change(function () {
    console.log("**");
    if ($(this).val() != '') $(this).prev().text('Файл вибрано');
    else $(this).prev().text('Виберіть файл');
});


const audio = new Audio('music.mp3');

let play = true;

function playPauseAudio() {
    if (play === true) {
        audio.play();
        play = false;
        $("#play").removeClass("d-block");
        $("#play").addClass("d-none");
        $("#pause").removeClass("d-none");
        $("#pause").addClass("d-block");
    } else {
        audio.pause();
        play = true;
        $("#pause").removeClass("d-block");
        $("#pause").addClass("d-none");
        $("#play").removeClass("d-none");
        $("#play").addClass("d-block");
    }
    audio.addEventListener('ended', function () {
        audio.currentTime = 0;
        $("#pause").removeClass("d-block");
        $("#pause").addClass("d-none");
        $("#play").removeClass("d-none");
        $("#play").addClass("d-block");
    }, false);
}

var catalogInTable = [];

$(document).ready(function () {
    newTable(stainless, "#tube");
    // writeSelect(uniqMark(catalogInTable), "#select-mark", 2);
    // writeSelect(uniqSize(catalogInTable), "#select-size", 3);
    // writeTable(catalogInTable);
})

function uniqMark(sel) {

    let seen = {};
    return sel.filter(function (item) {
        return seen.hasOwnProperty(item.mark) ? false : (seen[item.mark] = true);
    });
}

function uniqSize(sel) {

    let seen = {};
    return sel.filter(function (item) {
        return seen.hasOwnProperty(item.size) ? false : (seen[item.size] = true);
    });
}


function writeSelect(table, select, numbType) {
    let selectMark = $(select);
    let tr, th, a;

    let option = $('<option value="null" selected>');
    if (numbType === 1) {
        option.text("-- Виберіть марку --");
    } else {
        option.text("-- Виберіть розмір --");
    }
    selectMark.append(option);

    $.each(table, function (i, item) {
        let vals = Object.values(item);
        let fullName;

        $.each(vals, (i, elem) => {
            if (i == numbType) {
                let option = $('<option value=' + elem + '>');
                option.text(elem);
                selectMark.append(option);
            }
        });
    });
}

function writeTable(table) {
    let tbody_container = $('#tbody');
    let tr, th, a;

    $.each(table, function (i, item) {
        tr = $('<tr>');

        let vals = Object.values(item);
        let fullName;

        $.each(vals, (i, elem) => {
            if (i != 0) {
                if (i < 3) {
                    if (i == 1) {
                        th = $('<td class="col-9 px-3 py-2">');
                        a = $('<a href="#" class="link-catalog">');
                        fullName = elem + ', ';
                    } else {
                        fullName += elem;
                        a.text(fullName);
                        th.append(a);
                        tr.append(th);
                    }
                } else {
                    let th = $('<td class="col-1 text-center px-3 py-2 d-none d-sm-table-cell">');
                    th.text(elem);
                    tr.append(th);
                }
            }
        });
        tbody_container.append(tr);
    });
}
function emptyTable() {
    let tbody_container = $('#tbody');
    let tr, th;
    tr = $('<tr>');
    th = $('<td class="col-12 text-center px-3 py-2" colspan="4">');
    th.text("За вашим запитом продукції не знайдено.");
    tr.append(th);
    tbody_container.append(tr);
}

function filter() {

    let markFilter = $('#select-mark').val();
    let sizeFilter = $('#select-size').val();
    let tbody_container = $('#tbody');


    let filterArray = catalogInTable.filter(function (arr) {
        if (markFilter === 'null') {
            if (sizeFilter !== 'null') {
                return arr.size == sizeFilter;
            } else {
                return arr;
            }
        } else {
            if (sizeFilter === 'null') {
                return arr.mark == markFilter;

            } else {
                return ((arr.mark == markFilter) && (arr.size == sizeFilter));
            }
        }
    });
    $('#tbody').empty();
    if (Object.keys(filterArray)[0] == undefined) {
        emptyTable();
    } else {
        writeTable(filterArray);
    }
}

function resetTable() {
    $('#select-mark option').prop('selected', false);
    $('#select-size option').prop('selected', false);
    $('#tbody').empty();
    writeTable(catalogInTable);

}
function newTable(newTableName, teg) {
    if ($(teg).attr('data-type') == "null") {
        catalogInTable = newTableName;
    } else {
        catalogInTable = newTableName.filter(function (arr) {
            if (arr.type == $(teg).attr('data-type')) return arr;
        });
    }

    $('#tbody').empty();
    $('#select-mark').empty();
    $('#select-size').empty();
    writeSelect(uniqMark(catalogInTable), "#select-mark", 2);
    writeSelect(uniqSize(catalogInTable), "#select-size", 3);
    if (Object.keys(catalogInTable)[0] == undefined) {
        emptyTable();

    } else {
        writeTable(catalogInTable);
    }

    $('.sidebar-catalog a').removeClass('active');
    $(teg).addClass('active');
}