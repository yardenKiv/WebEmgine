class EngineTextures
{
    constructor()
    {

    }

    /**
    * load the texture to the resource map.
    *
    * @param {String} textureName the name of the texture to load.
    * 
    */
    loadTexture(textureName)
    {
        
        if(!EngineCore.resourceMap.isAssetLoaded(textureName))
        {
            // Create new Texture object.
            var img = new Image(); 

            EngineCore.resourceMap.asyncLoadRequested(textureName);
            
            // load texture
            img.onload = function () {
                EngineTextures.processLoadedImage(textureName, img);
            };

            img.src = textureName;
        }
    }

     /**
    * pass the right arguments to webgl in order to draw the texture.
    *
    * @param {String} textureName the name of the texture to load
    * 
    */
    activateTexture(textureName) {

        var texInfo = EngineCore.resourceMap.retrieveAsset(textureName);

        // Binds our texture reference to the current webGL texture functionality
        gl.bindTexture(gl.TEXTURE_2D, texInfo.id);
   
        // To prevent texture wrappings
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        // Handles how magnification and minimization filters will work.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

        // For pixel-graphics where you want the texture to look "sharp"
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    };

    static processLoadedImage(textureName, image)
    {
        
        // Creates a WebGL texture object.
        var textureID = gl.createTexture();

        // bind texture with the current texture functionality in webGL.
        gl.bindTexture(gl.TEXTURE_2D, textureID);
        
        // if texture is not power of 2 make it one.
        if (!this.isPowerOf2(image.naturalWidth) || !this.isPowerOf2(image.naturalHeight)) {

            // Scale up the texture to the next highest power of two dimensions.
            var canvas = document.createElement("canvas");
            canvas.width = this.nextHighestPowerOfTwo(image.width);
            canvas.height = this.nextHighestPowerOfTwo(image.height);
            var ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, image.width, image.height);
            image = canvas;
        }

        // laod the image.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        // Creates a mipmap for this texture.
        gl.generateMipmap(gl.TEXTURE_2D);

        // Tells WebGL we are done manipulating data at the mGL.TEXTURE_2D target.
        gl.bindTexture(gl.TEXTURE_2D, null);

        // create the textureInfo for this texture.
        var texInfo = new TextureInfo(textureName, image.naturalWidth, image.naturalHeight, textureID);

        EngineCore.resourceMap.asyncLoadCompleted(textureName, texInfo);
    };

     /**
    * check if a number is a power of 2.
    *
    * @param {Number} value the number to check.
    * 
    */
    static isPowerOf2(value)
    {
        return (value & (value - 1)) == 0; 
    }

    /**
    * get the next power of 2 number.
    *
    * @param {Number} x the current number.
    * @return {Number} the next power of 2 number.
    * 
    */
    static nextHighestPowerOfTwo(x)
    {
        --x;
         for (var i = 1; i < 32; i <<= 1) {
            x = x | x >> i;
        }

        return x + 1;
    }

    /**
    * remove the texture from webgl and the resources map.
    *
    * @param {String} textureName the current number.
    * 
    */
    unloadTexture(textureName) {

        var texInfo = EngineCore.resourceMap.retrieveAsset(textureName);
        gl.deleteTexture(texInfo.id);
        EngineCore.resourceMap.unloadAsset(textureName);
    };
}