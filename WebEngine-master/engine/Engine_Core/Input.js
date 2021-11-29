class Input {

    // Previous key state
    static _keyPreviousState = [];     // a new array
    // The pressed keys.
    static _isKeyPressed = [];
    // Click events: once an event is set, it will remain there until polled
    static _isKeyClicked = [];

    constructor()
    {
        for (let i = 0; i < Input.keys.LastKeyCode; i++)
        {
            Input._isKeyPressed[i] = false;
            Input._keyPreviousState[i] = false;
            Input._isKeyClicked[i] = false;
        }

        // register handlers
        window.addEventListener('keyup', this._onKeyUp);
        window.addEventListener('keydown', this._onKeyDown);
    }

    // Event handler functions
    _onKeyDown(event)
    {
        Input._isKeyPressed[event.keyCode] = true;
    }

    _onKeyUp(event)
    {
        Input._isKeyPressed[event.keyCode] = false;
    }

    /*
        This function updates the state of each key.
        Input: None.
        Output: None.
     */
    update()
    {
        for (let i = 0; i < Input.keys.LastKeyCode; i++) {
            Input._isKeyClicked[i] = (!Input._keyPreviousState[i]) && Input._isKeyPressed[i];
            Input._keyPreviousState[i] = Input._isKeyPressed[i];
        }
    }

    /*
        This function checks if the given key was pressed.
        Input: The key to check if pressed.
        Output: If the key is pressed or not.
     */
    isKeyPressed(keyCode)
    {
        return Input._isKeyPressed[keyCode];
    }

    /*
        This function checks if the given key was clicked.
        Input: The key to check if clicked.
        Output: If the key is clicked or not.
    */
    isKeyClicked(keyCode)
    {
        return Input._isKeyClicked[keyCode];
    }


    static keys = {
        // arrows
        Left: 37,
        Up: 38,
        Right: 39,
        Down: 40,

        // space bar
        Space: 32,

        // numbers
        Zero: 48,
        One: 49,
        Two: 50,
        Three: 51,
        Four: 52,
        Five : 53,
        Six : 54,
        Seven : 55,
        Eight : 56,
        Nine : 57,

        // Alphabets
        A : 65,
        D : 68,
        E : 69,
        F : 70,
        G : 71,
        I : 73,
        J : 74,
        K : 75,
        L : 76,
        R : 82,
        S : 83,
        W : 87,

        LastKeyCode: 222
    };

}
