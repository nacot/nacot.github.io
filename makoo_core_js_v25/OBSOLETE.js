
function waveformToPoints(){
    //var samplePoints = recorder.getBuffersRecLowres();
    var samplePoints = recorder.getBuffersRecMidres();
    slogn(samplePoints.length);
    if( samplePoints.length == 0 ) {
        samplePoints = new Array();
        for(var i=0; i<smoothingRadius+1; i++) {
            samplePoints[i] = 50;
        }
    }

    //NORMALIZE
    var normalizedPoints = new Array();
    for( i in samplePoints){
        normalizedPoints[i] = samplePoints[i]*normalizerMult;
    }

    //[...]

    //CALC RING SECTION BASE VALUES

    //AVERAGE NEIGHBOUR VALUES: OLD METHOD
    for (var i=0; i<points.length; i++){
        var targetIndexFloat = map(i, 0, points.length-1, 0, smoothedPoints.length-1);
        var targetIndexLower = Math.floor(targetIndexFloat);
        var targetIndexHigher = Math.ceil(targetIndexFloat);
        if( targetIndexHigher-targetIndexLower < 0.1 ){
            points[i] = smoothedPoints[targetIndexLower];
        } else {
            var low = smoothedPoints[targetIndexLower];
            var high = smoothedPoints[targetIndexHigher];
            low *= targetIndexFloat - targetIndexLower;
            high *= targetIndexHigher - targetIndexFloat;
            points[i] = low + high;
        }
    }

    //AVERAGE A RANGE OF VALUES
    var avrRangeCounter = 0;
    var pointsToSumRangeLength = smoothedPoints.length/points.length;
    var tempSumLength = 0;
    for (var i=0; i<points.length; i++){
        temp = 0;
        tempSumLength=avrRangeCounter;
        tempB = Math.floor((i+1)*pointsToSumRangeLength);
        while( avrRangeCounter < tempB ){
            temp += smoothedPoints[avrRangeCounter];
            avrRangeCounter++;
        }
        tempSumLength = avrRangeCounter-tempSumLength;
        if(tempSumLength==0) points[i] = smoothedPoints[avrRangeCounter];
        else points[i] = temp/tempSumLength;
    }
}



//BRACCIALE ORIGINALE

function calcRingPoints() {
    for ( var i = 0; i < ringSection.length; i++) {
        temp = points[i]/100 * amplitude  +  (1-amplitude);
        temp *= sectionRadius;
        tv = new T.Vector3();
        tv.set(1, 0, 0);
        tv.multiplyScalar( temp );
        tv = vOutputStatic(tv, 0, 0, i* Math.PI*2/points.length);
        ringSection[i].x = tv.x;
        ringSection[i].y = tv.y;
        ringSection[i].z = tv.z;
    }
    //clog("calcRingPoints() - " + points[1] + " - " + ringSection[10].x +","+ ringSection[10].y +","+ ringSection[10].z );
}


function calcRevolvedPoints() {
    for (var i = 0; i < rings.length; i++) {
        for (var j = 0; j < rings[i].sectionPoints.length; j++) {
            rings[i].sectionPoints[j] = vOutputStatic( ringSection[j], 0, 0, ringTorsion*i* Math.PI*2/rings.length );
            //clog(ringSection[j]);
            tv.set(ringRadius, 0, 0);
            rings[i].sectionPoints[j].add( tv );
            rings[i].sectionPoints[j] = vOutputStatic( rings[i].sectionPoints[j], 0, i* Math.PI*2/rings.length, 0);
            //clog(rings[i].sectionPoints[j]);
        }
    }
    //clog( rings[49].sectionPoints[19] );
}


//ANELLO TORSION

function calcRingPoints() {
    for ( var i = 0; i < ringSection.length; i++) {
        //temp = points[i]/100 * amplitude  +  (1-amplitude);
        temp = points[i] * amplitude;
        //temp *= sectionRadius;
        tv = new T.Vector3();
        tv.set(1, 0, 0);
        tv.multiplyScalar( temp + sectionRadius );
        tv.y = i/ringSection.length * ringHeight;
        //tv = vOutputStatic(tv, 0, 0, i* Math.PI*2/points.length);
        ringSection[i].set(tv.x, tv.y, tv.z);
        //ringSection[i].x = tv.x;
        //ringSection[i].y = tv.y;
        //ringSection[i].z = tv.z;
    }
    //ringSection[0].set(0,0,0);
    //ringSection[ringSection.length-1].set(0,ringHeight,0);
    //clog("calcRingPoints() - " + points[1] + " - " + ringSection[10].x +","+ ringSection[10].y +","+ ringSection[10].z );
}

