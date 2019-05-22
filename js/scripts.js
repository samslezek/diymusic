$(document).ready(function () {
    // Set up
    const playButtonClass = "btn btn-primary btn-round fa"; // This is the play button class name from Font Awesome
    const stopButtonClass = "btn btn-danger btn-round fa"; // This is the stop button class name from Font Awesome
    const playIcon = "&#xf04b;"; // unicode for the Font Awesome play icon
    const stopIcon = "&#xf04d;"; // unicode for the Font Awesome stop icon
    const tempoMin = 1;
    const tempoMax = 400;
    const bpbMin = 1;
    const bpbMax = 16;
    const cpbMin = bpbMin;
    const cpbMax = bpbMax;
    let beat = 1; // the current beat in the bar
    let beatsPerBar = 16;
    let clicksPerBeat = 1;
    let tempo = 60; // in beats per minute
    let isPlaying = false;
    let interval; // used to hold the setInterval data so it can be cleared when the metronome stops
    let firstbeat = 5;
    let secondbeat = 9;
    let thirdbeat = 13;

    // Initialize the values in the views on the page
    $("#tempo-text-box").val(tempo);
    $("#bpb-text-box").val(beatsPerBar);
    $("#cpb-text-box").val(clicksPerBeat);

    tempo=tempo

    const playStopButton = $("#playStopButton");


    // Create the sound effects
    // Howler.js was used to enable overlapping sound effects
    let highBlockSound = new Howl({
        src: ["./sounds/High-Wood-Block.mp3"]
    });

    let re1Sound = new Howl({
        src: ["./sounds/re1.wav"]
    });

    let mi2Sound = new Howl({
        src: ["./sounds/mi2.wav"]
    });

    let la3Sound = new Howl({
        src: ["./sounds/la3.wav"]
    });

    // Input validation for the tempo text box
    // Makes sure that the value is between tempoMin and tempoMax
    $("#tempo-text-box").on("input", function () {
        let newTempo = $(this).val();
        if (newTempo > tempoMax) {
            newTempo = tempoMax;
            $(this).val(newTempo);
        } else if (newTempo < tempoMin) {
            newTempo = tempoMin;
            $(this).val(newTempo);
        }

       tempo = newTempo;
    });


    // Input validation for the tempo text box
    // Makes sure that the value is between tempoMin and tempoMax
    $("#firstbeat-text-box").on("input", function () {
        console.log('now changing firstbeat')
        let newfirstbeat = $(this).val();
        if (newfirstbeat > 16) {
            newfirstbeat = 16;
            $(this).val(newfirstbeat);
        } else if (newfirstbeat < 1) {
            newfirstbeat = 1;
            $(this).val(newfirstbeat);
        }
        firstbeat = newfirstbeat;
        console.log('firstbeat is now ' + firstbeat)
    });

    $("#secondbeat-text-box").on("input", function () {
        console.log('now changing secondbeat')
        let newfirstbeat = $(this).val();
        if (newfirstbeat > 16) {
            newfirstbeat = 16;
            $(this).val(newfirstbeat);
        } else if (newfirstbeat < 1) {
            newfirstbeat = 1;
            $(this).val(newfirstbeat);
        }
        secondbeat = newfirstbeat;
        console.log('secondbeat is now ' + secondbeat)
    });

    $("#thirdbeat-text-box").on("input", function () {
        console.log('now changing thirdbeat')
        let newfirstbeat = $(this).val();
        if (newfirstbeat > 16) {
            newfirstbeat = 16;
            $(this).val(newfirstbeat);
        } else if (newfirstbeat < 1) {
            newfirstbeat = 1;
            $(this).val(newfirstbeat);
        }
        thirdbeat = newfirstbeat;
        console.log('secondbeat is now ' + thirdbeat)
    });


    // Input validation for the beats per bar text box
    // Makes sure that the value is between bpbMin and bpbMax
    $("#bpb-text-box").on("input", function () {
       let newBPB = $(this).val();

       if (newBPB > bpbMax) {
           newBPB = bpbMax;
           $(this).val(newBPB);
       } else if (newBPB < bpbMin) {
           newBPB = bpbMin;
           $(this).val(newBPB);
       }

       beatsPerBar = newBPB;
    });

    // Input validation for the clicks per beat text box
    // Makes sure that the value is between cpbMin and cpbMax
    $("#cpb-text-box").on("input", function () {
       let newCPB = $(this).val();

       if (newCPB > cpbMax) {
           newCPB = cpbMax;
           $(this).val(newCPB);
       } else if (newCPB < cpbMin) {
           newCPB = cpbMin;
           $(this).val(newCPB);
       }

       clicksPerBeat = newCPB;
    });

    // Function to handle starting and stopping the metronome
    playStopButton.click(function () {
        isPlaying = !isPlaying;
        if (isPlaying) {
            console.log('here first beat is ' + firstbeat)
            playClick();
            playStopButton.html(stopIcon);
            playStopButton.attr("class", stopButtonClass);
            interval = setInterval(playClick, (60000 / (tempo*5)) / clicksPerBeat);
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
        if ((beat % (beatsPerBar * clicksPerBeat)) === 1) {
            // We're on the down beat of the bar
            highBlockSound.play();
        }
        if ((beat % 16 == firstbeat)) {
            // We're on a strong beat (aside from the down beat)
            console.log('firstbeat is ' + firstbeat)
            re1Sound.play();
        } 
        if ((beat%16 == secondbeat)){
            mi2Sound.play();
        }
        if ((beat%16 == thirdbeat)){
            la3Sound.play();
        }
        // if (beat%16 == 0 && thirdbeat == 16){
        //     la3Sound.play();
        // }
        beat++;
    }
});