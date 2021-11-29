const texCoordArray = {
    Left: 2,
    Right: 0,
    Top: 1,
    Bot: 5
}

class SpriteRenderable extends Renderable 
{
    /**
    * Represent a spriteRenderable
    * 
    * @param {String} myTexture the name of the texture.
    * 
    */
    constructor(myTexture)
    {

        super();
        super.setColor([1, 1, 1, 0]);
        super.setShader(DefaultResources.spriteShader);
        this.texture = myTexture;

        this.textureInfo = null;
        this.colorArray = null;

        // defined for subclass to override
        this.texWidth = 0;
        this.texHeight = 0;
        this.texLeftIndex = 0;
        this.texBottomIndex = 0;
        this.setTexture(this.texture);

        this.texLeft = 0.0; // bounds of texture coord (0 is left, 1 is right)
        this.texRight = 1.0; //
        this.texTop = 1.0; // 1 is top and 0 is bottom of image
        this.texBottom = 0.0; //
    }
    
    /**
    * Set the data of the texture
    * 
    * @param {String} newTexture the name of the texture.
    * 
    */
    setTexture(newTexture)
    {
        this.texture = newTexture;
        this.textureInfo = EngineCore.resourceMap.retrieveAsset(newTexture);
        this.colorArray = null;
        this.texWidth = this.textureInfo.width;
        this.texHeight = this.textureInfo.height;
        this.texLeftIndex = 0;
        this.texBottomIndex = 0;
    }


    /**
    * Set the UV coordinats of the texture
    * 
    * @param {int} left the left value of the texture.
    * @param {int} right the right value of the texture.
    * @param {int} bottom the bottom value of the texture.
    * @param {int} top the top value of the texture.
    * 
    */
    setElementUVCoordinate(left, right, bot, top)
    {
        this.texLeft = left;
        this.texRight = right;
        this.texBottom = bot;
        this.texTop = top;
    }

    /**
    * Set the UV coordinats of the texture by pixels
    * 
    * @param {int} left the left value of the texture.
    * @param {int} right the right value of the texture.
    * @param {int} bottom the bottom value of the texture.
    * @param {int} top the top value of the texture.
    * 
    */
    setElementPixelPositions(left, right, bottom, top)
    {
        let texInfo = EngineCore.resourceMap.retrieveAsset(this.texture);
        let imageW = texInfo.width;
        let imageH = texInfo.height;
     
        this.texLeft = left / imageW;
        this.texRight = right / imageW;
        this.texBottom = bottom / imageH;
        this.texTop = top / imageH;
    }

    /**
    * 
    * Get the UV coordinate's of the texture
    * 
    */
    getElementUVCoordinateArray()
    {
        return [
            this.texRight, this.texTop,
            this.texLeft, this.texTop,
            this.texRight, this.texBottom,
            this.texLeft, this.texBottom
            ];  
    }

     /**
    * draw the sprite
    * 
    * @param {Camera} camera the camera that look at the object.
    * 
    */
    draw(camera)
    {
        this.shaders.setTextureCoordinate(this.getElementUVCoordinateArray());
        EngineCore.textures.activateTexture(this.texture);
        super.draw(camera);
    }



    getAnimationType()
    {
        return this._animationType;
    }

    setAnimationType(animationType)
    {
        this._animationType = animationType;
    }

    getAnimationSpeed()
    {
        return this._animationSpeed;
    }

    setAnimationSpeed(speed)
    {
        this._animationSpeed = speed;
    }

    
    

}