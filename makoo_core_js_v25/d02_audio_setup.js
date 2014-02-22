
var onFail = function(e) {
    console.log('Rejected!', e);
};

var onSuccess = function(s) {
    var context = new webkitAudioContext();
    var mediaStreamSource = context.createMediaStreamSource(s);
    recorder = new Recorder(mediaStreamSource);
    recorder.initBufferMidres(500);
    //c.style.backgroundImage = "url('sfondo.png')";
    document.getElementById("transparent_bg").style.backgroundImage = "none";
    document.getElementById("content_container").style.visibility = "visible";

    render();
    //recorder.record();
    // audio loopback
    // mediaStreamSource.connect(context.destination);
}

window.URL = window.URL || window.webkitURL;
navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
var recorder;
var audio = document.querySelector('audio');
initSoundInput();

function initSoundInput() {
    if (navigator.getUserMedia) {
        navigator.getUserMedia({audio: true}, onSuccess, onFail);
    } else {
        console.log('navigator.getUserMedia not present');
    }
}

var recStartTime = 0;
var recCurrentLength = 0;

function startRecording(){
    recorder.clear();
    recorder.record();

    pointsRecordCounter = 0;
    recording = true;
    for (var i = 0; i < points.length; i++) {
        points[i] = 0;
    }
    clearWaveformValues();
    recCounter = 0;


    recStartTime = clock.getElapsedTime();

    stopRecordingTimeout = setTimeout(function(){ stopRecording() }, 10*1000);
}

var stopRecordingTimeout;

function stopRecording() {
    //console.log( recorder.getBuffersRecLowres() );
    recorder.stop();
    window.clearTimeout(stopRecordingTimeout);
    //pointsRecordCounter = 0;
    recording = false;
    updateRingGeometry = true;
    clog("STOPPING RECORDING");
    /*
    for (var i = 0; i < points.length; i++) {
        points[i] = 0;
    }
    */
    /*recorder.exportWAV(function(s) {
     audio.src = window.URL.createObjectURL(s);
     });*/
}

function playRecording() {
    //console.log( recorder.getBuffersAllLowres() );
    //recorder.stop();
    recorder.exportWAV(function(s) {
        audio.src = window.URL.createObjectURL(s);
    });
}

function logArrayLowres(){
    console.log( recorder.getBuffersAllLowres() );
}

