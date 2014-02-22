var render = function () {
    requestAnimationFrame(render);
    var delta = clock.getDelta();
    stats.update();
    //controls.update();
    frameCount++;
    setCursorToNormal();
    setHandAllClickAreas();
    context2d.clearRect(0,0,ringCanvas.width,ringCanvas.height);
    recordContext.clearRect(0,0,recordCanvas.width, recordCanvas.height);
    drawUIBlocks();



    //sliderSmoothing.update();
    //smoothingRadius = parseInt( sliderSmoothing.update() );
    //smoothingRadiusDifferences = sliderSmoothingDifferences.update();

    //sectionRadius = sliderRadius.update();
    sectionRadius = 1.3 / (exportSizeNormalizer*exportRingSize);
    temp = sectionRadius*exportSizeNormalizer*exportRingSize;
    temp = Math.round(temp*100) / 100;
    //sectionRadiusFeedback.innerHTML = "Selected Base Thickness: " + temp;



    tempA = Math.round(ringHeight*ringHeightSection[1]*exportSizeNormalizer*exportRingSize*10) / 10;
    tempB = Math.round(ringHeight*ringHeightSection[0]*exportSizeNormalizer*exportRingSize*10) / 10;
    ringHeightFeedback.innerHTML = "Ring height: " + tempA + " | " + tempB + " mm";


    /*
     exportRingSize = parseInt( sliderRingSize.update()*10 ) / 10;
     //ringSizeFeedback.innerHTML = "Selected size: " + exportRingSize;
     sliderRingSize.text = "Ring size: " + sizeConverter(exportRingSize) +
     " (" + selectedStandard + ") (" + exportRingSize + "mm)";
     */

    //sectionRadius += 0.01;
    calcNormalizer();
    //samplingWaveform();
    if( recording  ||  updateRingGeometry ){
        if(  controlsOpacity<1 ){
            if(recording)controlsOpacity += 0.01;
            document.getElementById("control_div").style.opacity = controlsOpacity;
            document.getElementById("order_div").style.opacity = controlsOpacity;
        }
        autoSmoothMult = 1;
        autoAmplitudeMult = 1;
        //autoSmoothMult /= 1.05;
        //autoAmplitudeMult /= 0.98;

        autoSmoothRounds = 0;
        waveformToPoints();
        calcRingPoints();
        calcRevolvedPoints();
        updateRingVertices();


        if(updateRingGeometry){
            calcMeshProperties();
            volumeFeedback.innerHTML =
                "ringVolume: " + ringVolume + " m3" + "<br>"  +
                    "ringArea: " + ringArea + " m2" + "<br>" +
                    "xBoundMin: " + xBoundMin + "<br>" +
                    "xBoundMax: " + xBoundMax + "<br>" +
                    "yBoundMin: " + yBoundMin + "<br>" +
                    "yBoundMax: " + yBoundMax + "<br>" +
                    "zBoundMin: " + zBoundMin + "<br>" +
                    "zBoundMax: " + zBoundMax + "<br>";
        }


        //if(strokeDisplay) ringDisplay.material.shading = THREE.FlatShading;
        //else ringDisplay.material.shading = THREE.SmoothShading;
        updateRingGeometry = false;
        //if( recCurrentLength > 10 ) stopRecording();  //OBSOLATE: TIMEOUT IN stopRecording()
    }
    if(recording) recCurrentLength = (clock.getElapsedTime()-recStartTime);
    recordTimeFeedback.innerHTML = Number(recCurrentLength).toFixed(1)+" sec";

    //ringDisplay.position.y = -ringHeight/4;
    mouseDraggingCheck();
    //ringDisplay.rotation.x = rotY;
    //ringDisplay.rotation.y = rotX - sectionRotation*Math.PI*2;

    ringDisplayDouble.rotation.x = rotY;
    ringDisplayDouble.rotation.y = rotX - sectionRotation*Math.PI*2;

    //ringFlatPartsDisplay.rotation.x = rotY;
    //ringFlatPartsDisplay.rotation.y = rotX;



    drawLiveCreationHelpers();
    waveformTimeline( 1, 300 );
    drawRecButton();
    drawLabels();

    //slogn(mouseX);
    //slogn(mouseY);
    slogDisplay();

    texture2d.needsUpdate = true;

    messageAllowAudio();

    //material.shading = THREE.FlatShading;

    renderer.render(scene, camera);


};

changeSelectedSize();



