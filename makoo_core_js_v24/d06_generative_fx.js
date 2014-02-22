//VARIABLES
var normalizerMult = 1;
var postSmoothNormMult = 1;
var smoothedPoints = new Array();
var smoothedPointsFilterLow = new Array();
var smoothedPointsFilterHigh = new Array();


function waveformToPoints(){
    //var samplePoints = recorder.getBuffersRecLowres();
    smoothingRadius = parseInt(smoothingRadiusMin*autoSmoothMult);

    var normalizedPoints = recorder.getBuffersRecMidres();
    var nothingRecordedYet = false;
    if(normalizedPoints.length==0){
        nothingRecordedYet = true;
        //recorder.initBufferMidres(500);
        normalizedPoints = new Array(50);
        for(var i=0; i<normalizedPoints.length; i++){
            normalizedPoints[i] = 50;
        }
    }


    smoothedPoints = smoothArray(normalizedPoints, smoothingRadius);
    smoothedPointsFilterHigh = smoothArray(normalizedPoints, smoothingRadius*4);


    //*
    for(var i=0; i<smoothedPoints.length; i++){
        smoothedPoints[i] -= smoothedPointsFilterHigh[i] * smoothingRadiusDifferences;
    }
    //*/


    //RENORMALIZE
    var minValue = 10000;
    for( var i=0; i<smoothedPoints.length; i++ ){
        if( smoothedPoints[i] < minValue ) minValue = smoothedPoints[i];
    }
    for( var i=0; i<smoothedPoints.length; i++ ){
        smoothedPoints[i] -= minValue;
    }

    var maxValue = 0;
    for( var i=0; i<smoothedPoints.length; i++ ){
        if( smoothedPoints[i] > maxValue ) maxValue = smoothedPoints[i];
    }
    postSmoothNormMult = 100/maxValue;
    for( var i=0; i<smoothedPoints.length; i++ ){
        smoothedPoints[i] *= postSmoothNormMult;
    }
    //slogn(maxValue);

    if(nothingRecordedYet){
        for( var i=0; i<smoothedPoints.length; i++ ){
            smoothedPoints[i] = 0;
        }
    }

    //TODO: CODICE TORNATO ALLO STATO PRE-LOFT IN UN MODO ZOZZO PER NON DOVER MODIFICARE IL RESTO
    //SPLIT TRACK IN 3 PARTS, AND THEN MAKE AVERAGE
    var avrRangeCounter = 0;
    //var pointsLoftToSumRangeLength = smoothedPoints.length/ringSectionRes/3;  //LOFT: WAVEFORM CUT IN 3 PARTS
    var pointsLoftToSumRangeLength = smoothedPoints.length/ringSectionRes;   //!!!UN-LOFT: EVERY SECTION USES THE FULL WAVEFORM
    //clog(smoothedPoints.length);
    var tempSumLength = 0;
    for(var i=0; i<3; i++){
        //pointsLoftSection[i] = new Array(ringSectionRes);
        avrRangeCounter = 0;   //!!!UN-LOFT: EVERY SECTION USES THE FULL WAVEFORM
        for(var j=0; j<ringSectionRes; j++){
            temp = 0;
            tempSumLength=avrRangeCounter;
            //tempB = Math.floor( (i*ringSectionRes + j + 1)*pointsLoftToSumRangeLength );  //LOFT: WAVEFORM CUT IN 3 PARTS
            tempB = Math.floor( (j + 1)*pointsLoftToSumRangeLength );  //!!!UN-LOFT: EVERY SECTION USES THE FULL WAVEFORM
            while( avrRangeCounter < tempB ){
                temp += smoothedPoints[avrRangeCounter];
                avrRangeCounter++;
            }
            tempSumLength = avrRangeCounter-tempSumLength;
            if(tempSumLength==0) pointsLoftSection[i].points[j] = smoothedPoints[avrRangeCounter];
            else pointsLoftSection[i].points[j] = temp/tempSumLength;
        }
    }
    //clog( pointsLoftSection );

    //TODO: CALC SMALLEST DETAIL
    var minDetail = 3;
    var maxDrop = 0;
    var maxDropCrossingRatio = 0;
    var detailTestPoints = new Array();
    //SECTION: REAL LIEF SIZE/PROPORTIONS, WITHOUT EDGE SMOOTHING AND HEIGHT
    for(var i=0; i<ringSectionRes; i++){
        detailTestPoints[i] = new THREE.Vector3();
        detailTestPoints[i].x = pointsLoftSection[0].points[i] * exportSizeNormalizer * exportRingSize * amplitude;
        detailTestPoints[i].y = (i/(ringSectionRes-1)) * ringHeight * exportSizeNormalizer * exportRingSize;
        //if(maxDrop < detailTestPoints[i].x)  maxDrop = detailTestPoints[i].x;
    }
    //clog("max: " + maxDrop);
    //clog("h: " + (detailTestPoints[79].y-detailTestPoints[0].y) );
    var testCrossing = new THREE.Vector3();
    var crossingMidPoint = new THREE.Vector3();
    for(var i=minDetail; i<pointsLoftSection[0].points.length-minDetail-1; i++){
        testCrossing.set(0,0,0);
        testCrossing.add( detailTestPoints[i+minDetail] );
        testCrossing.sub( detailTestPoints[i-minDetail] );
        testCrossing.multiplyScalar(0.5);
        crossingMidPoint.set(0,0,0);
        crossingMidPoint.add( detailTestPoints[i-minDetail] );
        crossingMidPoint.add( testCrossing );

        var tempDrop = detailTestPoints[i].x - crossingMidPoint.x;
        if( tempDrop > maxDrop ){
            maxDrop=tempDrop;
        }

        var tempDropCrossingRatio = tempDrop / testCrossing.length() / 2;
        if( tempDropCrossingRatio > maxDropCrossingRatio ){
            maxDropCrossingRatio =  tempDropCrossingRatio;
        }
    }
    clog("maxDrop: " + maxDrop + "  maxDropCrossingRatio: " + maxDropCrossingRatio);

    if(maxDropCrossingRatio>0.8 && !recording){
        autoSmoothMult *= 1.05;
        autoAmplitudeMult *= 1;
        amplitude *= autoAmplitudeMult;
        clog("@" + frameCount + " recursive calling with autoSmoothMult = " + autoSmoothMult + " and autoAmplitudeMult = " + autoAmplitudeMult);
        waveformToPoints();
    }
}

