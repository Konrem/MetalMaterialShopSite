$('.file-upload').change(function() {
    console.log("**");
    if ($(this).val() != '') $(this).prev().text('Файл вибрано');
    else $(this).prev().text('Виберіть файл');
});


const audio = new Audio('music.mp3');
  
let play=true;

function playPauseAudio() {
    if (play===true){
        audio.play();
        play=false;
        $("#play").removeClass("d-block");
        $("#play").addClass("d-none");
        $("#pause").removeClass("d-none");
        $("#pause").addClass("d-block");
    } else {
        audio.pause();
        play=true;
        $("#pause").removeClass("d-block");
        $("#pause").addClass("d-none");
        $("#play").removeClass("d-none");
        $("#play").addClass("d-block");
    }
    audio.addEventListener('ended',function(){
        audio.currentTime = 0;
        $("#pause").removeClass("d-block");
        $("#pause").addClass("d-none");
        $("#play").removeClass("d-none");
        $("#play").addClass("d-block");
    }, false);
}