function calcRevolvedPoints() {
    for (var i = 0; i < rings.length; i++) {
        for (var j = 0; j < rings[i].sectionPoints.length; j++) {
            //rings[i].sectionPoints[j] = vOutputStatic( ringSection[j], 0, 0, ringTorsion*i* Math.PI*2/rings.length );
            //rings[i].sectionPoints[j] = ringSection[j].clone();
            rings[i].sectionPoints[j] = ringSection[ (ringSection.length+j+ i*ringTorsion) % ringSection.length ].clone();
            rings[i].sectionPoints[j].y -= (i/rings.length)*ringHeight*ringTorsion;
            rings[i].sectionPoints[j].y += ringHeight*ringTorsion;
            rings[i].sectionPoints[j].y = rings[i].sectionPoints[j].y % ringHeight;

            var temp = mapConstrained(j, 2, ringSectionRes-3, 0, ringSectionRes)
            temp = temp / rings[i].sectionPoints.length * Math.PI;
            temp = Math.sin(temp);
            //var tx = rings[i].sectionPoints[j].x;
            rings[i].sectionPoints[j].x = (rings[i].sectionPoints[j].x-sectionRadius) * temp + sectionRadius;

        }

        rings[i].sectionPoints[ 0 ].set(0,0,0);
        rings[i].sectionPoints[ ringSection.length-1 ].set(0,ringHeight,0);

        //ADD ONE MORE POINT AT THE SAME POSITION TO AVOID SMOOTHING INSIDE THE RING
        rings[i].sectionPoints[ 1 ].set(0,0,0);
        rings[i].sectionPoints[ ringSection.length-2 ].set(0,ringHeight,0);

        for (var j = 0; j < rings[i].sectionPoints.length; j++) {
            //clog(ringSection[j]);
            tv.set(ringRadius, 0, 0);
            rings[i].sectionPoints[j].add( tv );
            rings[i].sectionPoints[j] = vOutputStatic( rings[i].sectionPoints[j], 0, i* Math.PI*2/rings.length, 0);
            //clog(rings[i].sectionPoints[j]);
        }
    }
    //clog( rings[49].sectionPoints[19] );
}

function calcRingPoints() {

    for ( var i = 0; i < ringSection.length; i++) {
        //temp = points[i]/100 * amplitude  +  (1-amplitude);
        temp = points[i] * amplitude;
        //temp *= sectionRadius;
        //tv = new T.Vector3();
        tv.set(1, 0, 0);
        tv.multiplyScalar( temp + sectionRadius );
        tv.y = (i/ringSection.length-0.5) * ringHeight;
        //tv = vOutputStatic(tv, 0, 0, i* Math.PI*2/points.length);
        ringSection[i].set(tv.x, tv.y, tv.z);
        //ringSection[i].x = tv.x;
        //ringSection[i].y = tv.y;
        //ringSection[i].z = tv.z;
    }

    //ringSection[0].set(0,0,0);
    //ringSection[ringSection.length-1].set(0,ringHeight,0);
    //clog("calcRingPoints() - " + points[1] + " - " + ringSection[10].x +","+ ringSection[10].y +","+ ringSection[10].z );
}


function calcRevolvedPoints() {
    for (var i = 0; i < rings.length; i++) {
        for (var j = 0; j < rings[i].sectionPoints.length; j++) {
            //rings[i].sectionPoints[j] = vOutputStatic( ringSection[j], 0, 0, ringTorsion*i* Math.PI*2/rings.length );
            //rings[i].sectionPoints[j] = ringSection[j].clone();
            rings[i].sectionPoints[j] = ringSection[ (ringSection.length+j+ i*ringTorsion) % ringSection.length ].clone();
            rings[i].sectionPoints[j].y -= (i/rings.length)*ringHeight*ringTorsion;
            rings[i].sectionPoints[j].y += ringHeight*ringTorsion;
            rings[i].sectionPoints[j].y = rings[i].sectionPoints[j].y % ringHeight;

            //EDGE SMOOTHING WITH SINUS CURVE
            var temp = mapConstrained(j, 2, ringSectionRes-3, 0, ringSectionRes)
            temp = temp / rings[i].sectionPoints.length * Math.PI;
            temp = Math.sin(temp);
            //var tx = rings[i].sectionPoints[j].x;
            rings[i].sectionPoints[j].x = (rings[i].sectionPoints[j].x-sectionRadius) * temp + sectionRadius;

        }

        rings[i].sectionPoints[ 0 ].set(0,0,0);
        rings[i].sectionPoints[ ringSection.length-1 ].set(0,ringHeight,0);

        //ADD ONE MORE POINT AT THE SAME POSITION TO AVOID SMOOTHING INSIDE THE RING
        rings[i].sectionPoints[ 1 ].set(0,0,0);
        rings[i].sectionPoints[ ringSection.length-2 ].set(0,ringHeight,0);

        //CREATE A HOLE IN THE MIDDLE AND ROTATE AROUND MAIN AXIS
        tv.set(ringRadius, 0, 0);
        for (var j = 0; j < rings[i].sectionPoints.length; j++) {
            //clog(ringSection[j]);
            rings[i].sectionPoints[j].add( tv );
            rings[i].sectionPoints[j] = vOutputStatic( rings[i].sectionPoints[j], 0, i* Math.PI*2/rings.length, 0);
            //clog(rings[i].sectionPoints[j]);
        }

    }

    //[...]
}
//clog( rings[49].sectionPoints[19] );
