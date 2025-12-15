const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const folderInput = document.getElementById('folder-input');
const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause-button');
const seekBar = document.getElementById('seek-bar');
const speedControl = document.getElementById('speed-control');
const timeInfo = document.getElementById('time0');
const timetotal = document.getElementById("time1");
const titlePlaceholder = document.getElementById('title');
const artistPlaceholder = document.getElementById('artist');
const albumPlaceholder = document.getElementById('album');
const albumArtPlaceholder = document.getElementById('album-art');
const lyricsDiv = document.getElementById('lyricsDiv');
const lyricsDiv2 = document.getElementById('lyricsDiv2');
const playlistDiv = document.getElementById('playlist');
const spdcon = document.getElementById("spd");
const previousButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const vcon = document.getElementById('volume-control');
const repeatButton = document.getElementById('repeat-button');
const shuffleButton = document.getElementById('shuffle-button'); 
const abBtn = document.getElementById('ab-btn');
const abOverlay = document.getElementById('ab-overlay');
const abArt = document.getElementById('ab-art-img');
const abTitle = document.getElementById('ab-title-text');
const abArtist = document.getElementById('ab-artist-text');
const abAlbum = document.getElementById('ab-album-text');
const fullscbtn = document.getElementById('fullscreen-btn');

let playlist = [];
let currentIndex = 0;
let isPlaying = false;
let lrcmap = new Map();
let isRepeat = false;
let isShuffle = false;

fileInput.addEventListener("change", () => handleSelectedFiles(fileInput.files));
folderInput.addEventListener("change", () => handleSelectedFiles(folderInput.files));

document.addEventListener("dragenter", () => {
    dropArea.classList.add("active");
});

document.addEventListener("dragleave", (event) => {
    if (event.relatedTarget === null || !dropArea.contains(event.relatedTarget)) {
        dropArea.classList.remove("active");
    }
});

document.addEventListener("dragover", (event) => {
    event.preventDefault();
});

document.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.classList.remove("active");
    const musicfiles = event.dataTransfer.items;
    processtask(musicfiles);
});



async function handleSelectedFiles(files) {
    playlist = [];
    lrcmap.clear();
    const fileList = Array.from(files);

    const lrcPromises = fileList
        .filter(file => file.name.toLowerCase().endsWith('.lrc'))
        .map(file => storekashi(file));
    await Promise.all(lrcPromises);

    playlist = fileList.filter(file => file.type.startsWith('audio/'));

    if (playlist.length > 0) {
        currentIndex = 0;
        updateplaylistDSP();
        loadAudio(playlist[currentIndex]);
    }
}



async function processtask(items) {
    playlist = [];
    lrcmap.clear();
    for (const item of items) {
        const entry = item.webkitGetAsEntry();
        if (entry) {
            await processEntry(entry);
        }
    }
    if (playlist.length > 0) {
        currentIndex = 0;
        updateplaylistDSP();
        loadAudio(playlist[currentIndex]);
    }
}


async function processEntry(entry) {
    if (entry.isFile) {
        const file = await new Promise((res) => entry.file(res));
        if (file.type.startsWith("audio/")) {
            playlist.push(file);
        } else if (file.name.toLowerCase().endsWith(".lrc")) {
            await storekashi(file);
        }
    } else if (entry.isDirectory) {
        const reader = entry.createReader();
        const entries = await new Promise((res) => reader.readEntries(res));
        for (const childEntry of entries) {
            await processEntry(childEntry);
        }
    }
}


async function storekashi(file) {
    const text = await file.text();
    const songName = file.name.replace(/\.lrc$/i, "");
    lrcmap.set(songName, parseLrc(text));
}



function parseLyrics(text) {
    if (!text) return [];

    if (/\[\d{2}:\d{2}\.\d{2,3}\]/.test(text)) {
        return parseLrc(text);
    } else {
        const lines = text.split('\n');
        return lines.map(line => ({ time: -1, text: line }));
    }
}


function parseLrc(text) {
    const lines = text.split("\n");
    const lyrics = [];
    for (const line of lines) {
        const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
        if (match) {
            const minutes = parseInt(match[1]);
            const seconds = parseFloat(match[2]);
            const time = minutes * 60 + seconds;
            lyrics.push({ time, text: match[3].trim() });
        }
    }
    return lyrics;
}