var autoSmoothMult = 1;
var autoAmplitudeMult = 1;

function smoothArray(inputArray, tempSmoothingRadius){
    var outputArray = new Array(inputArray.length);
    for( var i=0; i<inputArray.length; i++ ){
        temp = 0;
        tempA = 0;
        tempB = 1;
        for( var j=0; j<tempSmoothingRadius; j++){
            tempC = (1 - (j/tempSmoothingRadius) );
            //tempB += tempC;
            if( (i+j) < inputArray.length ){
                temp += inputArray[i+j] * tempC;
                //tempB += tempC;
            } else temp += temp/tempB * tempC;

            //tempB += tempC;
            tempB += tempC;

            if( (i-j) >= 0 ){
                temp += inputArray[i-j] * tempC;
                //tempB += tempC;
            } else temp += temp/tempB * tempC;

            tempB += tempC;
        }
        outputArray[i] = temp/tempB;
    }
    return outputArray;
}


function calcNormalizer(){
    if(recorder) {
        var lastBuffer = recorder.getLastMonoSum();
        var coef = lastBuffer/recentVolumes;
        coef *= 0.01;
        recentVolumes = recentVolumes*(1-coef) + coef*lastBuffer;
        //slogn(recentVolumes);
        normalizerMult = 30/recentVolumes;
        //slogn(normalizerMult);
    }
}

