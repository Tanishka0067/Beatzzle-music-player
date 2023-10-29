const musicPlayer = document.querySelector(".music-player");
let nowPlaying = document.querySelector(".now-playing");
let banner = document.querySelector(".banner");
let name = document.querySelector(".name");
let artist = document.querySelector(".artist");
let pause = document.querySelector(".pause");
let previous = document.querySelector(".previous");
let next = document.querySelector(".next");
let mainSlider = document.getElementById("main-slider");
let Volume = document.querySelector(".volume-slider");
let volumeSetting = document.querySelector(".vol-icon");
let time = document.querySelector(".time");
let duration = document.querySelector(".duration");
var updateTimer;
let track_index = 0;
let IsPlaying = false;
let curr_track = document.createElement("audio");
const list = document.querySelector(".list");
let addtp = document.querySelector(".addtoplaylist");
const playlistDisp = document.querySelector(".playlistdisp");
let Playlists = [];
let myPlaylist = [];
let theaddedList = document.querySelector(".addedlist");
let listName = document.querySelector(".listname");
let submit = document.getElementById("changeBtn");
let cross = document.querySelector(".return");
let back = document.querySelector(".back");
let songsdisp = document.querySelector(".songlistdisp");
let songList = document.querySelector(".songlist");
let trackList = document.querySelector(".track_list");
let switchPlaylist = document.querySelector(".switchPlaylist");

let musicLibrary = [
  {
    name: "Kesariya",
    artist: "Arijit Singh",
    image: "bannerimages/kesariya.jpg",
    path: "audiofiles/Kesariya.mp3",
  },
  {
    name: "I don't wanna live forever",
    artist: "Zayn x Taylor Swift",
    image: "bannerimages/idwlf.jpg",
    path: "audiofiles/IDontWannaLiveForever.mp3",
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
  // console.log(curr_track);

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
  playTrack();
}
function previousTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = musicLibrary.length - 1;
  loadTrack(track_index);
  playTrack();
}
function seek() {
  seek = curr_track.duration * (mainSlider.value / 100);
  curr_track.currentTime = seek;
  console.log("music being seeked");
}

function seekUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    mainSlider.value = seekPosition;
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSecond = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
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
  }
}

function SetVolume() {
  curr_track.volume = Volume.value / 100;
}
function keyss(event) {
  if (event.code === "ArrowUp") {
    curr_track.volume += 10;
  } else if (event.code === "ArrowDown") {
    curr_track.volume -= 10;
  } else if (event.key === "m") {
    muteUnmute();
  } else if (event.code === "Space") {
    pauseplay();
  } else if (event.code === "ArrowRight") {
    nextTrack();
  } else if (event.code === "ArrowLeft") {
    previousTrack();
  }
}
function mute() {
  curr_track.volume = 0;
  volumeSetting.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
}
function unmute() {
  curr_track.volume = Volume.value / 100;
  volumeSetting.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
  0;
}
function muteUnmute() {
  if (!curr_track.volume == 0) {
    mute();
  } else {
    unmute();
  }
}
function songlist() {
  musicPlayer.style.cssText = "display:none";
  songsdisp.style.cssText = "visibility:visible";

  for (let i = 0; i < musicLibrary.length; i++) {
    let songs = document.createElement("div");
    songs.classList.add("track_list_item");
    songs.id = i;
    songs.textContent = musicLibrary[i].name;
    let artistName = document.createElement("div");
    artistName.classList.add("track_artist");
    artistName.textContent = musicLibrary[i].artist;
    songs.addEventListener("click", () => {
      loadTrack(i);
      playTrack();
    });
    trackList.appendChild(songs);
    trackList.appendChild(artistName);
  }
}
function backbutton() {
  musicPlayer.style.cssText = "display:block";
  songsdisp.style.cssText = "visibility:hidden";
}
function playlistname() {
  var newtitle = document.getElementById("inputTextField").value;
  if (newtitle.length == 0) {
    listName = alert("Enter Playlist Name");
  } else {
    listName.innerHTML = newtitle;
  }
}
function addToPlaylist() {
  if (!myPlaylist.includes(musicLibrary[track_index])) {
    myPlaylist.push(musicLibrary[track_index]);
    addtp.innerHTML = `<i class="fa-solid fa-heart"></i>`;
  } else {
    myPlaylist.pop(musicLibrary[track_index]);
    addtp.innerHTML = `<i class="fa-regular fa-heart"></i>`;
  }
  console.log(myPlaylist);
}
function dispPlaylist() {
  musicPlayer.style.cssText = "display:none";
  playlistDisp.style.cssText = "visibility:visible";
  let liItem = "";
  myPlaylist.map(function (item) {
    liItem = `<li>${item.name}</li>
    <p>${item.artist}</p>`;
  });
  theaddedList.insertAdjacentHTML("beforeend", liItem);
}
function hideButtons() {
  switchPlaylist.style.cssText = "display:none";
}
function createPlaylist() {
  if (listName === null) {
    return;
  }
  hideButtons();
  addToPlaylist();
  dispPlaylist();
  var storeData = JSON.stringify(myPlaylist);
  localStorage.setItem(listName, storeData);
}

function displayPlayer() {
  musicPlayer.style.cssText = "display:block";
  playlistDisp.style.cssText = "visibility:hidden";
}
function switchPlaylists() {
  musicPlayer.style.cssText = "display:none";
  switchPlaylist.style.cssText = "visibility:visible";
}
/*
function createPlaylist() {
  let newPlaylist = document.createElement(Array);
  Playlists.push(newPlaylist);
  addToPlaylist();
}
var storedData = JSON.stringify(myPlaylist);
localStorage.setItem(listName,storedData);*/
loadTrack(0);
pause.addEventListener("click", pauseplay);
next.addEventListener("click", nextTrack);
previous.addEventListener("click", previousTrack);
mainSlider.addEventListener("input", seek);
Volume.addEventListener("input", SetVolume);
document.addEventListener("keydown", keyss);
addtp.addEventListener("click", addToPlaylist);
list.addEventListener("click", switchPlaylists);
submit.addEventListener("click", playlistname);
back.addEventListener("click", backbutton);
cross.addEventListener("click", displayPlayer);
songList.addEventListener("click", songlist);
