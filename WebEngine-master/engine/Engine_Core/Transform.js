
/**
    *Represent a position of an object 
    * 
    * @param {Camera} camera the camera that look at the object.
    * 
*/
class Transform
{
    constructor()
    {
        this.position = vec2.fromValues(0, 0);
        this.scale = vec2.fromValues(100 ,100);
        this.rotationInRad = 0.0;
    }

    getX() { return this.position[0]; }
    getY() { return this.position[1]; }

    getPosition() { return this.position; }
    setPosition(newPosition) { this.position = newPosition; }
    setPosition(newXPos, newYPos) {this.position[0] = newXPos; this.position[1] = newYPos};

    getScaleX() { return this.scale[0]; }
    getScaleY() { return this.scale[1]; }

    getScale() { return this.scale; }
    setScale(newScale) { this.scale = newScale; }

    getRotationInRad() { return this.rotationInRad; }
    setRotationInRad(newRotationInRad) { this.rotationInRad = newRotationInRad; }

    getRotationInDegree() { return this.rotationInRad / (Math.PI/180.0); }
    setRotationInDegree(newRotationInDegree) { this.rotationInRad = newRotationInDegree * Math.PI/180.0; }

    increaseX(value) { this.position[0] = this.position[0] + value; }
    increaseY(value) { this.position[1] = this.position[1] + value; }

    increaseRotationByRad(value) { this.rotationInRad = this.rotationIn + value; }
    increaseRotationByDegrees(value) { this.rotationInRad = this.rotationIn + (value * (Math.PI / 180.0)); }

    /**
    * Calculate the transform matrix
    * 
    * @returns {mat4} The transform matrix
    */
    getTransformMatrix() 
    {
        let matrix = mat4.create();

        mat4.translate(matrix, matrix, vec3.fromValues(this.position[0], this.position[1], 0.0));
        mat4.rotateZ(matrix, matrix, this.rotationInRad);
        mat4.scale(matrix, matrix, vec3.fromValues(this.scale[0], this.scale[1], 1.0));

        return matrix;
    }
    
}