function waveformTimeline( waveformScale, tempDrawHeight ) {
    //SET VALUES
    if(recording) var widthMult = 10*44100/(1024/4)/340 * 1.05;
    else var widthMult = smoothedPoints.length/340;
    waveformContext.lineWidth = 1/widthMult*2;
    waveformValues = smoothedPoints;

    //DRAW GRAPH
    tempDrawHeight = 50;
    waveformContext.clearRect(0,0,waveformCanvas.width,waveformCanvas.height);
    waveformContext.setTransform(1,0,0,1,0,0);
    waveformContext.translate( 0, tempDrawHeight, 0 );
    for (var i = 0; i < smoothedPoints.length; i++) {
        waveformContext.strokeStyle=colorWhite;
        waveformContext.beginPath();
        waveformContext.moveTo(i/widthMult, 0);
        waveformContext.lineTo( i/widthMult, -constrain( smoothedPoints[i]*0.5, 0.0, 50 ) );
        waveformContext.stroke();
    }
    waveformContext.closePath();
    waveformContext.setTransform(1,0,0,1,0,0);
    waveformContext.lineWidth = 1;

}

function clearWaveformValues(){
    waveformValues = null;
    waveformValues = new Array(1);
    waveformValues[0] = 0;
}

function drawLiveCreationHelpers() {
    recordContext.fillStyle="#000000"
    recordContext.strokeStyle="#FFFFFF";
    recordContext.lineWidth=2;
    recordContext.closePath();

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

    recordContext.setTransform(1,0,0,1,0,0);
}

//ANELLO LOFT
function calcRingPoints() {
    //SPOSTATO SU
}

