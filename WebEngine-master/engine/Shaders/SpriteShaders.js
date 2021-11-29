class SpriteShaders extends Shaders
{

    /**
    *  Represents a shaders for sprite
    *
    * @param {String} vertexShader the path to the shader file.
    * @param {String} fragmentShader the type of the shader gl.VERTEX_SHADER / gl.FRAGMENT_SHADER.
    * 
    */

    constructor(vertexShader, fragmentShader)
    {
        super(vertexShader, fragmentShader);

        this.shaderTextureCoordAttribute = gl.getAttribLocation(this.program, "aTextureCoordinate");

        const initTexCoord = [
            1.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 0.0
            ];

        this.texCoordBuffer = gl.createBuffer();
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initTexCoord), gl.DYNAMIC_DRAW);
    }


    activateShader(color, camera, modelTransform)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.vertexAttribPointer(this.shaderTextureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.shaderTextureCoordAttribute);

        super.activateShader(color, camera, modelTransform);
    }

    setTextureCoordinate(texCord)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(texCord));
    }
}