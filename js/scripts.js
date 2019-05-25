$(document).ready(function () {
    // Set up
    const playButtonClass = "btn btn-primary btn-round fa"; // This is the play button class name from Font Awesome
    const stopButtonClass = "btn btn-danger btn-round fa"; // This is the stop button class name from Font Awesome
    const playIcon = "&#xf04b;"; // unicode for the Font Awesome play icon
    const stopIcon = "&#xf04d;"; // unicode for the Font Awesome stop icon
    const tempoMin = 1;
    const tempoMax = 400;
    let beat = 1; // the current beat in the bar
    let tempo = 60; // in beats per minute
    let isPlaying = false;
    let interval; // used to hold the setInterval data so it can be cleared when the metronome stops
    let melody = 1;
    let rhythm = 1;

    const playStopButton = $("#playStopButton");


    // Create the sound effects
    // Howler.js was used to enable overlapping sound effects
    let highBlockSound = new Howl({
        src: ["./sounds/High-Wood-Block.mp3"],
        volume: 0.2
    });

    let highBlockSoundQuiet = new Howl({
       src: ["./sounds/High-Wood-Block.mp3"],
       volume: 0.05
    })

    let lowBlockSound = new Howl({
        src: ["./sounds/Low-Wood-Block.mp3"],
        volume: 0.2
    });

    let lowBlockSoundQuiet = new Howl({
       src: ["./sounds/Low-Wood-Block.mp3"],
       volume: 0.05
    })

    let re1Sound = new Howl({
        src: ["./sounds/re1.wav"]
    });

    let mi2Sound = new Howl({
        src: ["./sounds/mi2.wav"]
    });

    let la3Sound = new Howl({
        src: ["./sounds/la3.wav"]
    });

    let sound = re1Sound;
    let rhythmLoud = highBlockSound;
    let rhythmQuiet = highBlockSoundQuiet;

    $('.tempo-select').click( function(){ 
        let myTempo = 60;
        var classes = this.classList;
        tempo1=document.getElementById("tempo1");
        tempo1.classList.remove("selected")
        tempo2=document.getElementById("tempo2");
        tempo2.classList.remove("selected")
        tempo3=document.getElementById("tempo3");
        tempo3.classList.remove("selected")
        this.classList.add("selected")
        if (this.id == "tempo1"){
            myTempo = 60;
        } else if (this.id == "tempo2") {
            myTempo = 85;
        } else if (this.id == "tempo3") {
            myTempo = 110;
        }
        tempo = myTempo;
        if (isPlaying){
        playStopButton.click()
       }
    })

    $('.melody-select').click( function(){ 
        let newMelody = 1;
        var classes = this.classList;
        melody1=document.getElementById("melody1");
        melody1.classList.remove("selected")
        melody2=document.getElementById("melody2");
        melody2.classList.remove("selected")
        melody3=document.getElementById("melody3");
        melody3.classList.remove("selected")
        this.classList.add("selected")
        if (this.id == "melody1"){
            newMelody=1;
           $(".btn").css("background","blue");
           $(".btn").css("border-color","blue");
        } else if (this.id == "melody2") {
            newMelody=2;
           $(".btn").css("background","green");
           $(".btn").css("border-color","green");
        } else if (this.id == "melody3") {
            newMelody=3;
           $(".btn").css("background","yellow");
           $(".btn").css("border-color","yellow");
        }
        melody = newMelody;
        if (isPlaying){
        playStopButton.click()
       }
    })

    $('.rhythm-select').click( function(){ 
        let newRhythm = 1;
        var classes = this.classList;
        rhythm1=document.getElementById("rhythm1");
        rhythm1.classList.remove("selected")
        rhythm2=document.getElementById("rhythm2");
        rhythm2.classList.remove("selected")
        this.classList.add("selected")
        if (this.id == "rhythm1"){
            newRhythm=1;
        } else if (this.id == "rhythm2") {
            newRhythm=2;
        } 
        rhythm = newRhythm;
        if (isPlaying){
        playStopButton.click()
       }
    })

    // Function to handle starting and stopping the metronome
    playStopButton.click(function () {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playClick();
            playStopButton.html(stopIcon);
            playStopButton.attr("class", stopButtonClass);
            interval = setInterval(playClick, (60000 / (tempo*4)));
            console.log("playing now with tempo " + tempo + ", melody " + melody + ", and rhythm " + rhythm)
        } else {
            clearInterval(interval); // this stops the sound effects from playing
            //btnIcon.attr("class", playButtonClass); // change the button to the play class
            playStopButton.html(playIcon);
            playStopButton.attr("class", playButtonClass);
            beat = 1; // reset the beat to the down beat
        }
    });

    // This function handles playing the click sound
    // Each time playClick() is called, the beat variable is incremented so we know what beat we're on
    function playClick() {
        if (rhythm==1){
            rhythmLoud=highBlockSound;
            rhythmQuiet=highBlockSoundQuiet;
        } else if (rhythm==2){
            rhythmLoud=lowBlockSound;
            rhythmQuiet=lowBlockSoundQuiet;
        }
        if ((beat % (16)) == 1) {
            // We're on the down beat of the bar
            rhythmLoud.play();
        } else if ((beat % (4)) == 1){
            rhythmQuiet.play();
        }
        if (melody==1){
            sound=re1Sound
        } else if (melody==2){
            sound=mi2Sound
        } else if (melody==3){
            sound=la3Sound
        }
        if ((beat % (16)) == 1){
            sound.play()
        }
        if ((beat % (16)) == 4){
            sound.play()
        }
        if ((beat % (16)) == 7){
            sound.play()
        }
        beat++;
    }
});