function calcRevolvedPoints() {
    //TODO
    //var holeVector = new THREE.Vector3();
    //holeVector.set(ringRadius, 0, 0);
    for (var i = 0; i<ringPathRes; i++) {
        for(var j=0; j<ringSectionRes; j++){
            tempA = (j/(ringSectionRes-1)-0.5) * ringHeight;
            var index=j;
            if( ringTorsion !=0 ) {
                index = (ringSectionRes*ringTorsion+j-i*ringTorsion)%ringSectionRes;

                //tempB: SMOOTHING ON THE BORDER OF ORIGINAL VALUES TO AVOID SHARP EDGE
                //tempB = mapConstrained(j, 1, ringSectionRes-1, 0, ringSectionRes);
                tempB = j;
                tempB = tempB / (ringSectionRes-1) * Math.PI;
                tempB = Math.sin(tempB);

                //VERTEX Y COORDINATE "OVERFLOW"
                tempA -= i/ringPathRes * ringHeight * ringTorsion;
                //if(tempA < -ringHeight/2) tempA += ringHeight;
                while(tempA < -ringHeight/2) tempA += ringHeight;
            } else tempB=1;

            //tempC: SMOOTHING ON THE BORDER OF THE FINAL OBJECT TO HAVE NICE EVEN EDGE
            //tempC = mapConstrained(index, 1, ringSectionRes-1, 0, ringSectionRes);
            tempC = index;
            tempC = tempC / (ringSectionRes-1) * Math.PI;
            tempC = Math.sin(tempC);
            //tempC = 1;

            //var f = frameCount%ringPathRes;
            var iStore = i;
            i = ( i + Math.floor(sectionRotation*ringPathRes) )%ringPathRes;

            temp =
                pointsLoftSection[0].points[j] * loftSectionMultipliers[i][0] * ringAsymmetry[0] * ringHeightSection[0] +
                pointsLoftSection[1].points[j] * loftSectionMultipliers[i][1] * ringAsymmetry[1] * ringHeightSection[1] +
                pointsLoftSection[2].points[j] * loftSectionMultipliers[i][2] * ringAsymmetry[2] * ringHeightSection[2] +
                pointsLoftSection[0].points[j] * loftSectionMultipliers[i][3] * ringAsymmetry[0] * ringHeightSection[0] ;
            //if(smoothedPoints.length == 100) clog(temp);
            temp = temp*tempC*tempB*amplitude + sectionRadius;

            var tempHeightSectionMult =
                loftSectionMultipliers[i][0] * ringHeightSection[0] +
                loftSectionMultipliers[i][1] * ringHeightSection[1] +
                loftSectionMultipliers[i][2] * ringHeightSection[2] +
                loftSectionMultipliers[i][3] * ringHeightSection[0] ;

            i = iStore;  //ROTATION
            rings[i].sectionPoints[index].set( temp, tempA*tempHeightSectionMult, 0 );
            //rings[i].sectionPoints[j].add( holeVector );
            //rings[i].sectionPoints[j] = vOutputStatic( tv, 0, i* Math.PI*2/rings.length, 0);

            /*
            //EDGE SMOOTHING WITH SINUS CURVE
            var temp = mapConstrained(index, 1, ringSectionRes-1, 0, ringSectionRes)
            temp = temp / ringSectionRes * Math.PI;
            temp = Math.sin(temp);
            //temp=1;
            //var tx = rings[i].sectionPoints[j].x;
            rings[i].sectionPoints[j].x = (rings[i].sectionPoints[j].x-sectionRadius) * temp + sectionRadius;
            //*/
        }

        //CREATE RING INSIDE EDGE
        rings[i].sectionPoints[ ringSectionRes+3 ].set(0, -ringHeight/2*tempHeightSectionMult, 0);
        rings[i].sectionPoints[ ringSectionRes+2 ].set(0, -ringHeight/2*tempHeightSectionMult, 0);
        rings[i].sectionPoints[ ringSectionRes+1 ].set(0,  ringHeight/2*tempHeightSectionMult, 0);
        rings[i].sectionPoints[ ringSectionRes+0 ].set(0,  ringHeight/2*tempHeightSectionMult, 0);

        rings[i].sectionPoints[ ringSectionRes-1 ].y = ringHeight/2*tempHeightSectionMult;
        rings[i].sectionPoints[ 0 ].y = -ringHeight/2*tempHeightSectionMult;

        //tv.set(ringRadius, 0, 0);
        for (var j = 0; j < rings[i].sectionPoints.length; j++) {
            //clog(ringSection[j]);
            rings[i].sectionPoints[j].x += ringRadius;
            rings[i].sectionPoints[j] = vOutputStatic( rings[i].sectionPoints[j], 0, -i* Math.PI*2/ringPathRes, 0);
            //clog(rings[i].sectionPoints[j]);
        }
    }

    updateRingGeometry = true;
}



function calcLoftSectionMultipliers(){
    var tPhase = 0;
    var third = 1/3;
    for (var i = 0; i < ringPathRes; i++) {
        tPhase = i/ringPathRes;
        loftSectionMultipliers[i] = new Array(4);
        for(var j=0; j<4; j++){
            temp = Math.abs( (j)/3 - tPhase );
            temp = map(temp, 0, third, 1, 0 );
            if(temp<0) temp=0;
            temp = ( Math.sin( (temp-0.5)*Math.PI ) + 1 ) / 2;
            loftSectionMultipliers[i][j] = temp;
        }
        //clog(loftSectionMultipliers[i]);
    }
    //clog(loftSectionMultipliers);
}

var smoothingCurveValues = new Array(ringSectionRes);
for(var i=0; i<ringSectionRes; i++){
    //smoothingCurveValues[i] = i/ringSectionRes;
    smoothingCurveValues[i] = ( Math.sin( (i/ringSectionRes-0.5)*Math.PI ) + 1 ) / 2;
}


