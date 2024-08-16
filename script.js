// Datenstrukturen
let playlists = [];
let selectedSongs = [];
let currentPlaylist = null;
let timerInterval = null;
let currentSongIndex = 0;
let totalSeconds = 0; // Variable für die Gesamtzeit des Timers
let startTime;

// Elemente
const playlistPage = document.getElementById('playlistPage');
const libraryPage = document.getElementById('libraryPage');
const playlistDetailPage = document.getElementById('playlistDetailPage');
const playlistContainer = document.getElementById('playlistContainer');
const musicLibrary = document.getElementById('musicLibrary');
const playlistTitle = document.getElementById('playlistTitle');
const timer = document.getElementById('timer');
const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');

// Musikdateien
const songs = [
    { id: 1, name: 'Solomun Boiler Room DJ Set', src: 'https://www.dropbox.com/scl/fi/jrwtlkh3nxl26vqppgw3j/Solomun-Boiler-Room-DJ-Set.mp3?rlkey=yc4nrme8x0jpl64q4i3tl0vdc&st=gzigmu98&raw=1' },
    { id: 2, name: 'House music set. This is our House 3', src: 'https://www.dropbox.com/scl/fi/mq1kc7gvxw4644f720vgy/House-music-set.-This-is-our-House..mp3?rlkey=3kbtuui180gpc63mvdk9vy0wi&st=m2r0zvju&raw=1' },
    { id: 3, name: 'Classics & oldschool funky house tracks', src: 'https://www.dropbox.com/scl/fi/dagv6wma1tj0rp9qnsu8b/Classics-oldschool-funky-house-tracks.mp3?rlkey=b1o1bag82l1i2m22150nk7exy&st=cfrjpypu&raw=1' },
    { id: 4, name: 'Funky house oldschool vinyl set', src: 'https://www.dropbox.com/scl/fi/a54pnxx17axgdbpcbjbr0/Funky-house-oldschool-vinyl-set.mp3?rlkey=0d8mz6byzs7oz1dbx3ncjt4gu&st=o5bcjfkn&raw=1' },
    { id: 5, name: 'House music set. This is our House 2', src: 'https://www.dropbox.com/scl/fi/am5g1751rgu7eoewy77hu/House-music-set.-This-is-our-House-2.mp3?rlkey=4v7p10z8b5dnx8l456fwdvy1o&st=1x6n88w4&raw=1' },
    { id: 6, name: 'oldschool & funky house tracks classic', src: 'https://www.dropbox.com/scl/fi/868pkfnyv0v6dwfzcn6ip/oldschool-funky-house-tracks-classic.mp3?rlkey=qdn0xrdgi9vukbggvvqruyaro&st=5clcie7e&raw=1' },
    { id: 7, name: 'House music set. This is our House.', src: 'https://www.dropbox.com/scl/fi/mq1kc7gvxw4644f720vgy/House-music-set.-This-is-our-House..mp3?rlkey=3kbtuui180gpc63mvdk9vy0wi&st=5gieczfd&raw=1' },
    { id: 8, name: 'Funky House mix by Valentina Bravo', src: 'https://www.dropbox.com/scl/fi/trve123t14zpt1ysckqc1/Funky-House-mix-by-Valentina-Bravo.mp3?rlkey=o51mgn9l79q5kq60sa29oocqh&st=3btzvi6m&raw=1' },

];

// Startseite anzeigen
playlistPage.classList.add('active');


// Funktion zum Speichern der Playlists im Local Storage
function savePlaylists() {
    localStorage.setItem('musicAppPlaylists', JSON.stringify(playlists));
}

