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

    sliderSmoothing.drawSlider();
    smoothingRadius = parseInt(sliderSmoothing.value);

    sliderRadius.drawSlider();
    sectionRadius = sliderRadius.value;

    sliderBumpiness.drawSlider();
    amplitude = sliderBumpiness.value;

    sliderHeight.drawSlider();
    ringHeight = sliderHeight.value;

    sliderTorsion.drawSlider();
    ringTwists = parseInt(sliderTorsion.value);

    //sectionRadius += 0.01;
    calcNormalizer();
    //samplingWaveform();
    if( recording  ||  updateRingGeometry ){
        waveformToPoints();
        calcRingPoints();
        calcRevolvedPoints();
        updateRingVertices();
        //if(strokeDisplay) ringDisplay.material.shading = THREE.FlatShading;
        //else ringDisplay.material.shading = THREE.SmoothShading;
        updateRingGeometry = false;
        if( recCurrentLength > 10 ) stopRecording();
    }
    if(recording) recCurrentLength = (clock.getElapsedTime()-recStartTime);

    //ringDisplay.position.y = -ringHeight/4;
    mouseDraggingCheck();
    ringDisplay.rotation.x = rotY;
    ringDisplay.rotation.y = rotX;



    drawLiveCreationHelpers();
    waveformTimeline( 1, 300 );
    drawRecButton();
    drawLabels();

    slogn(mouseX);
    slogn(mouseY);
    //slogDisplay();

    texture2d.needsUpdate = true;

    messageAllowAudio();

    //material.shading = THREE.FlatShading;
    renderer.render(scene, camera);


};



