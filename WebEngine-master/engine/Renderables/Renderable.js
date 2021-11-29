class Renderable
{
     /**
    * Represents renderable object
    *
    * @constructor
    *
    */
    constructor()
    {
        
        this.shaders = DefaultResources.constColorShader;

        this.transform = new Transform();
        this.color = [1, 0, 1, 1];
        this.rigidBody = new RigitBody();

    }

    /**
    * Draw the renderable object
    * 
    * @param {Camera} camera the camera that look at the object.
    * 
    */
    draw(camera)
    {
        camera.setVpMatrix();
        this.shaders.activateShader(this.color, camera, this.transform.getTransformMatrix());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    setColor(color) { this.color = color; };
    getColor() { return this.color; };

    getTransform() { return this.transform; };
    setShader(shader) { this.shaders = shader; };
}


