
const RGBA = {
    RED: 0,
    GREEN: 1,
    BLUE: 2,
    ALPHA: 3
};



class Engine
{
    static core =  null;
    static defaultResources = null;
    static input = new Input();

    constructor(game)
    {
        Engine.core = new EngineCore();
        Engine.defaultResources = new DefaultResources(function() {Engine.startScene(game);});
        AudioClips.initAudioContext();

    }

    static startScene (myGame)
    {
        GameLoop.start(myGame);  // call initialize() only after async
    }
}

