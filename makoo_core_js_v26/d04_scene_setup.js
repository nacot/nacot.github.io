//TOOLS
var T = THREE;
var clock = new T.Clock();

var stats;
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.bottom = '0px';
stats.domElement.style.right = '0px';
stats.domElement.style.zIndex = 100;
//container.appendChild( stats.domElement );
document.body.appendChild( stats.domElement );


//SCENE
//var ringCanvas = document.getElementById("ring_canvas");

var scene = new THREE.Scene();



var aspect = camWidth/camHeight; //window.innerWidth/window.innerHeight;
var camera = new THREE.PerspectiveCamera(44, aspect, 0.1, 1000);

var fullWidth = camWidth * 2;
var fullHeight = camHeight * 1;
camera.setViewOffset( camWidth, camHeight, 0, 0, camWidth, camHeight );

camera.position.set( 0, 0, 600 );
//camera.position.set( -140, 20, 600 );
//var controls = new THREE.OrbitControls( camera, renderer.domElement );


var renderer = new THREE.WebGLRenderer({canvas: ringCanvas, antialias:true});
//renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(camWidth,camHeight);
//document.body.appendChild(renderer.domElement);
clog(" " + window.innerWidth + "  " + window.innerHeight);


//LIGHT
var light = new THREE.PointLight( 0xffffff, 0.1, 0 );
light.position.set( 200, 100, 500 );
scene.add( light );

var light2 = new THREE.PointLight( 0xffffff, 0.3, 0 );
light2.position.set( -200, -100, 200 );
scene.add( light2 );
/*
var light3 = new THREE.PointLight( 0xddeeff, 0.5, 0 );
light3.position.set( -200, -200, 500 );
scene.add( light3 );
 //*/



/*
//BUTTONS
var buttonsTexture = THREE.ImageUtils.loadTexture( 'buttons.png' );
var buttonsMaterial = new THREE.SpriteMaterial( {
    map: buttonsTexture,
    useScreenCoordinates: true,
    scaleByViewport: true,
    alignment: THREE.SpriteAlignment.topLeft
} );
var buttonsSprite = new THREE.Sprite( buttonsMaterial );
buttonsSprite.position.set( 0, 560, 0 );
buttonsSprite.scale.set(640, 80, 1 ); // imageWidth, imageHeight
scene.add( buttonsSprite );
*/

// create a canvas element
var canvasSpriteSlider = document.createElement('canvas');
canvasSpriteSlider.width = 120;
canvasSpriteSlider.height = 16;
var context1 = canvasSpriteSlider.getContext('2d');
context1.fillStyle = "#2F9CB5";
context1.fillRect(0,0,120,16);

// canvas contents will be used for a texture
var texture1 = new THREE.Texture(canvasSpriteSlider);
texture1.needsUpdate = true;
var sliderMat = new THREE.SpriteMaterial( {
    map: texture1,
    useScreenCoordinates: true,
    scaleByViewport: true,
    alignment: THREE.SpriteAlignment.center
} );
//var sliderMat = new T.MeshBasicMaterial({color: 0xFF2F9CB5});


//2D LAYER TO DRAW ON
// create a canvas element
var canvas2dLayer = document.createElement('canvas');
canvas2dLayer.width = ringCanvas.width;
canvas2dLayer.height = ringCanvas.height;
var context2d = canvas2dLayer.getContext('2d');
context2d.fillStyle = "#ff0000";
//context2d.fillRect(40,40,560,160);

//WAVEFORM CANVAS
var waveformCanvas = document.getElementById("waveform_canvas");
var waveformContext = waveformCanvas.getContext('2d');
waveformContext.fillStyle = "#ff0000";

//RECORD BUTTON CANVAS
var recordCanvas = document.getElementById("record_canvas");
var recordContext = recordCanvas.getContext('2d');
recordContext.fillStyle = "#ff0000";

// ringCanvas contents will be used for a texture
var texture2d = new THREE.Texture(canvas2dLayer);
texture2d.needsUpdate = true;
var drawingMat = new THREE.SpriteMaterial( {
    map: texture2d,
    useScreenCoordinates: true,
    scaleByViewport: true,
    alignment: THREE.SpriteAlignment.topLeft
} );