function loadPlaylists() {
    const savedPlaylists = localStorage.getItem('musicAppPlaylists');
    if (savedPlaylists) {
        playlists = JSON.parse(savedPlaylists);
    }
    playlistContainer.innerHTML = '';
    playlists.forEach((playlist, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${playlist.name}</span>
            <div>
                <button class="edit-btn">
                    <img class="optionIcon" src="edit.png">
                </button>
                <button class="delete-btn">
                    <img class="optionIcon" src="delete.png">
                </button>
            </div>
        `;
        li.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            editPlaylist(index);
        });
        li.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deletePlaylist(index);
        });
        li.addEventListener('click', () => openPlaylist(index));
        playlistContainer.appendChild(li);
    });
}

// Playlist bearbeiten
function editPlaylist(index) {
    const newName = prompt('Neuer Name der Playlist:', playlists[index].name);
    if (newName) {
        playlists[index].name = newName;
        savePlaylists(); // Speichern nach dem Bearbeiten
        loadPlaylists();
    }
}

// Playlist löschen
function deletePlaylist(index) {
    if (confirm('Möchtest du diese Playlist wirklich löschen?')) {
        playlists.splice(index, 1);
        savePlaylists(); // Speichern nach dem Löschen
        loadPlaylists();
    }
}

// Musikbibliothek anzeigen
function loadMusicLibrary() {
    musicLibrary.innerHTML = '';
    songs.forEach(song => {
        const li = document.createElement('li');
        li.classList.add('song-item');
        li.innerHTML = `
            <span>${song.name}</span>
            <span class="checkmark hidden">✔</span>
        `;
        li.addEventListener('click', () => toggleSongSelection(song, li));
        musicLibrary.appendChild(li);
    });
}

// Song auswählen oder abwählen
function toggleSongSelection(song, element) {
    if (selectedSongs.includes(song)) {
        selectedSongs = selectedSongs.filter(s => s !== song);
        element.classList.remove('selected');
        element.querySelector('.checkmark').classList.add('hidden');
    } else {
        selectedSongs.push(song);
        element.classList.add('selected');
        element.querySelector('.checkmark').classList.remove('hidden');
    }
}

// Neue Playlist erstellen
document.getElementById('addPlaylistBtn').addEventListener('click', () => {
    selectedSongs = [];
    libraryPage.classList.add('active');
    playlistPage.classList.remove('active');
    loadMusicLibrary();
});

document.getElementById('addSongsBtn').addEventListener('click', () => {
    const playlistName = prompt('Name der Playlist:');
    if (playlistName) {
        playlists.push({ name: playlistName, songs: selectedSongs });
        savePlaylists(); // Speichern nach dem Hinzufügen
        libraryPage.classList.remove('active');
        playlistPage.classList.add('active');
        loadPlaylists();
    }
});

// Playlist öffnen
function openPlaylist(index) {
    currentPlaylist = playlists[index];
    currentSongIndex = 0;
    playlistTitle.innerText = currentPlaylist.name;
    playlistDetailPage.classList.add('active');
    playlistPage.classList.remove('active');
    startPlaylist();
}

// Playlist starten
function startPlaylist() {
    audioSource.src = currentPlaylist.songs[currentSongIndex].src;
    audioPlayer.load();
    audioPlayer.play(); // Musik abspielen
}

function startTimer() {
    startTime = Date.now() - (totalSeconds * 1000);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    timer.innerText = `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// Event-Listener für den Audio-Player
audioPlayer.addEventListener('play', () => {
    if (timerInterval === null) {
        startTimer();
    }
});

audioPlayer.addEventListener('pause', stopTimer);

audioPlayer.addEventListener('ended', () => {
    stopTimer();
    if (currentSongIndex < currentPlaylist.songs.length - 1) {
        currentSongIndex++;
        startPlaylist();
    } else {
        totalSeconds = 0;
        startTime = null;
    }
});

// Vorheriges Lied
document.getElementById('prevSongBtn').addEventListener('click', () => {
    if (currentSongIndex > 0) {
        currentSongIndex--;
        startPlaylist();
    }
});

// Nächstes Lied
document.getElementById('nextSongBtn').addEventListener('click', () => {
    if (currentSongIndex < currentPlaylist.songs.length - 1) {
        currentSongIndex++;
        startPlaylist();
    }
});

// Zurück zur Startseite
document.getElementById('backToPlaylists').addEventListener('click', () => {
    libraryPage.classList.remove('active');
    playlistPage.classList.add('active');
});

document.getElementById('backToPlaylistsDetail').addEventListener('click', () => {
    playlistDetailPage.classList.remove('active');
    playlistPage.classList.add('active');
    stopTimer();
    totalSeconds = 0;
});


// Songtitel-Element
const currentSongTitle = document.getElementById('currentSongTitle');

// Playlist starten
function startPlaylist() {
    audioSource.src = currentPlaylist.songs[currentSongIndex].src;
    currentSongTitle.innerText = currentPlaylist.songs[currentSongIndex].name; // Songname setzen
    audioPlayer.load();
    audioPlayer.play(); // Musik abspielen
}



//hier war der code



// Laden der Playlists beim Start der App
document.addEventListener('DOMContentLoaded', () => {
    loadPlaylists();
});
