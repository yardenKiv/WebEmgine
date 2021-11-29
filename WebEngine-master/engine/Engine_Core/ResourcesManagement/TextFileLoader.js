class TextFileLoader
{
    static textFileType = Object.freeze({
        eXMLFile: 0,
        eTextFile: 1
    });


    /**
     *  This function creates a http request that loads the text files to the resource map.
     * @param {string} fileName - The path to the file to load
     * @param {textFileType} fileType - text or xml
     * @param {function} callbackFunction - callback function to run after the load is complete
     */
    static loadTextFile(fileName, fileType, callbackFunction)
    {
        if (!(EngineCore.resourceMap.isAssetLoaded(fileName))) // Checking if file is waiting to be loaded
        {
            // Update resources in load counter.
            EngineCore.resourceMap.asyncLoadRequested(fileName);
            /* Asynchronously request the data from server. */
            let req = new XMLHttpRequest();
            req.onreadystatechange = function ()
            {
                if ((req.readyState === 4) && (req.status !== 200))
                {
                    alert(fileName + ": loading failed! [Hint: you cannot double click index.html to run this project. " +
                        "The index.html file must be loaded by a web-server.]");
                }
            };
            req.open('GET', fileName, true);
            req.setRequestHeader('Content-Type', 'text/xml');

            req.onload = function ()
            {
                let fileContent;
                if (fileType === TextFileLoader.textFileType.eXMLFile)
                {
                    let parser = new DOMParser();
                    fileContent = parser.parseFromString(req.responseText, "text/xml");
                }
                else
                {
                    fileContent = req.responseText;
                }
                EngineCore.resourceMap.asyncLoadCompleted(fileName, fileContent);
                if ((callbackFunction !== null) && (callbackFunction !== undefined))
                {
                    callbackFunction(fileName);
                }
            };
            req.send();
        }
        else
        {
            if ((callbackFunction !== null) && (callbackFunction !== undefined))
            {
                callbackFunction(fileName);
            }
        }
    }

    /**
     * This function removes the text file from the resource map.
     * @param fileName - The path to the file to unload
     */
    static unloadTextFile (fileName)
    {
        Engine.resourceMap.unloadAsset(fileName);
    }

}