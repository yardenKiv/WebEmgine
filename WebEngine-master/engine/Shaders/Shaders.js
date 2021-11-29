class Shaders
{

    /**
    * Represents a program (2 shaders)
    *
    * @constructor
    * @param {String} vertexShader the path to the vertex shader.
    * @param {String} fragmentShader the path to the fragment shader.
    */
    constructor(vertexShader, fragmentShader)
    {

        // compile the shaders
        let vertex = this.compileShader(vertexShader, gl.VERTEX_SHADER); 
        let fragment = this.compileShader(fragmentShader, gl.FRAGMENT_SHADER); 

        // link the shaders into a program.
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertex);
        gl.attachShader(this.program, fragment);
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            alert("Error linking shader");
            return null;
        }

        // gets a references to attributes and uniforms
        this.vertexPositionAttribute = gl.getAttribLocation(this.program, "aSquareVertexPosition");
        this.pixelColor = gl.getUniformLocation(this.program, "uPixelColor");
        this.transform = gl.getUniformLocation(this.program, "uModelTransform");
        this.viewProjTransform = gl.getUniformLocation(this.program, "uViewProjTransform");
 
        // activates the vertex buffer loaded in EngineCore_VertexBuffer.js
        gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer.SquareVertexBuffer);
 
        // describe the characteristic of the vertex position attribute
        gl.vertexAttribPointer(this.vertexPositionAttribute,
            3,              // each element is a 3-float (x,y.z)
            gl.FLOAT,       // data type is FLOAT
            false,          // if the content is normalized vectors
            0,              // number of bytes to skip in between elements
            0);             // offsets to the first element
        
    }

    /**
    * Pass values to the program
    *
    * @param {Array<Number>} color the color of the object.
    * @param {Camera} camera the camera that look at the object.
    * @param {mat4} modelTransform the transform matrix of the object.
    */
    activateShader(color, camera, modelTransform)
    {
        gl.useProgram(this.program);

        gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer.SquareVertexBuffer);

        gl.vertexAttribPointer(this.vertexPositionAttribute,
            3,              // each element is a 3-float (x,y.z)
            gl.FLOAT,       // data type is FLOAT
            false,          // if the content is normalized vectors
            0,              // number of bytes to skip in between elements
            0);             // offsets to the first element
        


        gl.enableVertexAttribArray(this.vertexPositionAttribute);
        gl.uniform4fv(this.pixelColor, color);
        gl.uniformMatrix4fv(this.viewProjTransform, false, camera.getVpMatrix());
        gl.uniformMatrix4fv(this.transform, false, modelTransform);
    }

    /**
    * Compile shader
    *
    * @param {String} filePath the path to the shader file.
    * @param {gl.SHADER} shaderType the type of the shader gl.VERTEX_SHADER / gl.FRAGMENT_SHADER.
    */
    compileShader(filePath, shaderType)
    {
        console.log("c" + filePath);
        let shaderSource = EngineCore.resourceMap.retrieveAsset(filePath);
 
        // create the shader based on the shader type: vertex or fragment
        let compiledShader = gl.createShader(shaderType);
    
        // compile the created shader
        gl.shaderSource(compiledShader, shaderSource);
        gl.compileShader(compiledShader);
   
        // check for errors
        if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
            alert("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
        }
    
        return compiledShader;
    }


}