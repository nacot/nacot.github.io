
var frameCount = 0;
var tv; //PVector
var rings; //RingVerticesObject[]
var ringSection; //PVector[]
var ringSectionRes = 80;
var ringPathRes = 80;
var ringTorsion = 1;
//var timeResolution = 1;

var temp, tempA, tempB, tempC, tempD, tempCoef;
var smoothingBuffer = new Array(10);
for( i in smoothingBuffer ) smoothingBuffer[i] = 0;

//var bufferTemp;
var smoothingRadius;
var smoothingRadiusMin;
var smoothingRadiusDifferences=0;

//var samplePoint, samplePointBuffer;
//var samplePointCounter;

var points = new Array(ringSectionRes);


function SectionPoints(length){ this.points = new Array(length); }
var pointsLoftSection = new Array(3);
for(var i=0; i<3; i++) {
    pointsLoftSection[i] = new SectionPoints(ringSectionRes);
    for(var j=0; j<ringSectionRes; j++) pointsLoftSection[i].points[j]=5;
}
console.log(pointsLoftSection);



var loftSectionMultipliers = new Array(ringPathRes);

var pointsRecordCounter = 0;

var sectionRadius = 30;
var sectionRotation = 0;
var amplitude = 0.2;
var ringRadius = 150.0;
var exportSizeNormalizer = 1/ringRadius/2;
var exportRingSize = 22;
var ringVolume, ringArea, xBoundMin,xBoundMax, yBoundMin, yBoundMax, zBoundMin, zBoundMax;
var ringHeight = 150;
var ringAsymmetry = [];
var ringHeightSection= [];
var waveformValues = new Array(640);
for ( i in waveformValues ) waveformValues[i]=0;

var strokeDisplay = false; //boolean
var recording = false; //boolean
var recStart, recEnd; //int
var recCounter = 0;

var colorWhite = "#FFFFFF";
var colorLogoGreenTop = "#5EF3CC";     //int
var colorLogoGreenBottom = "#2F9CB5";
var colorLogoMagenta = "#D8375F";

var zoom = 1.0;
var rotX = 0;
var rotY = 0.65;
var volume = 0.7;
var camWidth = 600;
var camHeight = 600;

var updateRingGeometry = true;
var sliderRadius, sliderAmplitude, sliderTorsion, sliderVolume; //SliderObject

var waveformBufferHeight = 100;

var recButtonPosX = 170;
var recButtonPosY = 60;
var recButtonSize = 35;

var playButtonPosX = 240;
var playButtonPosY = 190;
var playButtonSize = 14;



var recentVolumes = 1;

var slogText = "";

var messageImage = new Image();
messageImage.src = "sfondo.png";



