const animationType = {
    AnimateRight: 0, // Animate from left to right, then restart to left
    AnimateLeft: 1, // Animate from right to left, then restart to right
    AnimateSwing: 2 // Animate first left to right, then animates backwards
}


class AnimetionRenderable extends SpriteRenderable
{

    /**
    * Represent a AnimetionRenderable
    * 
    * @param {String} myTexture the name of the texture.
    * 
    */
    constructor(myTexture)
    {

        super(myTexture);

        this.firstElmLeft = 0.0; // 0.0 is left corner of image
        this.elmTop = 1.0; // 1.0 is top corner of image
        this.elmWidth = 1.0; // default sprite element size is the entire image
        this.elmHeight = 1.0;
        this.widthPadding = 0.0;
        this.numElems = 1; // number of elements in an animation

        this._animationType = animationType.AnimateRight; // animation type
        this._animationSpeed = 1; // animation speed

        // current animation state data
        this.currentAnimAdvance = -1;
        this.currentElm = 0;

        this.initAnimations();

    }


    /**
    * init the animetions for the object
    * 
    */
    initAnimations()
    {
        // Currently running animation
        this.currentTick = 0;
        switch (this._animationType)
        {
            case animationType.AnimateRight:
                this.currentElm = 0;
                this.currentAnimAdvance = 1; 
            break;
  
            case animationType.AnimateSwing:
                this.currentAnimAdvance = -1 * this.currentAnimAdvance;
                this.currentElm += 2 * this.currentAnimAdvance;
            break;

            case animationType.AnimateLeft:
                this.currentElm = this.numElems - 1;
                this.currentAnimAdvance = -1; 
            break;    
        }

        this.setSpriteElement();
    }

    /**
    * Set the UV coordinate of the current element
    * 
    */
    setSpriteElement()
    {
        let left = this.firstElmLeft + (this.currentElm * (this.elmWidth + this.widthPadding));
        super.setElementUVCoordinate.call(this, left, left + this.elmWidth, this.elmTop - this.elmHeight, this.elmTop);
    }

    /**
    * Set the data of the animetions
    * 
    * @param {int} topPixel the top pixel of the texture
    * @param {int} rightPixel the right pixel of the texture
    * @param {int} elmWidthInPixel the width pixel of the texture
    * @param {int} elmHeightInPixel the height pixel of the texture
    * @param {int} numElements the number of objects ib the sprite sheet
    * @param {float} widthPadding the distance between eatch object
    * 
    */
    setSpriteSequence(topPixel, rightPixel, elmWidthInPixel, elmHeightInPixel, numElements, wPaddingInPixel)
    {
        let texInfo = EngineCore.resourceMap.retrieveAsset(this.texture);
  
        let imageW = texInfo.width;
        let imageH = texInfo.height;

        this.numElems = numElements; 
        this.firstElmLeft = rightPixel / imageW;
        this.elmTop = topPixel / imageH;
        this.elmWidth = elmWidthInPixel / imageW;
        this.elmHeight = elmHeightInPixel / imageH;
        this.widthPadding = wPaddingInPixel / imageW;
    }

    /**
    * Change the animetions to the next one 
    */
    updateAnimation()
    {
        this.currentTick++;

        if (this.currentTick >= this._animationSpeed)
        {

            this.currentTick = 0;
            this.currentElm += this.currentAnimAdvance;

            if ((this.currentElm >= 0) && (this.currentElm < this.numElems))
                this.setSpriteElement();
            else
                this.initAnimations();
        }
  }

  



}