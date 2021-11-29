const kFPS = 60;          // Frames per second
const kMPF = 1000 / kFPS; // Milliseconds per frame.

class GameLoop
{
    static _isLoopRunning = false;
    static _game;
    static _lagTime = 0.0;
    static _prevTime = Date.now();
    static fixedTime = 0;


    static _runLoop ()
    {
        if (GameLoop._isLoopRunning) {
            // Step A: set up for next call to _runLoop and update input!
            requestAnimationFrame(function () { GameLoop._runLoop.call(GameLoop._game); });

            // Step B: compute how much time has elapsed since we last RunLoop was executed
            let currentTime = Date.now();
            let elapsedTime = currentTime - GameLoop._prevTime;
            GameLoop.fixedTime = elapsedTime / 1000;
            GameLoop._prevTime = currentTime;
            GameLoop._lagTime += elapsedTime;


            // Step C: Make sure we update the game the appropriate number of times.
            //      Update only every Milliseconds per frame.
            //      If lag larger then update frames, update until caught up.
            while ((GameLoop._lagTime >= kMPF) && GameLoop._isLoopRunning)
            {
                Engine.input.update();
                GameLoop._game.update();      // call MyGame.update()
                GameLoop._lagTime -= kMPF;
            }



            // Step D: now let's draw
            GameLoop._game.draw();    // Call MyGame.draw()
        }
        else {
            //If the stop() was called the scene needs to be unloaded.
            //GameLoop._game.unloadScene();
        }
    }

    static _startLoop()
    {
        GameLoop._prevTime = Date.now();
        GameLoop._lagTime = 0.0;

        GameLoop._isLoopRunning = true;

        requestAnimationFrame(function () { GameLoop._runLoop.call(GameLoop._game); });
    }

    static start(game)
    {
        GameLoop._game = game;
        EngineCore.resourceMap.setLoadCompleteCallback(
            function () {
                game.initialize();
                GameLoop._startLoop();
            }
        );
    }

    static stop()
    {
        GameLoop._isLoopRunning = false;
    }



}