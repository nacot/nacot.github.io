//var ringSizeFeedback = document.getElementById("ringsize_feedback");
var ringHeightFeedback = document.getElementById("ringheight_feedback");
var sectionRadiusFeedback = document.getElementById("section_radius_feedback");
var volumeFeedback = document.getElementById("volume_feedback");
var recordTimeFeedback = document.getElementById("record_time_feedback");



function messageAllowAudio(){
    if(!recorder){
        context2d.fillStyle = colorLogoGreenBottom;
        context2d.fillRect(0,0,960,600);
    }
}

function drawUIBlocks(){
    //RECORD BLOCK
    /*
    var colorUIblocks = "rgba(255,255,255,0.07)";
    recordContext.setTransform(1,0,0,1,0,0);
    recordContext.translate(0,0);
    recordContext.fillStyle = colorUIblocks;
    recordContext.fillRect(0,0,340,200);

    recordContext.fillStyle = colorWhite;
    recordContext.font = "16px Arial";
    recordContext.textAlign = "center";
    recordContext.fillText( "RECORD A SHORT CLIP OF YOUR VOICE", 170, 30);
    */

}

function drawRecButton(){
    //PLACED TO STANDARD HTML...
    //TODO: CONCENTRIC CIRCLES TO SHOW PRESENT MICROPHONE INPUT
    /*
    recordContext.fillStyle = colorLogoMagenta;
    recordContext.arc(recButtonPosX,recButtonPosY,recButtonSize,0,Math.PI*2);
    recordContext.closePath();
    recordContext.fill();

    if(recording){
        recordContext.fillStyle = colorWhite;
        recordContext.fillRect(recButtonPosX-10,recButtonPosY-10,20,20);
    } else {
        recordContext.fillStyle = colorWhite;
        recordContext.font = "16px Arial";
        recordContext.textAlign = "center";
        recordContext.fillText( "record", recButtonPosX, recButtonPosY+6);
    }
    */
}

function recordButtonPressed(){
    if(recording){
        console.log("record button: STOP recording");
        stopRecording();
        calcMeshProperties();
        volumeFeedback.innerHTML =
            "Ring volume: " + ringVolume + " m3" + "<br>"  +
                "Ring area: " + ringArea + " m2" ;
    } else {
        console.log("record button: START recording");
        recCurrentLength = 0;
        startRecording();
    }
}

//RECORD BUTTON MOUSE EVENT
//PLACED TO HTML BUTTON!!!!!!!!!
/*
var todoFunction = function(){
    if(recording){
        console.log("record button: STOP recording");
        stopRecording();
        calcMeshProperties();
        volumeFeedback.innerHTML =
            "Ring volume: " + ringVolume + " m3" + "<br>"  +
            "Ring area: " + ringArea + " m2" ;
    } else {
        console.log("record button: START recording");
        recCurrentLength = 0;
        startRecording();
    }
}
attachMouseClicked(todoFunction,
    recButtonPosX-recButtonSize, recButtonPosY-recButtonSize,
    recButtonPosX+recButtonSize, recButtonPosY+recButtonSize);

recordCanvas.addEventListener('mouseup', function(evt) {
    var tlx = recButtonPosX-recButtonSize;
    var tly = recButtonPosY-recButtonSize;
    var brx = recButtonPosX+recButtonSize;
    var bry = recButtonPosY+recButtonSize;
    if(tlx<mouseX && mouseX<brx && tly<mouseY && mouseY<bry)  thingsToDo();
}, false);
*/
function playButtonPressed(){
    if( !recording ) playRecording();
}
//PLAY BUTTON MOUSE EVENT
//REPLACED BY STANDARD HTML BUTTON
/*
var todoFunction = function(){
    if( !recording ) playRecording();
}
attachMouseClicked(todoFunction,
    playButtonPosX-playButtonSize, playButtonPosY-playButtonSize,
    playButtonPosX+playButtonSize, playButtonPosY+playButtonSize);

*/

function drawLabels(){
    context2d.translate(playButtonPosX-playButtonSize, playButtonPosY+playButtonSize, 0);
    /*
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
    */

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