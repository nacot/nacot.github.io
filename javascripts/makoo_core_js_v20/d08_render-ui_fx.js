var ringSizeFeedback = document.getElementById("ringsize_feedback");
var ringHeightFeedback = document.getElementById("ringheight_feedback");
var sectionRadiusFeedback = document.getElementById("section_radius_feedback");
var volumeFeedback = document.getElementById("volume_feedback");



function messageAllowAudio(){
    if(!recorder){
        context2d.fillStyle = colorLogoGreenBottom;
        context2d.fillRect(0,0,960,600);
    }
}

function drawUIBlocks(){
    //RECORD BLOCK
    var colorUIblocks = "rgba(255,255,255,0.07)";
    context2d.setTransform(1,0,0,1,0,0);
    context2d.translate(0,100);
    context2d.fillStyle = colorUIblocks;
    context2d.fillRect(0,0,340,200);

    context2d.fillStyle = colorWhite;
    context2d.font = "16px Arial";
    context2d.textAlign = "center";
    context2d.fillText( "RECORD A SHORT CLIP OF YOUR VOICE", 170, 30);

    context2d.translate(0,150);
    context2d.fillStyle = colorUIblocks;
    context2d.fillRect(0,0,340,50);

    //SLIDER BLOCK
    context2d.setTransform(1,0,0,1,0,0);
    context2d.translate(0,340);
    context2d.fillStyle = colorUIblocks;
    context2d.fillRect(0,0,340,300);

    context2d.fillStyle = colorWhite;
    context2d.font = "16px Arial";
    context2d.textAlign = "center";
    context2d.fillText( "FINE TUNE THE JEWEL SHAPE", 170, 30);
}

function drawRecButton(){
    context2d.fillStyle = colorLogoMagenta;
    context2d.arc(recButtonPosX,recButtonPosY,recButtonSize,0,Math.PI*2);
    context2d.closePath();
    context2d.fill();

    if(recording){
        context2d.fillStyle = colorWhite;
        context2d.fillRect(recButtonPosX-10,recButtonPosY-10,20,20);
    } else {
        context2d.fillStyle = colorWhite;
        context2d.font = "16px Arial";
        context2d.textAlign = "center";
        context2d.fillText( "record", recButtonPosX, recButtonPosY+6);
    }
}

//RECORD BUTTON MOUSE EVENT
var todoFunction = function(){
    if(recording){
        console.log("record button: STOP recording");
        volumeFeedback.innerHTML = "Ring volume: " + parseInt(calcRingVolume()*100)/100 + " mm3";
        stopRecording();
    } else {
        console.log("record button: START recording");
        recCurrentLength = 0;
        startRecording();
    }
}
attachMouseClicked(todoFunction,
    recButtonPosX-recButtonSize, recButtonPosY-recButtonSize,
    recButtonPosX+recButtonSize, recButtonPosY+recButtonSize);

//PLAY BUTTON MOUSE EVENT
var todoFunction = function(){
    if( !recording ) playRecording();
}
attachMouseClicked(todoFunction,
    playButtonPosX-playButtonSize, playButtonPosY-playButtonSize,
    playButtonPosX+playButtonSize, playButtonPosY+playButtonSize);



function drawLabels(){
    context2d.translate(playButtonPosX-playButtonSize, playButtonPosY+playButtonSize, 0);

    //PLAYBACK BUTTON TRIANGLE
    context2d.fillStyle = colorWhite;
    context2d.beginPath();
    context2d.moveTo(0,0);
    context2d.lineTo(0,-playButtonSize*2);
    context2d.lineTo(playButtonSize*2*0.8,-playButtonSize);
    context2d.closePath();
    context2d.fill();

    context2d.setTransform(1,0,0,1,0,0);
    context2d.fillStyle = colorWhite;
    context2d.font = "16px Arial";
    context2d.fontWeight = "Bold";
    context2d.textAlign = "right";
    context2d.fillText( Number(recCurrentLength).toFixed(1)+"s", recButtonPosX-55, recButtonPosY+6);

    context2d.setTransform(1,0,0,1,0,0);
}




function slog(tText){
    slogText = slogText + tText + "\r";
}

function slogn(tText){
    slogText = slogText + Number(tText).toFixed(3) + "\r\n";
}

function slogDisplay(){
    context2d.fillStyle = colorLogoMagenta;
    context2d.font = "16px Courier";
    context2d.textAlign = "right";
    context2d.fillText( slogText, 950, 500);
    slogText = "";
}