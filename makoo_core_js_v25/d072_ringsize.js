var ringsizeStandardSelector = document.getElementById("ringsize_standard_selector");
var ringsizeSelector = document.getElementById("ringsize_selector");
var selectedStandard = "mm";
var ringSizeInternational = new Array();
var britishSizes = new Array();


for( var i=0; i<30; i++){
    britishSizes[i] = new Object();
    britishSizes[i].abc = "DEFAULT";
    britishSizes[i].mm = 0;
}
britishSizes[0].abc = "A";  britishSizes[0].mm = 37.8;
britishSizes[1].abc = "B";  britishSizes[1].mm = 39.1;
britishSizes[2].abc = "C";  britishSizes[2].mm = 40.4;
britishSizes[3].abc = "D";  britishSizes[3].mm = 41.7;
britishSizes[4].abc = "E";  britishSizes[4].mm = 42.9;
britishSizes[5].abc = "F";  britishSizes[5].mm = 44.2;
britishSizes[6].abc = "G";  britishSizes[6].mm = 45.5;
britishSizes[7].abc = "H";  britishSizes[7].mm = 46.8;
britishSizes[8].abc = "I";  britishSizes[8].mm = 48.0;
britishSizes[9].abc = "J";  britishSizes[9].mm = 48.7;
britishSizes[10].abc = "K";  britishSizes[10].mm = 50.0;
britishSizes[11].abc = "L";  britishSizes[11].mm = 51.2;
britishSizes[12].abc = "M";  britishSizes[12].mm = 52.5;
britishSizes[13].abc = "N";  britishSizes[13].mm = 53.8;
britishSizes[14].abc = "O";  britishSizes[14].mm = 55.1;
britishSizes[15].abc = "P";  britishSizes[15].mm = 56.3;
britishSizes[16].abc = "Q";  britishSizes[16].mm = 57.6;
britishSizes[17].abc = "R";  britishSizes[17].mm = 58.9;
britishSizes[18].abc = "S";  britishSizes[18].mm = 60.2;
britishSizes[19].abc = "T";  britishSizes[19].mm = 61.4;
britishSizes[20].abc = "U";  britishSizes[20].mm = 62.7;
britishSizes[21].abc = "V";  britishSizes[21].mm = 64.0;
britishSizes[22].abc = "W";  britishSizes[22].mm = 65.3;
britishSizes[23].abc = "X";  britishSizes[23].mm = 66.6;
britishSizes[24].abc = "Y";  britishSizes[24].mm = 67.8;
britishSizes[25].abc = "Z";  britishSizes[25].mm = 68.5;
britishSizes[26].abc = "Z1";  britishSizes[25].mm = 70.4;
britishSizes[27].abc = "Z2";  britishSizes[25].mm = 71.7;
britishSizes[28].abc = "Z3";  britishSizes[25].mm = 72.3;
britishSizes[29].abc = "Z4";  britishSizes[25].mm = 73.6;


clog(britishSizes);

function sizeConverter(mm){
    ringSizeInternational["mm"] = mm;
    ringSizeInternational["it"] = parseInt( (mm*Math.PI)-40 );
    ringSizeInternational["us"] = parseInt( (mm-11.63)/0.8128 );
    ringSizeInternational["uk"] = "NONE";
    for(var i=0; i<britishSizes.length; i++){
        if( mm*Math.PI > britishSizes[i].mm ){
            ringSizeInternational["uk"] = britishSizes[i].abc;
        }
    }
    return ringSizeInternational[selectedStandard];
}

function changeSelectedStandard(value){
    selectedStandard = value;
    //selectedStandard = ringsizeStandardSelector.options[ ringsizeStandardSelector.selectedIndex ].value;
    ringsizeSelector.innerHTML = "";
    switch (selectedStandard){
        case "mm":
            for(var i=16; i<26; i++){
                var o = document.createElement("option");
                o.value = i;
                o.innerHTML = i;
                ringsizeSelector.appendChild(o);
            }
            break;

        case "us":
            for(var i=5; i<17; i++){
                var o = document.createElement("option");
                o.value = 11.63 + i*0.8128;
                o.innerHTML = i;
                ringsizeSelector.appendChild(o);
            }
            break;

        case "uk":
            for(var i=10; i<26; i++){
                var o = document.createElement("option");
                o.value = britishSizes[i].mm/Math.PI;
                o.innerHTML = britishSizes[i].abc;
                ringsizeSelector.appendChild(o);
            }
            break;

        case "it":
            for(var i=13; i<38; i++){
                var o = document.createElement("option");
                o.value = (i+40)/Math.PI;
                o.innerHTML = i;
                ringsizeSelector.appendChild(o);
            }
            break;
    }

    updateRingGeometry = true;
    changeSelectedSize();
}
changeSelectedStandard("it");

function changeSelectedSize(){
    temp = ringsizeSelector.options[ ringsizeSelector.selectedIndex ].value;
    //sliderRingSize.value = parseInt(temp*10)/10;
    temp = parseInt(temp*10)/10
    exportRingSize = temp;
    //ringSizeFeedback.innerHTML = "(" + temp + " mm)";
    updateRingGeometry = true;
}
