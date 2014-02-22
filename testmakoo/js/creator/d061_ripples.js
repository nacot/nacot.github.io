var rippleFade = 100;

var rippleCount = 70;

var ripples = new Array(rippleCount);
for(var i=0; i<ripples.length; i++){
    ripples[i] = new rippleCircle(1);
    ripples[i].active = false;
}
var rippleToUpdate = 0;
var rippleStartBuffer = 0;
var rippleTreshold = 500000;


function rippleCircle(strength){
    this.strength = Math.pow( strength, 0.33 );
    this.radius = 20;
    this.active = true;
    this.age = 0;
    //clog(this.strength);

    this.update = function(){
        if(this.active){
            this.radius += 1;
            //temp = (1-this.age/rippleFade)*0.5;
            //*
            if(this.age<10) temp = this.age/10;
            else {
                if(this.age>10) temp = 1 - (this.age-10)/40;
                else temp = 1;
            }
            temp *= 0.4;

            recordContext.strokeStyle = "rgba(255, 255, 255, " + temp + ")";
            //recordContext.lineWidth = this.strength;
            //*/
            //recordContext.strokeStyle = "#fff";
            recordContext.beginPath();
            recordContext.arc(0,0,this.radius,0,2*Math.PI);
            recordContext.stroke();
            recordContext.closePath();

            this.age++;
            if(this.age > rippleFade) this.active=false;
        }
    }
}





function drawLiveCreationHelpers() {
    recordContext.fillStyle="#000000"
    recordContext.strokeStyle="#FFFFFF";
    recordContext.lineWidth=2;
    recordContext.closePath();

    /*
     //WAVEFORM
     var lastBuffer = [0,0,0];
     if(recorder) lastBuffer = recorder.getLastMonoBuffer();
     recordContext.setTransform(1,0,0,1,0,0);
     recordContext.translate(0, 50, 0);
     recordContext.beginPath();
     recordContext.moveTo( i, lastBuffer[0]*waveformBufferHeight );
     var maxValue = 0;
     for ( var i = 0; i < lastBuffer.length-1; i++) {
     recordContext.lineTo( (i+1), lastBuffer[i+1]*waveformBufferHeight*normalizerMult );
     if( lastBuffer[i] > maxValue ) maxValue = lastBuffer[i];
     }
     //context2d.closePath();
     recordContext.stroke();
     recordContext.beginPath();
     recordContext.closePath();
     //*/

    recordContext.setTransform(1,0,0,1,0,0);

    //clog(rippleStartBuffer);
    //var temp = document.getElementById("record_button_container");
    //recordCanvas.width = parseInt( temp.style.width );
    //recordCanvas.height = parseInt( temp.style.height );
    //recordContext = recordCanvas.getContext('2d');
    recordContext.translate(recordCanvas.width/2, recordCanvas.height/2, 0);
    //recordContext.translate(70, 70, 0);

    for(var i=0; i<ripples.length; i++){
        ripples[i].update();
    }

    slogn( normalizerMult * recorder.getLastMonoSum() );
    slogn( rippleStartBuffer );
    if(rippleStartBuffer > rippleTreshold){
        temp = rippleStartBuffer/rippleTreshold;
        ripples[rippleToUpdate] = new rippleCircle(temp);
        rippleToUpdate = (rippleToUpdate+1)%rippleCount;
        rippleStartBuffer = 0;
    }
    recordContext.setTransform(1,0,0,1,0,0);


    /*
     //STRAIGHT SECTION
     var widthMult = 240/ringSectionRes;
     context2d.setTransform(1,0,0,1,0,0);
     context2d.translate(0, 150, 0);
     context2d.beginPath();
     for ( var i = 0; i < points.length-1; i++) {
     //p.line( i*8, points[i]*0.3, (i+1)*8, points[i+1]*0.3 );
     context2d.moveTo( i*widthMult, points[i]*0.5 );
     context2d.lineTo( (i+1)*widthMult, points[i+1]*0.5 );
     }
     context2d.moveTo( 0, 0 );
     context2d.lineTo( (points.length-1)*widthMult, 0 );
     //context2d.closePath();
     context2d.stroke();
     */


    /*/ROUND SECTION
     context2d.setTransform(1,0,0,1,0,0);
     context2d.translate(500, 150, 0);

     context2d.beginPath();
     context2d.arc( 0,0,sectionRadius*(1-amplitude),0,2*Math.PI);
     context2d.stroke();
     context2d.closePath();

     context2d.beginPath();
     for ( var i = 0; i < ringSection.length; i++) {
     lineFromVectors( context2d, ringSection[i], ringSection[ (i+1) % ringSection.length ] );
     }
     context2d.closePath();
     context2d.stroke();
     //*/

    //recordContext.setTransform(1,0,0,1,0,0);
}