function setupRingGeometry() {
    //ADD ALL VERTICES TO THE GEOMETRY OBJECT
    var va;
    var g = new THREE.Geometry();
    var gFlatParts = new THREE.Geometry();

    for (var i = 0; i < rings.length; i++) {
        for (var j = 0; j < rings[i].sectionPoints.length; j++) {
            va = rings[i].sectionPoints[j].clone();
            v( g, va.x, va.y, va.z );
        }
        va = rings[i].edgePoints[0].clone();
        v(gFlatParts, va.x, va.y, va.z);
        va = rings[i].edgePoints[1].clone();
        v(gFlatParts, va.x, va.y, va.z);
    }
    g.verticesNeedUpdate = true;

    //DEFINE FACES BETWEEN THE VERTICES
    temp = rings[0].sectionPoints.length;
    for (var i = 0; i < rings.length; i++) {
        for (var j = 0; j < rings[i].sectionPoints.length; j++) {
            var ia = i*temp + j;
            var ib = i*temp + ( (j+1)%temp );
            var ic = ( (i+1)%ringPathRes )*temp + ( (j+1)%temp );
            var id = ( (i+1)%ringPathRes )*temp + j;

            f4( g, ib, ic, id, ia );
        }

        var ia = i*2 + 0;
        var ib = i*2 + 1;
        var ic = ( (i+1)%ringPathRes )*2 + 1;
        var id = ( (i+1)%ringPathRes )*2 + 0;

        f4( gFlatParts, ib, ic, id, ia );

    }
    g.elementsNeedUpdate = true;
    g.normalsNeedUpdate = true;
    g.computeFaceNormals();
    g.computeVertexNormals();

    ringDisplay = new THREE.Mesh(g, material);
    ringDisplay.scale.x = 0.5;
    ringDisplay.scale.y = 0.5;
    ringDisplay.scale.z = 0.5;
    ringDisplay.rotation.x = 0.0;
    scene.add(ringDisplay);


    gFlatParts.elementsNeedUpdate = true;
    gFlatParts.normalsNeedUpdate = true;
    gFlatParts.computeFaceNormals();
    gFlatParts.computeVertexNormals();

    /*
    ringFlatPartsDisplay = new THREE.Mesh(gFlatParts, material);
    ringFlatPartsDisplay.scale.x = 0.5;
    ringFlatPartsDisplay.scale.y = 0.5;
    ringFlatPartsDisplay.scale.z = 0.5;
    ringFlatPartsDisplay.rotation.x = 0.0;
    //scene.add(ringFlatPartsDisplay);
    */



}

function updateRingVertices() {
    var va;
    temp = rings[0].sectionPoints.length;
    //var g = new THREE.Geometry();
    for (var i = 0; i < rings.length; i++) {
        var index=0;
        for (var j = 0; j < rings[i].sectionPoints.length; j++) {
            va = rings[i].sectionPoints[j].clone();
            index = i*temp + j;
            ringDisplay.geometry.vertices[index].x = va.x;
            ringDisplay.geometry.vertices[index].y = va.y;
            ringDisplay.geometry.vertices[index].z = va.z;
        }

        //EDGE POINTS
        /*
        va = rings[i].sectionPoints[0].clone();
        index = i*2;
        ringFlatPartsDisplay.geometry.vertices[index].x = va.x;
        ringFlatPartsDisplay.geometry.vertices[index].y = va.y;
        ringFlatPartsDisplay.geometry.vertices[index].z = va.z;

        va = rings[i].sectionPoints[ringSectionRes-1].clone();
        index = i*2+1;
        ringFlatPartsDisplay.geometry.vertices[index].x = va.x;
        ringFlatPartsDisplay.geometry.vertices[index].y = va.y;
        ringFlatPartsDisplay.geometry.vertices[index].z = va.z;
        */
    }

    ringDisplay.geometry.verticesNeedUpdate = true;
    ringDisplay.geometry.elementsNeedUpdate = true;
    ringDisplay.geometry.normalsNeedUpdate = true;
    ringDisplay.geometry.computeFaceNormals();
    ringDisplay.geometry.computeVertexNormals();


    /*
    ringFlatPartsDisplay.geometry.verticesNeedUpdate = true;
    ringFlatPartsDisplay.geometry.elementsNeedUpdate = true;
    ringFlatPartsDisplay.geometry.normalsNeedUpdate = true;
    ringFlatPartsDisplay.geometry.computeFaceNormals();
    ringFlatPartsDisplay.geometry.computeVertexNormals();
    */
}

