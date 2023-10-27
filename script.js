let nowPlaying = document.querySelector(".now-playing");
let banner = document.querySelector(".banner");
let name = document.querySelector(".name");
let artist = document.querySelector(".artist");
let pause = document.querySelector(".pause");
let previous = document.querySelector(".previous");
let next = document.querySelector(".next");
let mainSlider = document.getElementById("main-slider");
let Volume = document.querySelector(".volume-slider");
let volumeSetting = document.querySelector(".volume");
let time = document.querySelector(".time");
let duration = document.querySelector(".duration");
var updateTimer;
let track_index = 0;
let IsPlaying = false;
let curr_track = document.createElement("audio");

let musicLibrary = [
  {
    name: "Kesariya",
    artist: "Arijit Singh",
    image: "bannerimages/kesariya.jpg",
    path: "audiofiles/Kesariya.mp3",
  },
  {
    name: "People You Know X Starboy",
    artist: "Unknown",
    image: "bannerimages/pykxstar.jpg",
    path: "audiofiles/PeopleYouKnowxStarboy.mp3",
  },
  {
    name: "Cold",
    artist: "Neffex",
    image: "bannerimages/cold.jpg",
    path: "audiofiles/NeffexCold.mp3",
  },
  {
    name: "Perfect",
    artist: "One-Direction",
    image: "bannerimages/perfect.png",
    path: "audiofiles/Perfect.mp3",
  },
  {
    name: "Style",
    artist: "Taylor Swift",
    image: "bannerimages/style.webp",
    path: "audiofiles/Style.mp3",
  },
  {
    name: "The Nights",
    artist: "Avicii",
    image: "bannerimages/nights.jpg",
    path: "audiofiles/TheNights.mp3",
  },
  {
    name: "Treat You Better",
    artist: "Shawn Mendes",
    image: "bannerimages/tyb.jpg",
    path: "audiofiles/TreatYouBetter.mp3",
  },
  {
    name: "Tourner Dans Le Vide",
    artist: "Indilla",
    image: "bannerimages/ind.jpg",
    path: "audiofiles/TournerDansLeVide.mp3",
  },
  {
    name: "MIA23",
    artist: "Charles Leclerc",
    image: "bannerimages/charles.jpeg",
    path: "audiofiles/MIA23.mp3",
  },
];

function resetValue() {
  time.textContent = "00:00";
  duration.textContent = "00:00";
  mainSlider.value = 0;
}
function loadTrack(track_index) {
  clearInterval(updateTimer);

  resetValue();
  curr_track.src = musicLibrary[track_index].path;
  curr_track.load();
  banner.style.backgroundImage = "url(" + musicLibrary[track_index].image + ")";
  name.textContent = musicLibrary[track_index].name;
  artist.textContent = musicLibrary[track_index].artist;
  nowPlaying.textContent =
    "Playing " +
    musicLibrary[track_index].name +
    " by " +
    musicLibrary[track_index].artist;
  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function playTrack() {
  curr_track.play();
  console.log(curr_track);

  IsPlaying = true;
  pause.innerHTML = `<i class="fa-solid fa-pause" ></i>`;
}
function pauseTrack() {
  curr_track.pause();
  IsPlaying = false;
  pause.innerHTML = `<i class="fa-solid fa-play"></i>`;
}
function pauseplay() {
  if (!IsPlaying) {
    playTrack();
  } else {
    pauseTrack();
  }
}

function nextTrack() {
  if (track_index < musicLibrary.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  pauseplay();
}
function previousTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = musicLibrary.length - 1;
  loadTrack(track_index);
  pauseplay();
}
function seek() {
  seek = curr_track.duration * (mainSlider.value / 100);
  curr_track.currentTime = seek;
  console.log("Seeeeeeeeeeek");
}
function seekUpdate() {
  let seekPosition = 0;
  if(!isNaN(curr_track.duration)){
 seekPosition = curr_track.currentTime*(100 / curr_track.duration);
 mainSlider.value=seekPosition;
  let currentMinutes = Math.floor(curr_track.currentTime / 60);
  let currentSecond = Math.floor(curr_track.currentTime - currentMinutes * 60);
  let durationminute = Math.floor(curr_track.duration / 60);
  let durationseconds = Math.floor(curr_track.duration - durationminute * 60);

//   console.log(currentMinutes);
  if (currentMinutes < 10) {
    currentMinutes = "0" + currentMinutes;
  }
  if (currentSecond < 10) {
    currentSecond = "0" + currentSecond;
  }
  if (durationminute < 10) {
    durationminute = "0" + durationminute;
  }
  if (durationseconds < 10) {
    durationseconds = "0" + durationseconds;
  }
  time.textContent = currentMinutes + ":" + currentSecond;
  duration.textContent = durationminute + ":" + durationseconds;
}}

function SetVolume() {
  curr_track.volume = Volume.value/100;
  
}
function keyss(event){
    if(event.code ==='ArrowUp'){
      curr_track.volume +=10; 
    
    }
    else if(event.code==='ArrowDown'){
        curr_track.volume -=10;
    }else if(event.key ==='m'){
        muteUnmute();
    }

    else if(event.code ==='Space'){
        pauseplay();

    }
    else if(event.code==='ArrowRight'){
        nextTrack();
       
    }else if(event.code==='ArrowLeft'){
        previousTrack();
    }
}
function mute(){
    curr_track.volume=0;
    volumeSetting.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`
}
function unmute(){
    curr_track.volume=Volume.value/100;
    // document.innerHTML = volumeSetting; 
}
function muteUnmute(){
    
    // curr_track.volume=0;
    // volumeSetting.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    // volumeSetting.addEventListener("click", function(event2){
    //     if(event2.key==='m'){
    //         curr_track.volume=100;
    //     }
    //  })
    if (!curr_track.volume==0) {
       mute() ;
      } else {
        unmute();
      }
    
}
loadTrack(0);
pause.addEventListener("click", pauseplay);
next.addEventListener("click", nextTrack);
previous.addEventListener("click", previousTrack);
mainSlider.addEventListener("input",seek);
Volume.addEventListener("input",SetVolume);
document.addEventListener('keydown',keyss);
// document.addEventListener("keydown",muteUnmute);