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

    smoothingBuffer = new Array(10);   //float

    sliderSmoothing = new SliderObject( "Smoothing", 150, 30, 300, 300, 170, 410);
    sliderBumpiness = new SliderObject( "Wave amplitude", 0.35, 0.1, 0.9, 300, 170, 460);
    sliderRadius = new SliderObject( "Base thickness", 30, 12, 60, 300, 170, 510);
    sliderHeight = new SliderObject( "Ring height", 200, 50, 300, 300, 170, 560);
    sliderTorsion = new SliderObject( "Torsion", 1, 1, 4.4, 300, 170, 610);
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
var ringDisplay;
calcRingPoints();
calcRevolvedPoints();
setupRingGeometry();
updateRingVertices();

//ANIMATION//OUTSOURCED



//THREE.JS DRAWING FUNCTIONS + vRotate//OUTSOURCED