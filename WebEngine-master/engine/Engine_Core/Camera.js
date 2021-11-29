class Camera
{

    /**
    * Represents a camera
    *
    * @constructor
    * @param {vec2} center the center of the camera.
    * @param {number} height the height of the camera.
    * @param {number} width the width of the camera.
    */
    constructor(center, width, height)
    {
        this.center = center;
        this.height = height;
        this.width = width;

        // transformation matrices
        this.mViewMatrix = mat4.create();
        this.mProjMatrix = mat4.create();
        this.mVPMatrix = mat4.create();

        // background color
        this.mBgColor = [0.8, 0.8, 0.8, 1];
    }
    setColor(color){this.mBgColor = color;}

    setCenter(center) {this.center = center;}
    getCenter() {return this.center}

    setWidth(width) {this.width = width;}
    getWidth() {return this.width}

    setHeight(height) {this.height = height;}
    getHeight() {return this.height}

    getVpMatrix() {return this.mVPMatrix}

    setVpMatrix()
    {
        gl.clearColor(this.mBgColor[RGBA.RED], this.mBgColor[RGBA.GREEN], this.mBgColor[RGBA.BLUE], this.mBgColor[RGBA.ALPHA]);  // set the color to be cleared
        // Step A4: enable the scissor area, clear, and then disable the scissor area
        gl.enable(gl.SCISSOR_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);

        mat4.lookAt(this.mViewMatrix,
            [this.center[0], this.center[1], 10],
            [this.center[0], this.center[1], 0],
                [0, 1, 0]);

        let halfWidth = 0.5 * this.width ;
        let halfHeight = 0.5 * this.height;

        mat4.ortho(this.mProjMatrix,
            -halfWidth,   // distance to left of WC
             halfWidth,   // distance to right of WC
            -halfHeight,  // distance to bottom of WC
             halfHeight,  // distance to top of WC
             0,   // z-distance to near plane 
             1000  // z-distance to far plane 
        );

        mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);
    }



    
}