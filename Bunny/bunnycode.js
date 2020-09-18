
var canvas;
var gl;

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

//==========================================================
var finalMatrix = mat4();
var ogtMatrix = mat4();
var finalMatrixLoc;

// translation offsets
var zoffset = 0.5;

var click;

// rotation offsets
var xaxisoffset = 0.0;
var yaxisoffset = 0.0;
var zaxisoffset = 0.0;

//==========================================================
// bunny5222
// 1. fill pointsArray
// 2. fill colorsArray
// 3. specify NumVertices

// insert a 1.0 at the end of each vertice
// vertices and realfaces are the real ones

//==========================================================

var NumVertices = 31320;
var pointsArray = [];
var colorsArray = [];


var vertices = get_vertices();  // array containing all the 'corners'
var faces = get_faces();        // array containing representation of faces


for ( var z = 0; z < vertices.length; ++z ) {
    var thePoint = vertices[z];
    thePoint.push( 1.0 );
}

var realfaces = [];

for ( var a = 0; a < faces.length; ++a ) {
    var aface = faces[a];   // each face - holding 3 points
    for (var b = 0; b < 3; ++b ){
        var afacevalue = aface[b];
        --afacevalue;
        realfaces.push(afacevalue);
    }
}

function colorCube() {
    // push vertices and realfaces
    for ( var i = 0; i < realfaces.length; ++i ) {
        var vertexIndex = realfaces[i];
        pointsArray.push( vertices[vertexIndex] );
        colorsArray.push( vertexColors[0] );
    }
}

//==========================================================
//==========================================================

var trackingMouse = false;
var startX, startY;
var curX, curY;
var difX = 0.0;
var difY = 0.0;


//==========================================================


var near = 0.3;
var far = 40.0;

var  fovy = 60.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect;       // Viewport aspect ratio

var modelViewMatrix = mat4();
var projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

var eye = vec3(0.0, 0.0, 10.0);  // eye is the camera location / point

const at = vec3(0.0, 0.0, 0.0); // where the camera is pointing

const up = vec3(0.0, 1.0, 0.0); // tilt of the camera

//==========================================================

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    aspect =  canvas.width/canvas.height;

    gl.clearColor( 0.75, 0.85, 0.8, 1.0 );

    gl.enable(gl.DEPTH_TEST);


    // Load shaders and initialize attribute buffers --------------------------------

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    colorCube();

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

    // -------------------------------------------------------------------------------

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    // -------------------------------------------------------------------------------

    finalMatrix = mat4();
    finalMatrixLoc = gl.getUniformLocation(program, "finalMatrix");
    gl.uniformMatrix4fv(finalMatrixLoc, false, flatten(finalMatrix));

    // -------------------------------------------------------------------------------


    canvas.addEventListener("mousedown", function(event){
        var x = event.clientX;
        var y = event.clientY;
        // 0 lmb, 2 rmb
        if (event.button == 0) {
            click = 0;
        }
        if (event.button == 2) {
            click = 2;
        }

        startMotion(x, y);

    });

    canvas.addEventListener("mouseup", function(event){
        var x = event.clientX;
        var y = event.clientY;
        stopMotion(x, y);
    });

    canvas.addEventListener("mousemove", function(event){
        var x = event.clientX;
        var y = event.clientY;
        mouseMotion(x, y);
    } );

    window.addEventListener("keydown", function(event){
        if (event.keyCode == 82) {
            console.log("zz");
            finalMatrix = mat4();
        }
    }, false );

    canvas.addEventListener("wheel", function(event){
        var z = event.deltaY;
        zoom(z);
    } );

    render();
}

function zoom(z) {
    if ( z > 0 ) { finalMatrix = mult( finalMatrix, translate( 0, 0, -zoffset) ); }
    if ( z < 0 ) { finalMatrix = mult( finalMatrix, translate( 0, 0, +zoffset) ); }
}

function startMotion( x, y ) {
    trackingMouse = true;
    startX = x;
    startY = y
    ogtMatrix = finalMatrix;
}

function stopMotion( x, y ) {
    trackingMouse = false;
    startX = difX;
    startY = difY;
    ogtMatrix = finalMatrix;
}

function mouseMotion( x, y) {
    if(trackingMouse) {
        curX = x;
        curY = y;
        difX = (curX - startX)/100;
        difY = (curY - startY)/100;
        if( click == 0 ) {
            finalMatrix = mult( ogtMatrix, translate( difX, -difY, 0) );
        }
        if( click == 2 ) {
            finalMatrix = mult( finalMatrix, rotateX(difY) );
            finalMatrix = mult( finalMatrix, rotateY(difX) );            
        }
    }
}

// when we start draging, we want to translate with respect to original postion

var render = function() {

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // update finalMatrix with rotation
    //finalMatrix = mult( finalMatrix, rotateX(xaxisoffset) );
    //finalMatrix = mult( finalMatrix, rotateY(yaxisoffset) );
    //finalMatrix = mult( finalMatrix, rotateZ(zaxisoffset) );





    gl.uniformMatrix4fv(finalMatrixLoc, false, flatten(finalMatrix));

    // camera stuff
    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = perspective(fovy, aspect, near, far);
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
    requestAnimFrame(render);
}
