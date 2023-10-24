let nowPlaying = document.querySelector(".now-playing");
let banner = document.querySelector(".banner");
let name = document.querySelector(".name");
let artist = document.querySelector(".artist");
let pause = document.querySelector(".pause");
let previous = document.querySelector(".previous");
let next = document.querySelector(".next");
let mainSlider = document.getElementById("#main-slider");
let volume = document.querySelector(".volume");
let time = document.querySelector(".time");
let duration = document.querySelector(".duration");

let musicNumber =0;
let IsPlaying =false;
let curr_track = document.createElement('audio');

let musicLibrary = [
    {
        name:"Kesariya",
        artist:"Arijit Singh",
        image:,
        path:
    },
    {
        name:"People You Know X Starboy",
        artist:"Unknown",
        image:,
        path:
    }
];

function loadTrack(track_index){
    clearInterval(updateTime);
    resetValues();
    curr_track.src = musicLibrary[track_index].path;
    curr_track.load();
    banner.style.backgroundImage = "url("+ musicLibrary[track_index].image +")";
    name.textContent = musicLibrary[track_index].name;
    artist.textContent = musicLibrary[track_index].artist;
    nowPlaying.textContent = "PLAYING" + musicLibrary[track_index].name +"BY"+musicLibrary[track_index].artist;

    let updateTimer =setInterval(mainSlider,3000);
    curr_track.addEventListener("ended",nextTrack);
    
}
function resetValue(){
    time.textContent= "00:00";
    duration.textContent="00:00";
    mainSlider.value=0;
}
function pauseplay(){
    if(IsPlaying) play();
    else pause();
}
function play(){
    curr_track.play();
    IsPlaying= true;
    pause.innerHTML =<i class="fa-solid fa-pause" ></i>;

}
function pause(){
    curr_track.pause();
    IsPlaying=false;
    pause.innerHTML=<i class="fa-solid fa-play"></i>;
}
function nextTrack(){
    if(track_index < musicLibrary.length -1)
    track_index += 1;
    else track_index=0;
    loadTrack(track_index);
    play()
}
function previous(){
    if(track_index > 0)
    track_index-=1;
    else track_index=musicLibrary.length -1;
loadTrack(track_index);
play();
}