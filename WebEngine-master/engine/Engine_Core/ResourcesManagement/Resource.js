class Resource
{
    /**
     * @constructor
     */
    constructor()
    {
        this._asset = null;
        this._refCount = 1;
    }

    /**
     * This function increases the reference count of the asset
     */
    incRefCount()
    {
        this._refCount++;
    }

    /**
     * This function decreases the reference count of the asset.
     */
    decRefCount()
    {
        this._refCount--;
    }

    getAsset()
    {
        return this._asset;
    }

    getRefCount()
    {
        return this._refCount;
    }

    setAsset(asset)
    {
        this._asset = asset;
    }

}