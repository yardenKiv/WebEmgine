
var gl = null;

class EngineCore
{
    static resourceMap = new ResourceMap();
    static textures = new EngineTextures();

    /**
     * @constructor
     */
    constructor()
    {
        this._initializeWebGL();
        this.clearCanvas([0,1,0,1]);
        VertexBuffer.initVertexBuffer();
        
    }

    /**
     * This function creates a webGL instance and checks if it was created
     * @private
     */
    _initializeWebGL()
    {
        const canvasId = "GLCanvas";

        let canvas = document.getElementById(canvasId);

        // Get the standard or experimental webgl and binds to the Canvas area
        // store the results to the instance variable gl
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (gl === null)
        {
            document.write("<br><b>WebGL is not supported!</b>");
        }

        // Allows transperency with textures.
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable( gl.BLEND );

        // Set images to flip the y axis to match the texture coordinate space.
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    }

    /**
     * This function draws a given color over all the the drawn objects.
     * @param {Array} color - The color as an array in [r,g,b,a] format.
     */
    clearCanvas(color)
    {
        gl.clearColor(color[RGBA.RED], color[RGBA.GREEN], color[RGBA.BLUE], color[RGBA.ALPHA]);  // set the color to be cleared
        gl.clear(gl.COLOR_BUFFER_BIT);      // clear to the color previously set
    }


}