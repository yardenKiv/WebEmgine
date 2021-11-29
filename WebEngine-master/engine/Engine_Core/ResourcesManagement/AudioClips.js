
class AudioClips
{
    static audioContext = null;
    static bgAudioNode = null;

    /**
     *  This function initializes the audio webkit.
     */
    static initAudioContext()
    {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            AudioClips.audioContext = new AudioContext();
        } catch (e) {alert("Web Audio Is not supported."); }
    };

    /**
     * This function loads an audio clip to the resource map
     * @param {string} clipName - The path to the clip file
     */
    static loadAudio(clipName)
    {
        if (!(EngineCore.resourceMap.isAssetLoaded(clipName)))
        {
            // Update resources in load counter.
            EngineCore.resourceMap.asyncLoadRequested(clipName);

            // Asynchronously request the data from server.
            let req = new XMLHttpRequest();
            req.onreadystatechange = function ()
            {
                if ((req.readyState === 4) && (req.status !== 200))
                {
                    alert(clipName + ": loading failed! [Hint: you cannot double click index.html to run this project. " +
                        "The index.html file must be loaded by a web-server.]");
                }
            };
            req.open('GET', clipName, true);
            // Specify that the request retrieves binary data.
            req.responseType = 'arraybuffer';

            req.onload = function ()
            {
                // Asynchronously decode, then call the function in parameter.
                AudioClips.audioContext.decodeAudioData(req.response, function (buffer) {
                    EngineCore.resourceMap.asyncLoadCompleted(clipName, buffer);
                });
            };
            req.send();
        }
        else
        {
            EngineCore.resourceMap[clipName].incRefCount();
        }
    }

    /**
     * This function removes the given audio clip from the resource map.
     * @param {string} clipName - The path to the clip
     */
    static unloadAudio (clipName)
    {
        EngineCore.resourceMap.unloadAsset(clipName);
    }

    /**
     * This function plays the given audio clip on time.
     * @param {string} clipName - The path to the clip
     */
    static playACue(clipName)
    {
        let clipInfo = EngineCore.resourceMap.retrieveAsset(clipName);
        if (clipInfo !== null)
        {
            // SourceNodes are one use only.
            let sourceNode = AudioClips.audioContext.createBufferSource();
            sourceNode.buffer = clipInfo;
            sourceNode.connect(AudioClips.audioContext.destination);
            sourceNode.start(0);
        }
    };


    /**
     * This function starts playing the audio in the background.
     * @param {string} clipName - The path to the clip
     */
    static playBackgroundAudio(clipName)
    {
        let clipInfo = EngineCore.resourceMap.retrieveAsset(clipName);
        if (clipInfo !== null)
        {
            // Stop audio if playing.
            AudioClips.stopBackgroundAudio();

            AudioClips.bgAudioNode  = AudioClips.audioContext.createBufferSource();
            AudioClips.bgAudioNode.buffer = clipInfo;
            AudioClips.bgAudioNode.connect(AudioClips.audioContext.destination);
            AudioClips.bgAudioNode.loop = true;
            AudioClips.bgAudioNode.start(0);
        }
    }


    /**
     * This function stops the audio in the background if its playing.
     */
    static stopBackgroundAudio()
    {
        // Check if the audio is  playing.
        if (AudioClips.isBackgroundAudioPlaying())
        {
            AudioClips.bgAudioNode.stop(0);
            AudioClips.bgAudioNode = null;
        }
    }

    /**
     * This function checks if the background audio is playing.
     * @return {boolean} - audio is playing or not.
     */
    static isBackgroundAudioPlaying ()
    {
        return (AudioClips.bgAudioNode !== null);
    }
}