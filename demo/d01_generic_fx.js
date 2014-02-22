
//EXAMPLE USAGE
/*
 var g = new THREE.Geometry();
 v( g, vd.x, vd.y, vd.z );
 v( g, vc.x, vc.y, vc.z );
 v( g, vb.x, vb.y, vb.z );
 f3(g, 0, 1, 2 );
 g.verticesNeedUpdate = true;
 g.elementsNeedUpdate = true;
 //g.normalsNeedUpdate = true;
 g.computeFaceNormals();
 scene.add(g);
 */

function v( scope, x, y, z ) {
    scope.vertices.push( new THREE.Vector3( x, y, z ) );
}

function f3( scope, a, b, c ) {
    scope.faces.push( new THREE.Face3( a, b, c ) );
}

function f4( scope, a, b, c, d ) {
    scope.faces.push( new THREE.Face3( a, b, c ) );
    scope.faces.push( new THREE.Face3( c, d, a ) );
}

function t3color(tempColorCode){
    var tc = new THREE.Color("#" + tempColorCode);
    return tc;
}

function lineFromVectors( scope, tempInputV1, tempInputV2 ) {
    //p.line( tempInputV1.x, tempInputV1.y, tempInputV2.x, tempInputV2.y );
    //context2d.beginPath();
    scope.moveTo(tempInputV1.x,tempInputV1.y);
    scope.lineTo(tempInputV2.x,tempInputV2.y);
    //context2d.stroke();
}

function clog(tempLog){
    console.log(tempLog);
}

function vOutputStatic(tempInput, tempRX, tempRY, tempRZ)  {
    var x = tempInput.x;
    var y = tempInput.y;
    var z = tempInput.z;

    var rx = tempRX;
    var ry = tempRY;
    var rz = tempRZ;
    var p = Math;

    //rotate around X axis
    var ny = (y * p.cos(rx)) - (z * p.sin(rx));
    var nz = (z * p.cos(rx)) + (y * p.sin(rx));
    y = ny;
    z = nz;

    //rotate around Y axis
    var nx = (x * p.cos(ry)) + (z * p.sin(ry));
    nz = -(x * p.sin(ry)) + (z * p.cos(ry));
    x = nx;
    z = nz;

    //rotate around Z axis
    nx = (x * p.cos(rz)) - (y * p.sin(rz));
    ny = (y * p.cos(rz)) + (x * p.sin(rz));
    x = nx;
    y = ny;

    tempInput = new T.Vector3(x, y, z);
    return tempInput;
}


function mapConstrained( tTime, tPeriodStart, tPeriodEnd, tValueRangeStart, tValueRangeEnd ) {
    tTime = map( tTime, tPeriodStart, tPeriodEnd, tValueRangeStart, tValueRangeEnd );
    tTime = constrain( tTime, tValueRangeStart, tValueRangeEnd );
    return tTime;
}

function map(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}
function constrain( value, rangeStart, rangeEnd ){
    if( value < rangeStart ) return rangeStart;
    if( value > rangeEnd ) return rangeEnd;
    return value;
}


function testCoordinatesInside( tx, ty, tlx, tly, brx, bry ) {
    if ( tlx < tx   &&  tx < brx  &&
        tly < ty  &&  ty < bry  )
    {
        return true;
    }
    else {
        return false;
    }
}