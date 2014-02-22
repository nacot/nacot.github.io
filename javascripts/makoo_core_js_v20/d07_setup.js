//AUDIO SETUP//OUTSOURCED: demo_01_audio_setup.js
//MOUSE SETUP + EVENTS//OUTSOURCED
//BASIC SCENE SETUP//OUSOURCED
//APP VARIABLES//OUTSOURCED



///////////////////////////////////////SETUP///////////////////////////////////////
{
    tv = new T.Vector3();

    ringSection = new Array(ringSectionRes);
    for (var i = 0; i < ringSection.length; i++){
        ringSection[i] = new T.Vector3();
    }
    rings = new Array(ringPathRes);
    for (var i = 0; i < rings.length; i++) {
        rings[i] = new RingVerticesObject();
    }

    calcLoftSectionMultipliers();

    smoothingBuffer = new Array(10);   //float

    var tempSliderHeight = 400;
    var tempSliderDist = 26;
    sliderSmoothing = new SliderObject( "Smoothing", 30, 15, 80, 300, 170, tempSliderHeight);
    tempSliderHeight += tempSliderDist;
    sliderSmoothingDifferences = new SliderObject( "Intensity correction", 0.5, -3, 3, 300, 170, tempSliderHeight);
    tempSliderHeight += tempSliderDist;
    sliderRadius = new SliderObject( "Base thickness", 1, 0.5, 3, 300, 170, tempSliderHeight);
    tempSliderHeight += tempSliderDist;
    sliderTorsion = new SliderObject( "Torsion", 1, 0, 2.9, 300, 170, tempSliderHeight);
    tempSliderHeight += tempSliderDist;
    sliderBumpiness = new SliderObject( "Overall amplitude", 0.4, 0.0, 1.0, 300, 170, tempSliderHeight);
    tempSliderHeight += tempSliderDist;
    sliderAsymmetry0 = new SliderObject( "Amplitude asymmetry", 1.0, 1, 2, 300, 170, tempSliderHeight);
    /*
    tempSliderHeight += tempSliderDist;
    sliderAsymmetry1 = new SliderObject( "Section 2 amplitude", 1, 0, 2, 300, 170, tempSliderHeight);
    tempSliderHeight += tempSliderDist;
    sliderAsymmetry2 = new SliderObject( "Section 3 amplitude", 1, 0, 2, 300, 170, tempSliderHeight);
    */

    tempSliderHeight += tempSliderDist;
    sliderHeight0 = new SliderObject( 'Ring "gem" asymmetry', 1, 1, 1.5, 300, 170, tempSliderHeight);

    /*
    tempSliderHeight += tempSliderDist;
    sliderHeight1 = new SliderObject( "Section 3 height", 1, 0.5, 1.5, 300, 170, tempSliderHeight);
    tempSliderHeight += tempSliderDist;
    sliderHeight2 = new SliderObject( "Section 3 height", 1, 0.5, 1.5, 300, 170, tempSliderHeight);
    */

    tempSliderHeight += tempSliderDist;
    sliderRotation = new SliderObject( "Rotation of asymmetric features", 0, 0, ringPathRes, 300, 170, tempSliderHeight);

    //tempSliderHeight += tempSliderDist;
    tempSliderHeight += tempSliderDist;
    sliderHeight = new SliderObject( "Ring height", 200, 80, 220, 300, 170, tempSliderHeight);

    tempSliderHeight += tempSliderDist;
    sliderRingSize = new SliderObject( "Ring size", 18, 12, 25, 300, 170, tempSliderHeight);
}

///////////////////////////////////////ADD GEOMETRY, TO MODIFY DYNAMICLY///////////////////////////////////////
//SAMPLE MESHES
{
    var g = new THREE.CubeGeometry(100,100,100);
    var cube = new THREE.Mesh(g, material);
    //scene.add(cube);

    var g = new THREE.Geometry();
    v( g, -100,  100, 0 );
    v( g, -100, -100, 0 );
    v( g,  100, -100, 0 );
    v( g,  100,  100, 0 );
    f4( g,  0, 1, 2, 3 );
    g.verticesNeedUpdate = true;
    g.elementsNeedUpdate = true;
    //g.normalsNeedUpdate = true;
    g.computeFaceNormals();

    var testFace = new THREE.Mesh(g, material);
    //scene.add(testFace);
}
var ringDisplay, ringFlatPartsDisplay;
calcRingPoints();
calcRevolvedPoints();
setupRingGeometry();
updateRingVertices();

//ANIMATION//OUTSOURCED



//THREE.JS DRAWING FUNCTIONS + vRotate//OUTSOURCED