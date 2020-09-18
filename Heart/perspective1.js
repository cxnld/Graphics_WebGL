

var canvas;
var gl;

var w = 0.1;
var x1 = 0.2;
var x2 = 0.5;
var x3 = 0.7;
var y1 = -0.75;
var y2 = 0.4-0.2;
var y3 = 0.7-0.2;

var heartvertices = [
    vec4( 0.0, y1, w, 1.0 ), // 0
    vec4( 0-x3, y2, w, 1.0 ), // 1
    vec4( 0-x2, y3, w, 1.0 ), // 2
    vec4( 0-x1, y3, w, 1.0 ), // 3
    vec4( 0.0, y2, w, 1.0 ), // 4
    vec4(  x1, y3, w, 1.0 ), // 5
    vec4(  x2, y3, w, 1.0 ), // 6
    vec4(  x3, y2, w, 1.0 ), // 7

    vec4( 0.0, y1, 0-w, 1.0 ), // 8
    vec4( 0-x3, y2, 0-w, 1.0 ), // 9
    vec4( 0-x2, y3, 0-w, 1.0 ), // 10
    vec4( 0-x1, y3, 0-w, 1.0 ), // 11
    vec4( 0.0, y2, 0-w, 1.0 ), // 12
    vec4(  x1, y3, 0-w, 1.0 ), // 13
    vec4(  x2, y3, 0-w, 1.0 ), // 14
    vec4(  x3, y2, 0-w, 1.0 ) // 15
];

var qq = 1.0;
var basevertices = [
    vec4( -1.0*qq, -1.0,  1.0*qq, 1.0 ),
    vec4( -1.0*qq, -0.95,  1.0*qq, 1.0 ),
    vec4(  1.0*qq, -0.95,  1.0*qq, 1.0 ),
    vec4(  1.0*qq, -1.0,  1.0*qq, 1.0 ),
    vec4( -1.0*qq, -1.0, -1.0*qq, 1.0 ),
    vec4( -1.0*qq, -0.95, -1.0*qq, 1.0 ),
    vec4(  1.0*qq, -0.95, -1.0*qq, 1.0 ),
    vec4(  1.0*qq, -1.0, -1.0*qq, 1.0 )
];

var h = 1.95;

var basevertices2 = [
    vec4( -1.0*qq, -1.0+h,  1.0*qq, 1.0 ),
    vec4( -1.0*qq, -0.95+h,  1.0*qq, 1.0 ),
    vec4(  1.0*qq, -0.95+h,  1.0*qq, 1.0 ),
    vec4(  1.0*qq, -1.0+h,  1.0*qq, 1.0 ),
    vec4( -1.0*qq, -1.0+h, -1.0*qq, 1.0 ),
    vec4( -1.0*qq, -0.95+h, -1.0*qq, 1.0 ),
    vec4(  1.0*qq, -0.95+h, -1.0*qq, 1.0 ),
    vec4(  1.0*qq, -1.0+h, -1.0*qq, 1.0 )
];

var vertexColors = [
    vec4( 1.0, 0.0, 0.2, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
];
/*
var vertexColors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
];
*/

//==========================================================
var NumVertices  = 36;  //36 lines = 6 faces, each 2 triangles, each triangle 3 lines

var pointsArray = [];
var colorsArray = [];

//==========================================================


var near = 0.2;

var far = 40.0;

var radius = 3.0;   // how far away the camera is

var theta = 0.0;
var phi   = 0.0;

var  fovy = 45.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect;       // Viewport aspect ratio

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

var eye;

const at = vec3(0.0, 0.0, 0.0); // where the camera is pointing

const up = vec3(0.0, 1.0, 0.0); // tilt of the camera


window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    
    aspect =  canvas.width/canvas.height;
    
    gl.clearColor( 0, 0, 0, 0.3 );

    gl.enable(gl.DEPTH_TEST);
        
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    colorBase();    
    colorBase2();
    pushHeart();

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
    render(); 
}

