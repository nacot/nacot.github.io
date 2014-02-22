function SliderObject( tText, tValue, tStart, tEnd, tWidthTotal, tPosX, tPosY ){
    this.text = tText;
    this.value = tValue;
    this.valueStart = tStart;
    this.valueEnd = tEnd;
    this.widthTotal = tWidthTotal;
    this.posX = tPosX;
    this.posY = tPosY;
    this.leftEndX = this.posX - this.widthTotal/2;
    this.rightEndX = this.posX + this.widthTotal/2;
    this.temp;
    this.sliderHeight = 24;
    this.sliderPosRadius = 20;
    this.isManipulated = false;
    var r = this.sliderPosRadius;
    clickAreas[clickAreas.length] = new RectCoordinates(this.leftEndX, this.posY-r, this.rightEndX, this.posY+r);

    /*
    var sliderSprite = new THREE.Sprite( sliderMat );
    sliderSprite.position.set( this.posX, this.posY, 0 );
    sliderSprite.scale.set(canvasSpriteSlider.width, canvasSpriteSlider.height, 1 ); // imageWidth, imageHeight
    scene.add( sliderSprite );

    var dotSprite = new THREE.Sprite( sliderMat );
    dotSprite.position.set( this.posX, this.posY, 0 );
    dotSprite.scale.set(30, 30, 1 ); // imageWidth, imageHeight
    scene.add( dotSprite );
    */

    this.update = function() {
        this.temp = mapConstrained(this.value, this.valueStart, this.valueEnd, this.leftEndX, this.rightEndX);
        //dotSprite.position.x = this.temp;

        var r = this.sliderHeight/2;
        if (mousePressed  &&  !pMousePressed && testCoordinatesInside( mouseX, mouseY, this.leftEndX, this.posY-r, this.rightEndX, this.posY+r)) {
            this.isManipulated = true;
            //updateRingGeometry = true;
        }

        if( this.isManipulated && !mousePressed )  this.isManipulated = false;

        if ( this.isManipulated ) {
            this.value = mapConstrained( mouseX, this.leftEndX, this.rightEndX, this.valueStart, this.valueEnd);
            updateRingGeometry = true;
        }

        var colorBluePale = "rgba(109,186,203,1)";
        context2d.setTransform(1,0,0,1,0,0);
        context2d.fillStyle = colorWhite;
        //context2d.fillRect( this.temp-5, this.posY-this.sliderHeight/2-5, 10, this.sliderHeight+10);

        context2d.translate(this.posX,this.posY);
        context2d.fillStyle=colorBluePale;
        context2d.fillRect(-this.widthTotal/2, -this.sliderHeight/2, this.widthTotal, this.sliderHeight);

        context2d.setTransform(1,0,0,1,0,0);
        //context2d.fillStyle = "rgba(255,255,255,0.3)";
        context2d.fillStyle = colorLogoGreenBottom;
        context2d.translate( this.leftEndX, this.posY-this.sliderHeight/2 );
        context2d.fillRect( 0, 0, this.temp-(this.posX-this.widthTotal/2), this.sliderHeight);

        context2d.setTransform(1,0,0,1,0,0);
        context2d.font="16px Arial";
        context2d.textAlign="center";
        context2d.fillStyle=colorWhite;
        context2d.fillText(this.text,this.posX,this.posY+6);
        context2d.setTransform(1,0,0,1,0,0);

        return this.value;
    }

}