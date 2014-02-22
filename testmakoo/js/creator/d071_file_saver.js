/*
//var x = document.getElementById("link");
var x = document.createElement("a");
x.href = "#";
x.innerHTML = "Download generated file";
x.style.color = "#FFF";
document.body.appendChild(x);
*/
fileSaver = function () {
    var x = document.getElementById("save_file_uri");
    var exportSTL = new THREE.STLExporter;
    //var exportResult = exportSTL.exportMesh(ringFlatPartsDisplay);
    var exportRing = ringDisplay;
    ringDisplay.rotation.x = 0;
    ringDisplay.rotation.y = 0;
    temp = exportSizeNormalizer*exportRingSize;
    ringDisplay.scale.set(temp,temp,temp);
    renderer.render(scene, camera);
    var exportResult = exportSTL.exportMesh(ringDisplay);
    ringDisplay.rotation.x = rotY;
    ringDisplay.rotation.y = rotX;
    //ringDisplay.scale.x = 0.5;
    //ringDisplay.scale.y = 0.5;
    //ringDisplay.scale.z = 0.5;
    ringDisplay.scale.set(0.5, 0.5, 0.5);
    //*/

    /*
    var exportOBJ = new THREE.OBJExporter;
    var exportResult = exportOBJ.parse(ringDisplay.geometry);
    clog(exportResult.length);
    //*/

    var blob = new Blob([exportResult], {type: 'text/plain'});
    x.href = window.URL.createObjectURL(blob);

    /*
    var uriData = "ECCO";
    var encURI = encodeURI(exportResult);
    x.href = 'data:text/plain;charset=UTF-8,' + encURI;
    */

    var d = new Date().toISOString().slice(0, 19).replace(/-/g, "");
    x.download = "makoo-jewels-ring-" + d + ".stl";
};


clog("download button attached");
