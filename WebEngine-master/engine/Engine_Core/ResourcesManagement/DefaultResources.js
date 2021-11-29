class DefaultResources
{

    static constColorShader = null; // constant color shader: SimpleVS, and SimpleFS
    static spriteShader = null;

    static textureVS = "ShadersSource/TextureVS.glsl";
    static textureFS = "ShadersSource/TextureFS.glsl";

    static simpleVS = "ShadersSource/SimpleVS.glsl";
    static simpleFS = "ShadersSource/SimpleFS.glsl";

    /**
     * @constructor
     * @param {function} callBackFunction - The function that is called after the ctor finishes his work.
     */
    constructor(callBackFunction)
    {
        
        EngineCore.textures.loadTexture("minion_collector.png");
        EngineCore.textures.loadTexture("minion_sprite.png");
        TextFileLoader.loadTextFile(DefaultResources.simpleVS, TextFileLoader.textFileType.eTextFile);
        TextFileLoader.loadTextFile(DefaultResources.simpleFS, TextFileLoader.textFileType.eTextFile);
        TextFileLoader.loadTextFile(DefaultResources.textureVS, TextFileLoader.textFileType.eTextFile);
        TextFileLoader.loadTextFile(DefaultResources.textureFS, TextFileLoader.textFileType.eTextFile);

        EngineCore.resourceMap.setLoadCompleteCallback(function () { DefaultResources.createShaders(callBackFunction); });
    }


    /**
     *  This function creates the shaders
     * @param {function} callBackFunction - callback function to call after the shaders are created.
     * 
     */
    static createShaders (callBackFunction)
    {
        DefaultResources.constColorShader = new Shaders(DefaultResources.simpleVS, DefaultResources.simpleFS);
        DefaultResources.spriteShader = new SpriteShaders(DefaultResources.textureVS, DefaultResources.textureFS);

        callBackFunction();// callback function after loadings are done
    }

    

}
