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


$(document).ready(function () {
    writeSelect(uniqMark(jsonData), "#select-mark", 1);
    writeSelect(uniqSize(jsonData), "#select-size", 2);
    writeTable(jsonData);
})

function uniqMark(sel){
    
    let seen = {};
    return sel.filter(function(item) {
        return seen.hasOwnProperty(item.mark) ? false : (seen[item.mark] = true);
    });
}

function uniqSize(sel){
    
    let seen = {};
    return sel.filter(function(item) {
        return seen.hasOwnProperty(item.size) ? false : (seen[item.size] = true);
    });
}


function writeSelect(table, select, numbType) {
    let selectMark = $(select);
    let tr, th, a;

    $.each(table, function (i, item) {
        tr = $('<tr>');
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
            if (i < 2) {
                if (i == 0) {
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
        });
        tbody_container.append(tr);
    });
}

function filter(markFilter, sizeFilter) {

    let tbody_container = $('#tbody');

    let filterArray = jsonData.filter(function (arr) {
        if (markFilter.options[markFilter.selectedIndex].value === 'null') {
            if (sizeFilter.options[sizeFilter.selectedIndex].value !== 'null') {
                return arr.size == sizeFilter.options[sizeFilter.selectedIndex].value;
            } else {
                return arr;
            }
        } else {
            if (sizeFilter.options[sizeFilter.selectedIndex].value === 'null') {
                return arr.mark == markFilter.options[markFilter.selectedIndex].value;

            } else {
                return ((arr.mark == markFilter.options[markFilter.selectedIndex].value) && (arr.size == sizeFilter.options[sizeFilter.selectedIndex].value));
            }
        }
    });
    $('#tbody').empty();
    writeTable(filterArray);
}

function resetTable() {
    console.log(jsonData);
    $('#tbody').empty();
    writeTable(jsonData);
    
}