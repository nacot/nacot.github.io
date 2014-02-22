function writeMessage(canvasMouse, message) {
    var context = canvasMouse.getContext('2d');
    context.clearRect(0, 0, canvasMouse.width, canvasMouse.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
var canvasMouse = document.getElementById('myCanvas');
//var context = canvasMouse.getContext('2d');

var mousePos = { x: 100, y:100 };
var mouseX, mouseY, pmouseX, pmouseY;
mouseX = mouseY = pmouseX = pmouseY = 0;
var mousePressed = false;
var pMousePressed = false;

canvasMouse.addEventListener('mousemove', function(evt) {
    pmouseX = mouseX;
    pmouseY = mouseY;
    mousePos = getMousePos(canvasMouse, evt);
    mouseX = mousePos.x;
    mouseY = mousePos.y;
    pMousePressed = mousePressed;
    //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    //clog(message);
}, false);

canvasMouse.addEventListener('mousedown', function(evt) {
    mousePressed = true;
    //clog(mousePressed + " at " + mouseX +", "+mouseY);
}, false);

canvasMouse.addEventListener('mouseup', function(evt) {
    mousePressed = false;
}, false);

canvasMouse.addEventListener('mouseout', function(evt) {
    mousePressed = false;
}, false);


//MOUSE CLICKED TEST IN DEFINED AREA, FOR BUTTONS  -  USAGE SAMPLES
//var todoFunction = function(){clog("WOOOOOW");}
//attachMouseClicked(todoFunction, 500,100,960,600);
//attachMouseClicked( function(){clog("WOW")}, 0,0,100,100);  //SINGLE LINE USE FOR SIMPLE FUNCTIONS
function attachMouseClicked(thingsToDo, tlx, tly, brx, bry){
    canvasMouse.addEventListener('mouseup', function(evt) {
        if(tlx<mouseX && mouseX<brx && tly<mouseY && mouseY<bry)  thingsToDo();
    }, false);
}


function mouseDraggingCheck() {
    if (mousePressed  &&  testCoordinatesInside(mouseX, mouseY, 400, 100, camWidth, camHeight ) ) {
        rotX += ( (mouseX - pmouseX) )/ 200 ;
        rotY += ( (mouseY - pmouseY) )/ 200;
        //rotY = constrain(rotY, -1.5, 1.5);
        //setCursorToHand();  //ALREADY HAND... MAYBE SOMETHING ELSE?
    } else {
        rotX += 0.001;
        rotY += 0.001;
    }
}

var clickAreas = new Array();
clickAreas[clickAreas.length] = new RectCoordinates(400,100,camWidth,camHeight);  //ROTATE VIEW ZONE
clickAreas[clickAreas.length] = new RectCoordinates(recButtonPosX-recButtonSize, recButtonPosY-recButtonSize,
    recButtonPosX+recButtonSize, recButtonPosY+recButtonSize);
clickAreas[clickAreas.length] = new RectCoordinates(playButtonPosX-playButtonSize, playButtonPosY-playButtonSize,
    playButtonPosX+playButtonSize, playButtonPosY+playButtonSize);

//SIMPLE DATATYPE: RECTANGLE AREA
function RectCoordinates(tlX, tlY, brX, brY){
    this.tlx = tlX;
    this.tly = tlY;
    this.brx = brX;
    this.bry = brY;
}

function setHandAllClickAreas(){
    for(i in clickAreas){
        if( testCoordinatesInside(mouseX, mouseY,
            clickAreas[i].tlx, clickAreas[i].tly,
            clickAreas[i].brx, clickAreas[i].bry) ) setCursorToHand();
    }
}

function setCursorToHand(){
    c.style.cursor = "hand";
}

function setCursorToNormal(){
    c.style.cursor = "default";
}

document.getElementById( "myCanvas" ).onmousedown = function(event){
    event.preventDefault();
};