function displayLyrics(lyrics) {
    lyricsDiv.innerHTML = "";

    if (!lyrics || lyrics.length === 0) {
        lyricsDiv.innerHTML = "";
        return;
    }
    lyrics.forEach(({ time, text }) => {
        const p = document.createElement("p");
        p.textContent = text || " ";
        if (time >= 0) {
            p.setAttribute("data-time", time);
        }
        lyricsDiv.appendChild(p);
    });
}

audioPlayer.addEventListener("timeupdate", () => {
    const currentTime = audioPlayer.currentTime;
    const lyrics = Array.from(lyricsDiv.children);
    if (lyrics.length === 0) return;

    const hasTimestamp = lyrics.some(l => l.hasAttribute("data-time"));
    if (!hasTimestamp) {
        lyrics.forEach(p => {
            p.style.display = "";
            p.classList.remove("active");
        });
        return;
    }

    let activeIndex = -1;
    for (let i = 0; i < lyrics.length; i++) {
        const time = parseFloat(lyrics[i].getAttribute("data-time"));
        if (!isNaN(time) && currentTime >= time) {
            activeIndex = i;
        } else if (!isNaN(time) && currentTime < time) {
            break;
        }
    }

    if (activeIndex >= 0) {
        lyrics.forEach((p, idx) => {
            if (idx === activeIndex) {
                p.style.display = "";
                p.classList.add("active");
            } else {
                p.style.display = "none";
                p.classList.remove("active");
            }
        });
    } else {
        lyrics.forEach(p => {
            p.style.display = "none";
            p.classList.remove("active");
        });
    }
});



async function loadAudio(file) {
    if (audioPlayer.src) {
        URL.revokeObjectURL(audioPlayer.src);
    }
    audioPlayer.src = URL.createObjectURL(file);
    audioPlayer.load();

    const tags = await getMetadata(file);

    const songName = file.name.replace(/\.[^/.]+$/, "");
    if (lrcmap.has(songName)) {
        displayLyrics(lrcmap.get(songName));
} else if (tags) {
    let embeddedLyrics = null;

    if (tags.unsynchronised_lyrics) {
        embeddedLyrics = tags.unsynchronised_lyrics.text || tags.unsynchronised_lyrics;
    } else if (tags.USLT) {
        embeddedLyrics = tags.USLT.text || tags.USLT;
    } else if (tags.lyrics) {
        embeddedLyrics = typeof tags.lyrics === 'string' ? tags.lyrics : tags.lyrics.lyrics;
    }

    if (embeddedLyrics) {
        displayLyrics(parseLyrics(embeddedLyrics));
    } else {
        
        lyricsDiv.innerHTML = "";
    }
    console.log("メタデータ全体:", tags);

}
    
    displayMetadata(tags);
    
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.src = "pause.png";
}


function getMetadata(file) {
    return new Promise((resolve) => {
        window.jsmediatags.read(file, {
            onSuccess: (tag) => {
                resolve(tag.tags);
            },
            onError: (error) => {
                console.error("メタデータの読み取りに失敗しました。:", error);
                resolve({});
            }
        });
    });
}


function displayMetadata(tags) {
    const { title, artist, album, picture } = tags;
    titlePlaceholder.textContent = title || "タイトル不明";
    artistPlaceholder.textContent = artist || "アーティスト不明";
    albumPlaceholder.textContent = album || "アルバム不明";

let imageUrl = "art.png";
    if (picture) {
        const base64String = btoa(new Uint8Array(picture.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        imageUrl = `data:${picture.format};base64,${base64String}`;
    }
    albumArtPlaceholder.src = imageUrl;
    abTitle.textContent = title || "タイトル不明";
    abArtist.textContent = artist || "アーティスト不明";
    abAlbum.textContent = album || "アルバム不明";
    abArt.src = imageUrl;
    updateBackground(picture);
    initsys();
}


function updateplaylistDSP() {
    playlistDiv.innerHTML = "";
    playlist.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'marks-r-o';
        item.innerHTML = `<img src="music.png" alt="曲" style="width:20px;"><p><span>${file.name}</span></p>`;
        item.addEventListener('click', () => {
            currentIndex = index;
            loadAudio(file);
        });
        playlistDiv.appendChild(item);
    });
}

playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        isPlaying = true;
        playPauseButton.src = "pause.png";
    } else {
        audioPlayer.pause();
        isPlaying = false;
        playPauseButton.src = "play.png";
    }
});

seekBar.addEventListener("input", () => {
    audioPlayer.currentTime = seekBar.value;
});

vcon.addEventListener('input', () => {
    audioPlayer.volume = vcon.value;
});

audioPlayer.addEventListener('timeupdate', () => {
    if (!isNaN(audioPlayer.duration)) {
        seekBar.max = audioPlayer.duration;
        timetotal.innerText = mktime(audioPlayer.duration);
    }
    seekBar.value = audioPlayer.currentTime;
    timeInfo.innerText = mktime(audioPlayer.currentTime);
});

speedControl.addEventListener('input', () => {
    audioPlayer.playbackRate = speedControl.value;
    spdcon.innerText = "Speed:" + speedControl.value + "x";
});

function mktime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

audioPlayer.addEventListener('ended', () => {
    if (isRepeat) {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else {
        playNext();
    }
});

previousButton.addEventListener('click', () => {
    playPrevious();
});

nextButton.addEventListener('click', () => {
    playNext();
});

function playNext() {
    if (isShuffle && playlist.length > 1) {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * playlist.length);
        } while (nextIndex === currentIndex);
        currentIndex = nextIndex;
    } else {
        currentIndex = (currentIndex + 1) % playlist.length;
    }
    loadAudio(playlist[currentIndex]);
}

function playPrevious() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadAudio(playlist[currentIndex]);
}


function initsys() {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: titlePlaceholder.textContent,
            artist: artistPlaceholder.textContent,
            album: albumPlaceholder.textContent,
            artwork: [
                { src: albumArtPlaceholder.src, sizes: '96x96', type: 'image/png' },
                { src: albumArtPlaceholder.src, sizes: '128x128', type: 'image/png' },
                { src: albumArtPlaceholder.src, sizes: '192x192', type: 'image/png' },
                { src: albumArtPlaceholder.src, sizes: '256x256', type: 'image/png' },
                { src: albumArtPlaceholder.src, sizes: '384x384', type: 'image/png' },
                { src: albumArtPlaceholder.src, sizes: '512x512', type: 'image/png' },
            ]
        });
        navigator.mediaSession.setActionHandler('play', () => {
            audioPlayer.play();
            playPauseButton.src = "pause.png";
        });
        navigator.mediaSession.setActionHandler('pause', () => {
            audioPlayer.pause();
            playPauseButton.src = "play.png";
        });
        navigator.mediaSession.setActionHandler('previoustrack', () => playPrevious());
        navigator.mediaSession.setActionHandler('nexttrack', () => playNext());
    }
}

function updateBackground(picture) {
    const body = document.body;
    if (picture) {
        const base64String = btoa(new Uint8Array(picture.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        const imageUrl = `data:${picture.format};base64,${base64String}`;
        body.style.backgroundImage = `url(${imageUrl})`;
        body.style.backgroundPosition = 'center';
        body.style.backgroundSize = 'cover';
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundAttachment = 'fixed';
        body.style.backdropFilter = 'blur(10px)';
    } else {
        body.style.backgroundImage = '';
        body.style.backdropFilter = 'none';
        body.style.backgroundAttachment = '';
    }
}

repeatButton.addEventListener('click', toggleRepeat);
shuffleButton.addEventListener('click', toggleShuffle);

function toggleRepeat() {
    isRepeat = !isRepeat;

    repeatButton.textContent = isRepeat ? 'Repaet: ON' : 'Repeat: OFF';
    repeatButton.style.opacity = isRepeat ? '1.0' : '0.6'; 
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleButton.textContent = isShuffle ? 'Shuffle: ON' : 'Shuffle: OFF';
    shuffleButton.style.opacity = isShuffle ? '1.0' : '0.6';
}

abBtn.addEventListener('click', () => {
    abOverlay.classList.add('active');
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    document.documentElement.requestFullscreen().catch(e => console.log(e));
});


abOverlay.addEventListener('click', () => {
    abOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (document.fullscreenElement) document.exitFullscreen();
});

fullscbtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(e => console.log(e));
    } else {
        document.exitFullscreen();
    }
});