var drawingSprite = new THREE.Sprite( drawingMat );
drawingSprite.position.set( 0, 0, -2 );
drawingSprite.scale.set(camWidth, camHeight, 1 ); // imageWidth, imageHeight
scene.add( drawingSprite );


//CUBE MAP
var path = "cube/";
var format = '.png';
var urls = [
    path + 'a_r' + format, path + 'a_l' + format,
    path + 'a_u' + format, path + 'a_d' + format,
    path + 'a_f' + format, path + 'a_b' + format
];

var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );


var material = new THREE.MeshPhongMaterial( {
    //color: t3color("FFDC62"),
    emissive: t3color("000000"),
    transparent: true,
    opacity: 0.9,
    //specular: 0xffeeaa,
    //ambient: 0x000000,
    //shininess: 0x888888,
    //normalMap: uniforms[ "tNormal" ].value,
    //normalScale: uniforms[ "uNormalScale" ].value,
    envMap: reflectionCube,
    combine: THREE.MultiplyOperation,
    //combine: THREE.AddOperation,
    //combine:  THREE.MixOperation,
    //reflectivity: 2,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
} );

// Basic wireframe materials.
//darkMaterial = new THREE.MeshPhongMaterial( { color: 0x000088 } );
simpleShadeMaterial = new THREE.MeshPhongMaterial( {
    color: t3color("FFE27B"),
    //wireframe: false,
    transparent: false,
    side: THREE.DoubleSide
    //blending: THREE.NormalBlending
    //blending: THREE.MultiplyBlending
    //blending: THREE.AdditiveBlending
} );
multiMaterial = [ simpleShadeMaterial, material ];

var colorGold = t3color("F4D453");
var colorSilver = t3color("CCD1D7");
var colorBrass = t3color("DDA94D");

changeMaterialRadio = function(value){
    clog("changing material...");
    switch(value){
        case "gold":
            material.opacity = 0.9;
            //material.reflectivity = 1;
            simpleShadeMaterial.color = colorGold;
            material.emissive = colorGold;
            break;
        case "silver":
            material.opacity = 0.9;
            //material.reflectivity = 1;
            simpleShadeMaterial.color = colorSilver;
            material.emissive = colorSilver;
            break;
        case "brass":
            material.opacity = 0.8;
            //material.reflectivity = 1;
            simpleShadeMaterial.color = colorBrass;
            material.emissive = colorBrass;
            break;
        default:
            clog(x.options[x.selectedIndex].value);
    }

}
changeMaterialRadio("gold");




/*
// This sphere is created using an array containing both materials above.
var sphereGeom =  new THREE.SphereGeometry( 50, 32, 16 );
var sphere = THREE.SceneUtils.createMultiMaterialObject(
    sphereGeom, multiMaterial );
sphere.position.set(150, 50, 0);
scene.add( sphere );
*/




/*
var material = new THREE.MeshBasicMaterial( {
    envMap: THREE.ImageUtils.loadTexture( 'cube/metal.jpg', new THREE.SphericalReflectionMapping() ),
    overdraw: true
} );
*/

/*
//MATERIAL PRESET, TO BE MODIFIED BY USER CONTROLS LATER
//var material = new THREE.MeshLambertMaterial({color: 0xffffff});
var material = new THREE.MeshPhongMaterial({
    //"uuid": "B7ACD575-F142-4CF6-8740-96821A868F45",
    //"type": "MeshPhongMaterial",
    "color": 0xaaaacc,
    "ambient": 0x0,
    "emissive": 0,
    "specular": 0x999999,
    "shininess": 22,
    "opacity": 1,
    "transparent": false,
    "wireframe": false,
    "shading" : THREE.SmoothShading
    //"shading" : THREE.FlatShading
});
//var tc = new THREE.Color("#123");
material.color = t3color("889");
material.side = THREE.DoubleSide;
//var textureBG = THREE.ImageUtils.loadTexture( "sfondo.png" );
//*/


//var material = new THREE.MeshNormalMaterial();
//material.side = THREE.DoubleSide;
/*
// Using wireframe materials to illustrate shape details.
var darkMaterial = new THREE.MeshBasicMaterial( { color: 0xffffcc } );
var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } );
var multiMaterial = [ darkMaterial, wireframeMaterial ];
*/