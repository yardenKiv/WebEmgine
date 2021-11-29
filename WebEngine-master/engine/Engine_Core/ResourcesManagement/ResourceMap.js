class ResourceMap
{
    /**
     * @constructor
     */
    constructor()
    {
        this._resourceMap = {};
        this._numOutstandingLoads = 0;
        this._loadCompleteCallback = null;
    }


    /**
     * This function puts a placeholder for the resource as it awaits loading.
     * @param {string} rName - The name of the resource.
     */
    asyncLoadRequested(rName)
    {
        this._resourceMap[rName] = new Resource();
        this._numOutstandingLoads++;
    }

    /*
        This function puts the loaded asset in the resource map.
        Input: The resource and the loaded asset.
        Output: None.
     */
    /**
     * This function puts the loaded asset in the resource map.
     * @param {string} rName - The name of the resource.
     * @param {*} loadedAsset - The resource data.
     */
    asyncLoadCompleted(rName, loadedAsset)
    {
        if (!this.isAssetLoaded(rName))
        {
            alert("gEngine.asyncLoadCompleted: [" + rName + "] not in map!");
        }
        this._resourceMap[rName].setAsset(loadedAsset);
        this._numOutstandingLoads--;
        this._checkForAllLoadCompleted();
    }

    /**
     * This function calls the callback function if all the resources finished loading.
     * @private
     */
    _checkForAllLoadCompleted()
    {
        if ((this._numOutstandingLoads === 0) && (this._loadCompleteCallback !== null)) // Checking if all resources finished loading.
        {
            let funcToCall = this._loadCompleteCallback;
            this._loadCompleteCallback = null;
            funcToCall();
        }
    }

    /**
     * This function sets the callback function.
     * @param newCB - The new callback function
     */
    setLoadCompleteCallback(newCB)
    {
        this._loadCompleteCallback = newCB;
        this._checkForAllLoadCompleted();
    }

    /**
     *
     * @param rName - The name of the resource.
     * @return {boolean} - if the resource is in the map or not
     */
    isAssetLoaded(rName)
    {
        return (rName in this._resourceMap);
    }


    /**
     * This function returns the resource if its loaded from the resource map.
     * @param rName - The name of the resource to retrieve.
     * @return {*} - The resource data.
     */
    retrieveAsset(rName)
    {
        let resource = null;
        if (this.isAssetLoaded(rName))
        {
            resource = this._resourceMap[rName].getAsset();
        }
        else
        {
            alert("gEngine.retrieveAsset: [" + rName + "] not in map!");
        }
        return resource;
    }

    /**
     * This function removes a resource from the resource map if the number of references it has reaches 0 else just decreases the reference count.
     * @param rName - The name of the resource to unload.
     * @return {number} - The remaining references.
     */
    unloadAsset(rName)
    {
        if (!this.isAssetLoaded(rName))
        {
            this._resourceMap[rName].decRefCount();

            if(this._resourceMap[rName].getRefCount() === 0)
            {
                delete (this._resourceMap[rName]);
            }
        }
        return this._resourceMap[rName].getRefCount();
    }


}