function RingVerticesObject() {
    this.sectionPoints = new Array(ringSectionRes+4);
    for (var i = 0; i < this.sectionPoints.length; i++) {
        this.sectionPoints[i] = new T.Vector3();
    }
    this.edgePoints = new Array(2);
    this.edgePoints[0] = new T.Vector3(0,-50,0);
    this.edgePoints[1] = new T.Vector3(0,50,0);
}


function signedVolumeOfTriangle(p1, p2, p3) {
    var v321 = p3.x*p2.y*p1.z;
    var v231 = p2.x*p3.y*p1.z;
    var v312 = p3.x*p1.y*p2.z;
    var v132 = p1.x*p3.y*p2.z;
    var v213 = p2.x*p1.y*p3.z;
    var v123 = p1.x*p2.y*p3.z;
    return (1.0/6.0)*(-v321 + v231 + v312 - v132 - v213 + v123);
}


function calcMeshProperties(){
    var mesh = ringDisplay.geometry;
    var points = mesh.vertices;
    var areaSum = 0;
    var volSum = 0;
    var t;
    var pa, pb, pc;
    var vAB = new THREE.Vector3();
    var vAC = new THREE.Vector3();
    var realSizeMultiplier = exportSizeNormalizer*exportRingSize;

    for( var i=0; i<mesh.faces.length; i++){
        t = mesh.faces[i];

        pa = points[t.a];
        pb = points[t.b];
        pc = points[t.c];

        volSum += signedVolumeOfTriangle( pa, pb, pc );

        vAB.subVectors(pb, pa);
        vAC.subVectors(pc, pa);
        areaSum += vAB.cross(vAC).length()*0.5;
    }

    ringArea = areaSum * Math.pow(realSizeMultiplier, 2);
    ringArea /= 1000000  //CONVERT MM2 TO M2

    ringVolume = volSum * Math.pow(realSizeMultiplier, 3);
    ringVolume /= 1000000000;   //CONVERT MM3 TO M3


    //CALC BOUNDING BOX
    var xn = 0;
    var xp = 0;
    var yn = 0;
    var yp = 0;
    var zn = 0;
    var zp = 0;
    var p;
    for(var i=0; i<points.length; i++){
        p = points[i];

        if( p.x<xn ) xn= p.x;
        if( p.x>xp ) xp= p.x;
        if( p.y<yn ) yn= p.y;
        if( p.y>yp ) yp= p.y;
        if( p.z<zn ) zn= p.z;
        if( p.z>zp ) zp= p.z;
    }

    xBoundMin = xn * realSizeMultiplier / 1000;
    xBoundMax = xp * realSizeMultiplier / 1000;
    yBoundMin = yn * realSizeMultiplier / 1000;
    yBoundMax = yp * realSizeMultiplier / 1000;
    zBoundMin = zn * realSizeMultiplier / 1000;
    zBoundMax = zp * realSizeMultiplier / 1000;

    /*//LOG VALUES
    clog("ringArea = " + ringArea);
    clog("ringVolume = " + ringVolume);
    clog("xBoundMin = " + xBoundMin);
    clog("xBoundMax = " + xBoundMax);
    clog("yBoundMin = " + yBoundMin);
    clog("yBoundMax = " + yBoundMax);
    clog("zBoundMin = " + zBoundMin);
    clog("zBoundMax = " + zBoundMax);
    //*/
}