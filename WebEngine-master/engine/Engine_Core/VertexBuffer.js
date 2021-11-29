class VertexBuffer
{
    static SquareVertexBuffer;
    static textureCordBuffer;

    /**
     * This function initializes the vertex buffer and creates a texture buffer and vertex buffer.
     */
    static initVertexBuffer()
    {
        const verticesOfSquare = [
                                0.5, 0.5, 0.0,
                                -0.5, 0.5, 0.0,
                                0.5, -0.5, 0.0,
                                -0.5, -0.5, 0.0]

        const textureCoordinates = [
                                1.0, 1.0,
                                0.0, 1.0,
                                1.0, 0.0,
                                0.0, 0.0];
           
        // vertex buffer 
        VertexBuffer.SquareVertexBuffer = gl.createBuffer();
        
        gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer.SquareVertexBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);

        // texture buffer
        VertexBuffer.textureCordBuffer = gl.createBuffer();
        
        gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer.textureCordBuffer);
 
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    }

    
}