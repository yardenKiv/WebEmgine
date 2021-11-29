class GameObject
{
    /**
    * Represents a GameObject
    * 
    * @constructor
    */
    constructor()
    {
        this.renderComponent = new Renderable();
        this.visible = true;
    }

    /**
    * make the game object a sprite one
    * 
    * @param textureName {String} The name of the texture.
    * 
    */
    setTexture(textureName)
    {
        this.renderComponent = new SpriteRenderable(textureName);
    }

    /**
    * Draw object if is visible
    * 
    * @param camera {Camera} the camera that is looking at the object.
    * 
    */
    draw(camera)
    {
        if(this.visible)
            this.renderComponent.draw(camera);
    }

    getVisibility() { return this.visible; };
    setVisibility(visibility) {this.visible = visibility; };
    getTransform() { return this.renderComponent.transform; };
    getRenderable() { return this.renderComponent; };
}