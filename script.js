const pageHome = document.querySelector(".home");
const buttonStart = document.querySelector(".button-start");

const pageSelectLevel = document.querySelector(".select-level");
const selectLevelBox = document.querySelectorAll(".level");
const backToHome = pageSelectLevel.querySelector(".back-button");
const rangeLevel = pageSelectLevel.querySelector('.deskripsi .range');

const pagePlayGame = document.querySelector(".play-game");
const backToSelectLevel = pagePlayGame.querySelector(".back-button");
const levelDescript = pagePlayGame.querySelector('.deskripsi span.range');
const acakAngka = pagePlayGame.querySelector('.acak-angka span');
const userInput = pagePlayGame.querySelector('form.input input');
const submitBox = pagePlayGame.querySelector('button.submit-button');
const submitFunc = pagePlayGame.querySelector('button.submit-button i.submit');
const resetFunc = pagePlayGame.querySelector('button.submit-button i.reset');
const penutupKotak = pagePlayGame.querySelector('.closeAnswer');
// |
const hasilJawaban = pagePlayGame.querySelector('.hasil');
const jawaban = hasilJawaban.querySelector('.hasil-jawaban');
const restart = hasilJawaban.querySelector('.restart');


// Variable in Game ================================
var randomAngka;
var maximalNumber;
// ================================



// ALL FUNCTION ================================
function playSFX(file) { // Play SFX Ketika di Hover / Click [Page: HOME & SELECT LEVEL]
    file.currentTime = 0;
    file.play();
}
function checkTombol() { // Apakah ini Tombol Submit atau Reset [Page: PLAY GAME]
    if (submitBox.classList.contains('submit')) {
        resetFunc.classList.add('hidden');
        submitFunc.classList.remove('hidden');
    } else if (submitBox.classList.contains('reset')) {
        resetFunc.classList.remove('hidden');
        submitFunc.classList.add('hidden');
    }
}
function transitionPage(fromPage, toPage) { // Transisi antar Page
    fromPage.classList.toggle('fadeOut');
    fromPage.classList.toggle('fadeIn');
    toPage.classList.toggle('fadeOut');
    toPage.classList.toggle('fadeIn');
}
function check_input(user) { // Check Jawaban Input User [Page: PLAY GAME]
    if (user === randomAngka) {
        correctAnswer();
    } else {
        wrongAnswer();
    }
}
function wrongAnswer() { // Fungsi Ketika Jawaban User Salah [Page: PLAY GAME]
    jawaban.innerHTML = "Jawaban Salah!";
    penutupKotak.classList.add('buka');
    setTimeout(() => {
        submitBox.classList.add('reset');
        submitBox.classList.remove('submit');
        checkTombol();
        setTimeout(() => {
            playSFX(wrongSFX);
        }, 100)
    }, 100);
}
function resetGame() { // Reset Game ketika Jawaban User Salah [Page: PLAY GAME]
    mengacakAngka();
    penutupKotak.classList.remove('buka');
    submitBox.classList.add('submit');
    submitBox.classList.remove('reset');
    checkTombol();
    userInput.value = '';
}
function correctAnswer() { // Fungsi Ketika Jawaban User Benar [Page: PLAY GAME]
    jawaban.innerHTML = "Jawaban Benar!";
    penutupKotak.classList.toggle('buka');
    setTimeout(() => {
        hasilJawaban.classList.add('buka');
        setTimeout(() => {
            playSFX(correctSFX);
        }, 100)
    }, 100);
}
function mengacakAngka() { // Fungsi untuk Mengacak angka [Page: PLAY GAME]
    randomAngka = Math.round(Math.random() * (maximalNumber - 1 + 1) + 1);
    console.log(randomAngka);
    acakAngka.innerHTML = randomAngka;
}
// ====================================================



// PAGE ENVIRONTMENT  ==================================================
// |
// |
// =======> PAGE: HOME
buttonStart.addEventListener('click', () => { // Ketika tombol Start ditekan
    transitionPage(pageHome, pageSelectLevel);
})
backToSelectLevel.addEventListener('click', () => { // Ketika tombol Back ditekan
    transitionPage(pageSelectLevel, pagePlayGame);
})
// |
// |
// =======> PAGE: SELECT LEVEL
backToHome.addEventListener('click', () => { // Ketika tombol Back ditekan
    transitionPage(pageSelectLevel, pageHome);
})
document.addEventListener('click', (e) => { // Ketika Box Level ditekan
    if (e.target.classList.value == 'level') {
        transitionPage(pageSelectLevel, pagePlayGame);

        maximalNumber = e.target.getAttribute('data-max');
        var rangeNumber = e.target.getAttribute('data-range');
        levelDescript.innerHTML = rangeNumber;
        resetGame();
    }
});
// |
// |
// =======> PAGE: PLAY GAME ================================
submitBox.addEventListener('click', e => { // Ketika tombol Submit ditekan
    e.preventDefault();

    if (submitBox.classList.contains('submit')) {
        var angkaUser = parseInt(userInput.value);
        console.log("Angka User: " + angkaUser);
        check_input(angkaUser);
    } else if (submitBox.classList.contains('reset')) {
        resetGame();
    }
});
restart.addEventListener('click', () => { // Ketika Tombol Lanjut (Setelah menang!) ditekan
    resetGame();
    hasilJawaban.classList.remove('buka');
    userInput.value = '';
})
// |
// ====================================================



// SFX & SOUND ENVIRONTMENT ==================================================
// |
// |
// ====== Variable SFX & Backsound
// ==> SFX 
const correctSFX = pagePlayGame.querySelector('.correct_answer');
const wrongSFX = pagePlayGame.querySelector('.wrong_answer');
const levelSFX = document.querySelector('.sfxLevel');
const buttonSFX = document.querySelector('.sfxButton');
// ==> Backsound
const backsoundFile = document.querySelector('audio.backsound');
const onSound = document.querySelector('.playSound');
const iconSound = onSound.querySelectorAll('i');
// |
// |
// ====== Mengaktifkan SFX & Backsound Ketika di:
// ==> Hover:
selectLevelBox.forEach(box => { // Box Level
    box.addEventListener('mouseenter', () => {
        playSFX(levelSFX);
    })
})
buttonStart.addEventListener('mouseenter', () => { // Button Start
    playSFX(levelSFX);
})
// ==> Click:
const buttons = [buttonStart, backToHome, backToSelectLevel, selectLevelBox[0], selectLevelBox[1], selectLevelBox[2]];
buttons.forEach(button => { // Ketika Button yang di dalam Array ditekan
    button.addEventListener('click', () => {
        playSFX(buttonSFX);
    })
})
onSound.addEventListener('click', () => { // Ketika tombol Sound yg di bawah kanan ditekan
    iconSound[0].classList.toggle('hiddenIcon');
    iconSound[1].classList.toggle('hiddenIcon');

    if (iconSound[0].classList.contains('hiddenIcon')) {
        console.log('Play Song!');
        backsoundFile.play();
    } else {
        console.log('Muted Song!');
        backsoundFile.pause();
    }
})
// |
// ====================================================