var render = function() {

    theta += 0.005;

    // Load shaders and initialize attribute buffers --------------------------------

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    eye = vec3( radius*Math.sin(theta)*Math.cos(phi),
                radius*Math.sin(theta)*Math.sin(phi),
                radius*Math.cos(theta) );


    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = perspective(fovy, aspect, near, far);

    // we want to send in the angles for X and Y axis rotations (xangle and yangle)
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.drawArrays( gl.TRIANGLES, 0, 150 );
    requestAnimFrame(render);
}

function quad2(a, b, c, d) {
     pointsArray.push(basevertices[a]); 
     colorsArray.push(vertexColors[a]); 
     pointsArray.push(basevertices[b]); 
     colorsArray.push(vertexColors[b]); 
     pointsArray.push(basevertices[c]); 
     colorsArray.push(vertexColors[c]);     
     pointsArray.push(basevertices[a]); 
     colorsArray.push(vertexColors[d]); 
     pointsArray.push(basevertices[c]); 
     colorsArray.push(vertexColors[a]); 
     pointsArray.push(basevertices[d]); 
     colorsArray.push(vertexColors[b]);  
}
function quad3(a, b, c, d) {
     pointsArray.push(basevertices2[a]); 
     colorsArray.push(vertexColors[b]); 
     pointsArray.push(basevertices2[b]); 
     colorsArray.push(vertexColors[a]); 
     pointsArray.push(basevertices2[c]); 
     colorsArray.push(vertexColors[c]);     
     pointsArray.push(basevertices2[a]); 
     colorsArray.push(vertexColors[d]); 
     pointsArray.push(basevertices2[c]); 
     colorsArray.push(vertexColors[c]); 
     pointsArray.push(basevertices2[d]); 
     colorsArray.push(vertexColors[a]);   
}

function colorBase() {
    quad2( 1, 0, 3, 2 );
    quad2( 2, 3, 7, 6 );
    quad2( 3, 0, 4, 7 );
    quad2( 6, 5, 1, 2 );
    quad2( 4, 5, 6, 7 );
    quad2( 5, 4, 0, 1 );
}
function colorBase2() {
    quad3( 1, 0, 3, 2 );
    quad3( 2, 3, 7, 6 );
    quad3( 3, 0, 4, 7 );
    quad3( 6, 5, 1, 2 );
    quad3( 4, 5, 6, 7 );
    quad3( 5, 4, 0, 1 );
}

var vertexColorsQ = [
    vec4( 1.0, 0.0, 0.0, 1.0 ),
    vec4( 1.0, 0.5, 0.0, 1.0 ),
    vec4( 1.0, 0.0, 0.5, 1.0 ),
];

function tri( a, b, c ) {
    pointsArray.push(heartvertices[a]); 
    colorsArray.push(vertexColorsQ[0]);     
    pointsArray.push(heartvertices[b]); 
    colorsArray.push(vertexColorsQ[1]);
    pointsArray.push(heartvertices[c]); 
    colorsArray.push(vertexColorsQ[2]); 
}

function pushHeart() {
    tri( 0, 7, 1 );
    tri( 7, 6, 5 );
    tri( 7, 5, 4 );
    tri( 4, 3, 2 );
    tri( 1, 4, 2 );

    tri( 8, 9, 15 );
    tri( 9, 10, 12 );
    tri( 10, 11, 12 );
    tri( 12, 13, 14 );
    tri( 12, 14, 15 );

    tri( 0, 1, 8 );
    tri( 8, 1, 9 );

    tri( 1, 2, 9 );
    tri( 9, 2, 10 );

    tri( 2, 3, 11 );
    tri( 2, 11, 10 );

    tri( 3, 4, 12 );
    tri( 3, 12, 11 );

    tri( 4, 5, 13 );
    tri( 4, 13, 12 );

    tri( 5, 6, 14 );
    tri( 5, 14, 13 );

    tri( 6, 7, 15 );
    tri( 6, 15, 14 );

    tri( 7, 0, 8 );
    tri( 7, 8, 15 );
}