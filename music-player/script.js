const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//Song titles
const songs = ['hey', 'summer', 'ukulele'];

//Keep track of songs
let songIndex = 0;

//Initially load song details into DOM


function loadSong(song) {

  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
  const songName = song[0].toUpperCase() + song.slice(1);

  title.innerText = songName;

}

//Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

//Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
}

//Change songIndex
prevBtn.addEventListener('click', () => {
  if (songIndex == 0) {
    prevBtn.setAttribute('disabled', '');
    nextBtn.removeAttribute('disabled');
  } else {
    if (0 < songIndex) {
      prevBtn.removeAttribute('disabled');
      songIndex = songIndex - 1;
    }
  }

  loadSong(songs[songIndex]);
  pauseSong();

});

//Change songIndex
nextBtn.addEventListener('click', () => {
  if (songIndex == 2) {
    nextBtn.setAttribute('disabled', '');
    prevBtn.removeAttribute('disabled');
  } else {
    if (songIndex < 2) {
      nextBtn.removeAttribute('disabled');
      songIndex = songIndex + 1;
    }
  }

  loadSong(songs[songIndex]);
  pauseSong();
});

//Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

//Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//Time/song update
audio.addEventListener('timeupdate', updateProgress);