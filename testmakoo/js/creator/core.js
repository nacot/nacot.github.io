$(function() {
    $( "#torsion_radio" ).buttonset();
});
$("input:radio[name=torsion]").click(function() {
    var value = $(this).val();
    value = parseInt(value);
    ringTorsion = value;
    updateRingGeometry = true;
});

//INIT ALL SLIDERS
$(function() {
    //SMOOTHING
    var modValue = function(){
        smoothingRadiusMin = $("#"+this.id).slider("value");
        smoothingRadiusMin = parseInt( smoothingRadiusMin );
        updateRingGeometry = true;
    }
    smoothingRadiusMin = 30;
    $( "#slider_smoothing" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 15,
        max: 160,
        value: smoothingRadiusMin,
        step: 1,
        change: modValue,
        slide: modValue
    });


    //CORRECTION
    var modValue = function(){
        smoothingRadiusDifferences = $("#"+this.id).slider("value");
        updateRingGeometry = true;
    }
    smoothingRadiusDifferences = 0.5;
    $( "#slider_correction" ).slider({
        orientation: "horizontal",
        range: "min",
        min: -3,
        max: 3,
        value: smoothingRadiusDifferences,
        step: 0.002,
        change: modValue,
        slide: modValue
    });


    //AMPLITUDE
    var modValue = function(){
        amplitude = $("#"+this.id).slider("value");
        updateRingGeometry = true;
    }
    amplitude = 0.4;
    $( "#slider_amplitude" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 0.8,
        value: amplitude,
        step: 0.002,
        change: modValue,
        slide: modValue
    });


    //ASYMMETRY
    var modValue = function(){
        temp = $("#"+this.id).slider("value");
        temp = 2- temp;
        ringAsymmetry[1] = temp;
        ringAsymmetry[2] = temp;
        ringAsymmetry[0] = 1;
        updateRingGeometry = true;
    }
    ringAsymmetry[0] = 1;
    ringAsymmetry[1] = 1;
    ringAsymmetry[2] = 1;

    $( "#slider_asymmetry" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 1,
        max: 2,
        value: ringAsymmetry[0],
        step: 0.002,
        change: modValue,
        slide: modValue
    });


    //WEDGE
    var modValue = function(){
        ringHeightSection[0] = $("#"+this.id).slider("value");
        temp = 2 - ringHeightSection[0];
        ringHeightSection[1] = temp;
        ringHeightSection[2] = temp;
        updateRingGeometry = true;
    }
    ringHeightSection[0] = 1;
    ringHeightSection[1] = 1;
    ringHeightSection[2] = 1;
    $( "#slider_wedge" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 1,
        max: 1.5,
        value: ringHeightSection[0],
        step: 0.002,
        change: modValue,
        slide: modValue
    });


    //ROTATION
    var modValue = function(){
        sectionRotation = $("#"+this.id).slider("value");
        updateRingGeometry = true;
    }
    sectionRotation = 0;
    $( "#slider_rotation" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 1,
        value: sectionRotation,
        step: 0.002,
        change: modValue,
        slide: modValue
    });


    //HEIGHT
    var modValue = function(){
        ringHeight = $("#"+this.id).slider("value");
        updateRingGeometry = true;
    }
    ringHeight = 180;
    $( "#slider_height" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 80,
        max: 220,
        value: ringHeight,
        step: 0.002,
        change: modValue,
        slide: modValue
    });


});
