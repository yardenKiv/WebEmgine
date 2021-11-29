class RigitBody
{
    constructor()
    {
        this.velocity = vec2.fromValues(0, 0); 
        this.g = 10;
        this.m = 1;
    }

    addXForce(xForce){ this.velocity[0] = this.velocity[0] +  xForce};
    addYForce(yForce){ this.velocity[1] = this.velocity[1] +  yForce};

    setVelocity(newVelocity){this.velocity = newVelocity};
    setVelocity(xVelocity, yVelocity) {this.velocity[0] = xVelocity; this.velocity[1] = yVelocity};

    addForce(size, angle)
    {
        this.addXForce(Math.sin(angle) * size * this.m);
        this.addYForce(Math.cos(angle) * size * this.m);
    }

    setM(newM) {this.m = newM};
    getM() {return this.m};

    setG(newG) {this.g = newG};
    getG() {return this.g};

    updatePosByPhysics(transform)
    {
        console.log(this.velocity);
        transform.increaseX(this.velocity[0] * GameLoop.fixedTime);
        transform.increaseY(this.velocity[1] * GameLoop.fixedTime);
    }
       
}