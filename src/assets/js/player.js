(function IIFE() {
	const list = [
	{
		id: 1,
		class: 'hollow',
		url: "https://raw.githubusercontent.com/Xuan002/Brive-Streaming-Music/main/src/assets/music/Hollow%20Knight%20OST%20-%20Hornet.mp3",
		author: "Christopher Larkin",
		title: "Hornet"
	},
	{
		id: 2,
		class: 'gris',
		url: "https://raw.githubusercontent.com/Xuan002/Brive-Streaming-Music/main/src/assets/music/In%20Your%20Hands.mp3",
		author: "Berlinist",
		title: "In Your Hands"
	},
	{
		id: 3,
		class: 'royOrbison',
		url: "https://rawcdn.githack.com/Kerthin/musicPlayer-templateSait/4df6444e97123a39d036f1f9b57973858f70bae5/docs/music/RoyOrbison_OhPrettyWoman.mp3",
		author: "Roy Orbison",
		title: "Oh, Pretty Woman"
	},
	{
		id: 4,
		class: 'frankSinatra',
		url: "https://rawcdn.githack.com/Kerthin/musicPlayer-templateSait/4df6444e97123a39d036f1f9b57973858f70bae5/docs/music/FrankSinatra_ThatsLife.mp3",
		author: "Frank Sinatra",
		title: "That's Life"
	},
	{
		id: 5,
		class: 'jimCroce',
		url: "https://rawcdn.githack.com/Kerthin/musicPlayer-templateSait/4df6444e97123a39d036f1f9b57973858f70bae5/docs/music/JimCroce_TimeInABottle.mp3",
		author: "Jim Croce",
		title: "Time In A Bottle"
	},
	{
		id: 6,
		class: 'lenaRaine2',
		url: "https://raw.githubusercontent.com/Xuan002/Brive-Streaming-Music/main/src/assets/music/otherside.mp3",
		author: "Lena Raine",
		title: "Otherside "
	},
	{
		id: 7,
		class: 'NFS',
		url: "https://raw.githubusercontent.com/Xuan002/Brive-Streaming-Music/main/src/assets/music/Snoop%20Dogg%20%26%20The%20Doors%20-%20Riders%20On%20The%20Storm%20(Fredwreck%20Remix)%20(NFS%20Underground%202%20OST)%20%5BHQ%5D.mp3",
		author: "Snoop Dogg & The Doors",
		title: "Riders On The Storm "
	},
	{
		id: 8,
		class: 'michaelHunter ',
		url: "https://raw.githubusercontent.com/Xuan002/Brive-Streaming-Music/main/src/assets/music/San%20Andreas%20Theme%20Song.mp3",
		author: "Michael Hunter ",
		title: "San Andreas Theme Song"
	},
	{
		id: 9,
		class: 'lenaRaine',
		url: "https://raw.githubusercontent.com/Xuan002/Brive-Streaming-Music/main/src/assets/music/Resurrections.mp3",
		author: "Lena Raine",
		title: "Resurrections"
	},
	{
		id: 10,
		class: 'tobyFox',
		url: "https://raw.githubusercontent.com/Xuan002/Brive-Streaming-Music/main/src/assets/music/ASGORE.mp3",
		author: "Toby Fox",
		title: "ASGORE"
	}
];

let currentId = 0;
let isPlaying = false;
let isLoop = true;
let loopOne = false;
let isShuffle = false;
let currentAudio = "music1";
let timer = null;

const albumWrap = document.querySelector(".album");
const currentTimeIndicator = document.querySelector(".musicTime__current");
const leftTimeIndicator = document.querySelector(".musicTime__last");
const progressBar = document.getElementById("length");
const title = document.querySelector(".musicInfo__name");
const author = document.querySelector(".musicInfo__author");

const albumClass = document.getElementById("jsAlbum");
const playBtn = document.getElementById("play");
const loopBtn = document.getElementById("loop");
const shuffleBtn = document.getElementById("shuffle");
const forwardBtn = document.getElementById("forward");
const backwardBtn = document.getElementById("backward");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressDiv = document.getElementById("progress");

// BUTTON PLAY
function play(e) {
	if (!isPlaying) {
		e.target.classList.remove("_play");
		e.target.classList.add("_pause");

		albumWrap.classList.remove("_play");
		albumWrap.classList.add("_pause");

		isPlaying = true;
		document.getElementById(currentAudio).play();
		showTime();
	} else {
		e.target.classList.remove("_pause");
		e.target.classList.add("_play");

		albumWrap.classList.remove("_pause");
		albumWrap.classList.add("_play");

		isPlaying = false;
		document.getElementById(currentAudio).pause();
		clearInterval(timer);
	}
}

// TIME
function changeBar() {
	const audio = document.getElementById(currentAudio);
	const percentage = (audio.currentTime / audio.duration).toFixed(3);
	progressBar.style.transition = "";

	//set current time
	const minute = Math.floor(audio.currentTime / 60);
	const second = Math.floor(audio.currentTime % 60);
	const leftTime = audio.duration - audio.currentTime;
	currentTimeIndicator.innerHTML = ("0" + minute).substr(-2) + ":" + ("0" + second).substr(-2);

	//set left time
	const leftMinute = Math.floor(leftTime / 60);
	const leftSecond = Math.floor(leftTime % 60);

	leftTimeIndicator.innerHTML = ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);

	//set time bar
	progressBar.style.width = percentage * 100 + "%";
}

function showTime() {
	timer = setInterval(() => changeBar(), 500);
}

// SWITCHING MUSIC
function nextMusic(mode) {
	playBtn.classList.remove("_pause");
	playBtn.classList.add("_play");

	albumWrap.classList.remove("_pause");
	albumWrap.classList.add("_play");

	document.getElementById(currentAudio).pause();
	isPlaying = false;
	clearInterval(timer);

	if (mode === "next") {
		currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
		init();
	} else {
		currentId = currentId - 1 < 0 ? list.length - 1 : currentId - 1;
		init();
	}
}

// STARTING A RANDOM TRACK
function shuffle(e) {
	isShuffle = !isShuffle;
	if (isShuffle) {
		e.target.classList.add("_shuffle");
	} else {
		e.target.classList.remove("_shuffle");
	}
}

// 5 SECONDS AGO
function backward() {
	const audio = document.getElementById(currentAudio);
	audio.currentTime -= 5;
	if (!isPlaying) {
		changeBar();
	}
}

// 5 SECONDS AHEAD
function forward() {
	const audio = document.getElementById(currentAudio);
	audio.currentTime += 5;
	if (!isPlaying) {
		changeBar();
	}
}

// STOP MUSIC
function stopMusic() {
	playBtn.classList.add("_play");
	albumWrap.classList.add("_play");
	isPlaying = false;
}

// THE START OF THE NEXT TRACK
function goToNextMusic() {
	let newId = currentId;
	while (isShuffle && !loopOne && newId === currentId) {
		newId = Math.floor(Math.random() * Math.floor(list.length - 1));
	}

	if (!isShuffle && !loopOne) {
		currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
	}
	if (!isShuffle && loopOne) {
		currentId = currentId;
	}

	if (isShuffle) {
		currentId = newId;
	}
	init();
	document.getElementById(currentAudio).play();
}

// THE PLAYBACK MODE OF THE TRACK
function loop(e) {
	const audio = document.getElementById(currentAudio);

	if (!isLoop && !loopOne) {
		isLoop = true;
		loopOne = false;
		e.target.classList.remove("_off");
		e.target.classList.add("_loop");
		audio.loop = false;
		audio.onended = e => goToNextMusic();
		console.log(isLoop, loopOne);
	} else if (isLoop && !loopOne) {
		isLoop = true;
		loopOne = true;
		e.target.classList.remove("_loop");
		e.target.classList.add("_repeat");
		audio.loop = true;
		audio.onended = e => goToNextMusic();
		console.log(isLoop, loopOne);
	} else {
		isLoop = false;
		loopOne = false;
		e.target.classList.remove("_repeat");
		e.target.classList.add("_off");
		audio.loop = false;
		audio.onended = e => stopMusic();
		console.log(isLoop, loopOne);
	}
}

// PROGRESS 
function progress(e) {
	const audio = document.getElementById(currentAudio);
	const pos = (e.pageX - progressDiv.getClientRects()[0].x) / progressDiv.getClientRects()[0].width;
	audio.currentTime = pos * audio.duration;
	changeBar();
}

function init() {
	const audio = document.getElementById(currentAudio) === null ? new Audio() : document.getElementById(currentAudio);
	audio.src = list[currentId].url;
	audio.id = currentAudio;
	document.getElementById(currentAudio) === null ? document.body.appendChild(audio) : "";

	progressBar.style.transition = "none";
	progressBar.style.width = "0%";
	document.getElementById(currentAudio).currentTime = 0;

	albumClass.classList = (list[currentId].class);
	title.innerHTML = list[currentId].title;
	author.innerHTML = list[currentId].author;

	//set current time
	audio.addEventListener("loadedmetadata", function () {
		const leftMinute = Math.floor(audio.duration / 60);
		const leftSecond = Math.floor(audio.duration % 60);
		currentTimeIndicator.innerHTML = "00:00";
		leftTimeIndicator.innerHTML = ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);
		progressBar.style.transition = "";
	});

	document.getElementById(currentAudio).onended = e => goToNextMusic(e);
}

	playBtn.addEventListener("click", play);
	loopBtn.addEventListener("click", loop);

	shuffleBtn.addEventListener("click", shuffle);
	nextBtn.addEventListener("click", forward);
	prevBtn.addEventListener("click", backward);

	forwardBtn.addEventListener("click", e => nextMusic("prev"));
	backwardBtn.addEventListener("click", e => nextMusic("next"));
	progressDiv.addEventListener("click", e => {
		progress(e);
	});

	init();
})();

