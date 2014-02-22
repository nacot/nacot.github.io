var render = function () {
    requestAnimationFrame(render);
    var delta = clock.getDelta();
    stats.update();
    //controls.update();
    frameCount++;
    setCursorToNormal();
    setHandAllClickAreas();
    context2d.clearRect(0,0,c.width,c.height);
    drawUIBlocks();

    //sliderSmoothing.update();
    smoothingRadius = parseInt( sliderSmoothing.update() );
    smoothingRadiusDifferences = sliderSmoothingDifferences.update();

    //sectionRadius = sliderRadius.update();
    sectionRadius = 1.3 / (exportSizeNormalizer*exportRingSize);
    temp = sectionRadius*exportSizeNormalizer*exportRingSize;
    temp = Math.round(temp*100) / 100;
    //sectionRadiusFeedback.innerHTML = "Selected Base Thickness: " + temp;

    ringTorsion = parseInt( sliderTorsion.update() );

    amplitude = sliderBumpiness.update();
    ringAsymmetry[0] = sliderAsymmetry0.update();
    //ringAsymmetry[1] = sliderAsymmetry1.update();
    //ringAsymmetry[2] = sliderAsymmetry2.update();
    temp = 2 - ringAsymmetry[0];
    ringAsymmetry[1] = temp;
    ringAsymmetry[2] = temp;
    ringAsymmetry[0] = 1;

    sectionRotation = parseInt( sliderRotation.update() );

    ringHeight = sliderHeight.update();
    temp = ringHeight*exportSizeNormalizer*exportRingSize;
    temp = Math.round(ringHeight*exportSizeNormalizer*exportRingSize*1) / 1;
    //ringHeightFeedback.innerHTML = "Selected height: " + temp;
    sliderHeight.text = "Ring height: " + temp + " mm";

    ringHeightSection[0] = sliderHeight0.update();
    //ringHeightSection[1] = sliderHeight1.update();
    //ringHeightSection[2] = sliderHeight2.update();
    temp = 2 - ringHeightSection[0];
    ringHeightSection[1] = temp;
    ringHeightSection[2] = temp;

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
        waveformToPoints();
        calcRingPoints();
        calcRevolvedPoints();
        updateRingVertices();
        if(updateRingGeometry) volumeFeedback.innerHTML = "Ring volume: " + parseInt(calcRingVolume()*100)/100 + " mm3";
        //if(strokeDisplay) ringDisplay.material.shading = THREE.FlatShading;
        //else ringDisplay.material.shading = THREE.SmoothShading;
        updateRingGeometry = false;
        if( recCurrentLength > 10 ) stopRecording();
    }
    if(recording) recCurrentLength = (clock.getElapsedTime()-recStartTime);

    //ringDisplay.position.y = -ringHeight/4;
    mouseDraggingCheck();
    ringDisplay.rotation.x = rotY;
    ringDisplay.rotation.y = rotX - sectionRotation/ringPathRes*Math.PI*2;
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



