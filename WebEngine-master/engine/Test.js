class Test
{
    constructor()
    {
        this._camera = null;
        this._drawable = null;
        this._animation = null;
        this._animation_color = [];
        this._drawable_two = null;
        this._shape = null;
        this._bgSound = "song.mp3";
    }

    initialize()
    {

        this._camera = new Camera(vec2.fromValues(0, 0), 640, 480);
        AudioClips.loadAudio(this._bgSound);
        this._animation = new AnimetionRenderable("minion_sprite.png");
        this._animation.setColor([1, 1, 1, 0]);
        this._animation.setSpriteSequence(512, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
            204, 164,       // widthxheight in pixels
            5,              // number of elements in this sequence
            0);
        this._animation.setAnimationType(animationType.AnimateRight);
        this._animation.setAnimationSpeed(1);
        this._animation_color = this._animation.getColor();
        

    }

    draw()
    {
        this._animation.draw(this._camera);
    }

    update()
    {
        let x_form = this._animation.getTransform();
        this._animation.rigidBody.addForce(10, 45);

        this._animation.rigidBody.updatePosByPhysics(x_form);
        this._animation.updateAnimation();
        
        if(Engine.input.isKeyPressed(Input.keys.Right))
        {
            this._animation.setColor(this._animation_color);
            if(x_form.getX() !== 320)
            {
                x_form.increaseX(2);
            }
        }

        if(Engine.input.isKeyPressed(Input.keys.Left))
        {
            this._animation.setColor([1,0,0,1]);
            if(x_form.getX() !== -320)
            {
                x_form.increaseX(-2);
            }
        }

        if(Engine.input.isKeyPressed(Input.keys.Up))
        {
            if(x_form.getY() !== 240)
            {
                x_form.increaseY(2);
            }

        }

        if(Engine.input.isKeyPressed(Input.keys.Down))
        {
            if(x_form.getY() !== -240)
            {
                x_form.increaseY(-2);
            }
        }

        if(Engine.input.isKeyPressed(Input.keys.One))
        {
            this._animation.setAnimationSpeed(this._animation.getAnimationSpeed() + 0.01)
        }

        if(Engine.input.isKeyPressed(Input.keys.Two))
        {
            this._animation.setAnimationSpeed(this._animation.getAnimationSpeed() - 0.01)
        }

        if (Engine.input.isKeyPressed(Input.keys.Space))
        {
            if(AudioClips.isBackgroundAudioPlaying())
            {
                AudioClips.stopBackgroundAudio();
            }
            else
            {
                AudioClips.playBackgroundAudio(this._bgSound);
            }
        }

        if(Engine.input.isKeyPressed(Input.keys.R))
        {
            x_form.setRotationInDegree(x_form.getRotationInDegree() + 1);
        }


    }


}