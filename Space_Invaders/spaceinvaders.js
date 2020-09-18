
var canvas;
var gl;
var program;
var vPosition;
var speedModifier = 1;

// cannon location
var height = -0.90;
var width = 0.00;

// bullets
var activeb1 = false;
var activeb2 = false;
var activeb3 = false;
var activeb4 = false;
var activeb5 = false;

var heightb1 = -0.85;
var widthb1 = width;

var heightb2 = -0.85;
var widthb2 = width;

var heightb3 = -0.85;
var widthb3 = width;

var heightb4 = -0.85;
var widthb4 = width;

var heightb5 = -0.85;
var widthb5 = width;

// aliens
var activea1 = true;
var activea2 = true;
var activea3 = true;
var activea4 = true;
var activea5 = true;
var activea6 = true;

var heightAlien1 = 0.85;
var heightAlien2 = 0.65;
var widtha1 = -0.70;
var widtha2 = -0.10;
var widtha3 = 0.60;
var widtha4 = -0.40;
var widtha5 = 0.20;
var widtha6 = 0.70;

var a1left = true;
var a2left = true;
var a3left = true;
var a4left = false;
var a5left = false;
var a6left = false;

var pressedLeft = 0;
var pressedRight = 0;
var pressedSpace = 0;


function getKey(key) {
    if (key.key == "ArrowLeft")     { pressedLeft = 1; }
    if (key.key == "ArrowRight")    { pressedRight = 1; }
    if (key.keyCode == 32 )        { pressedSpace = 1; }
}

window.onload = function init() {

    window.addEventListener("keydown", getKey, false);
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.75, 0.85, 0.8, 1.0 );
    render();

};

function render() {

    drawCannon();
if (heightAlien1>-0.9){
    if ( activea1 ) { drawAlien1() };
    if ( activea2 ) { drawAlien2() };
    if ( activea3 ) { drawAlien3() };
    if ( activea4 ) { drawAlien4() };
    if ( activea5 ) { drawAlien5() };
    if ( activea6 ) { drawAlien6() };
}
    if ( heightAlien1 < 0.7 && heightAlien1 > 0.0 ) { speedModifier = 1.5; }
    if ( heightAlien1 < 0.0 && heightAlien1 > -0.4  ) { speedModifier = 2.0; }
    if ( heightAlien1 < -0.4 ) { speedModifier = 2.7; }

    heightAlien1 = heightAlien1 - 0.001;
    heightAlien2 = heightAlien2 - 0.001;

    if ( activeb1 ) { drawBullet1(); heightb1 = heightb1 + 0.01 }
    if ( activeb2 ) { drawBullet2(); heightb2 = heightb2 + 0.01 }
    if ( activeb3 ) { drawBullet3(); heightb3 = heightb3 + 0.01 }
    if ( activeb4 ) { drawBullet4(); heightb4 = heightb4 + 0.01 }
    if ( activeb5 ) { drawBullet5(); heightb5 = heightb5 + 0.01 }

    if ( activea1 == false ) { widtha1 = -1.5 }
    if ( activea2 == false ) { widtha2 = -1.5 }
    if ( activea3 == false ) { widtha3 = -1.5 }
    if ( activea4 == false ) { widtha4 = -1.5 }
    if ( activea5 == false ) { widtha5 = -1.5 }
    if ( activea6 == false ) { widtha6 = -1.5 }

    if ( pressedSpace == 1 ) {

        if ( activeb1 == false ) {
            widthb1 = width;
            activeb1 = 1;
            pressedSpace = 0;
        } else if ( activeb2 == false ) {
            widthb2 = width;
            activeb2 = 1;
            pressedSpace = 0;
        } else if ( activeb3 == false ) {
            widthb3 = width;
            activeb3 = 1;
            pressedSpace = 0;
        } else if ( activeb4 == false ) {
            widthb4 = width;
            activeb4 = 1;
            pressedSpace = 0;
        } else if ( activeb5 == false ) {
            widthb5 = width;
            activeb5 = 1;
            pressedSpace = 0;
        }




    }


    window.requestAnimFrame(render);

}



function drawCannon() {

    var vertices = [    vec2( width - 0.05, height + 0.05 ),
                        vec2( width + 0.05, height + 0.05 ),
                        vec2( width + 0.05, height - 0.05 ),
                        vec2( width - 0.05, height + 0.05 ),
                        vec2( width + 0.05, height - 0.05 ),
                        vec2( width - 0.05, height - 0.05 )     ];

    if ( pressedLeft == 1) {
        if ( width > -0.90 ) { width = width - 0.05; }
        pressedLeft = 0
    }
 
    if ( pressedRight == 1) {
        if ( width < 0.90 ) { width = width + 0.05; }
        pressedRight = 0
    }

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );

}

function drawAlien1() {

    var verticesa1 = [  vec2( widtha1 - 0.05, heightAlien1 + 0.05 ),
                        vec2( widtha1 + 0.05, heightAlien1 + 0.05 ),
                        vec2( widtha1 + 0.05, heightAlien1 - 0.05 ),
                        vec2( widtha1 - 0.05, heightAlien1 + 0.05 ),
                        vec2( widtha1 + 0.05, heightAlien1 - 0.05 ),
                        vec2( widtha1 - 0.05, heightAlien1 - 0.05 )     ];

    if ( a1left) {
        widtha1 = widtha1 - 0.0025*speedModifier;
    } else {
        widtha1 = widtha1 + 0.0025*speedModifier;
    }

    if ( (widtha1 < -0.90) ) {
        a1left = false;
    } else if ( (widtha1+0.05 > widtha2-0.05) || (widtha1+0.05 > widtha3-0.05) ){
        a1left = true;
    }
   
    program = initShaders( gl, "vertex-shader", "fragment-shader3" );
    gl.useProgram( program );
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesa1), gl.STATIC_DRAW );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );
}

function drawAlien2() {

    var verticesa2 = [  vec2( widtha2 - 0.05, heightAlien1 + 0.05 ),
                        vec2( widtha2 + 0.05, heightAlien1 + 0.05 ),
                        vec2( widtha2 + 0.05, heightAlien1 - 0.05 ),
                        vec2( widtha2 - 0.05, heightAlien1 + 0.05 ),
                        vec2( widtha2 + 0.05, heightAlien1 - 0.05 ),
                        vec2( widtha2 - 0.05, heightAlien1 - 0.05 )     ];

    if ( a2left) {
        widtha2 = widtha2 - 0.0025*speedModifier;
    } else {
        widtha2 = widtha2 + 0.0025*speedModifier;
    }

    if ( (widtha2 < -0.90) || (widtha2-0.05<widtha1+0.05) ) {
        a2left = false;
    } else if ( (widtha2 > 0.90) || (widtha2+0.05 > widtha3-0.05) ){
        a2left = true;
    }

    program = initShaders( gl, "vertex-shader", "fragment-shader3" );
    gl.useProgram( program );
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesa2), gl.STATIC_DRAW );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );
}

function drawAlien3() {

    var verticesa3 = [  vec2( widtha3 - 0.05, heightAlien1 + 0.05 ),
                        vec2( widtha3 + 0.05, heightAlien1 + 0.05 ),
                        vec2( widtha3 + 0.05, heightAlien1 - 0.05 ),
                        vec2( widtha3 - 0.05, heightAlien1 + 0.05 ),
                        vec2( widtha3 + 0.05, heightAlien1 - 0.05 ),
                        vec2( widtha3 - 0.05, heightAlien1 - 0.05 )     ];

    if ( a3left) {
        widtha3 = widtha3 - 0.0025*speedModifier;
    } else {
        widtha3 = widtha3 + 0.0025*speedModifier;
    }

    if ( (widtha3 < -0.90) || (widtha3-0.05<widtha1+0.05) || (widtha3-0.05<widtha2+0.05)) {
        a3left = false;
    } else if ( (widtha3 > 0.90) ){
        a3left = true;
    }

    program = initShaders( gl, "vertex-shader", "fragment-shader3" );
    gl.useProgram( program );
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesa3), gl.STATIC_DRAW );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );
}

function drawAlien4() {

    var verticesa4 = [  vec2( widtha4 - 0.05, heightAlien2 + 0.05 ),
                        vec2( widtha4 + 0.05, heightAlien2 + 0.05 ),
                        vec2( widtha4 + 0.05, heightAlien2 - 0.05 ),
                        vec2( widtha4 - 0.05, heightAlien2 + 0.05 ),
                        vec2( widtha4 + 0.05, heightAlien2 - 0.05 ),
                        vec2( widtha4 - 0.05, heightAlien2 - 0.05 )     ];

    if ( a4left) {
        widtha4 = widtha4 - 0.0025*speedModifier;
    } else {
        widtha4 = widtha4 + 0.0025*speedModifier;
    }

    if ( (widtha4 < -0.90) ) {
        a4left = false;
    } else if ( (widtha4+0.05 > widtha5-0.05) || (widtha4+0.05 > widtha5-0.05) ){
        a4left = true;
    }

    program = initShaders( gl, "vertex-shader", "fragment-shader3" );
    gl.useProgram( program );
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesa4), gl.STATIC_DRAW );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );
}

function drawAlien5() {

    var verticesa5 = [  vec2( widtha5 - 0.05, heightAlien2 + 0.05 ),
                        vec2( widtha5 + 0.05, heightAlien2 + 0.05 ),
                        vec2( widtha5 + 0.05, heightAlien2 - 0.05 ),
                        vec2( widtha5 - 0.05, heightAlien2 + 0.05 ),
                        vec2( widtha5 + 0.05, heightAlien2 - 0.05 ),
                        vec2( widtha5 - 0.05, heightAlien2 - 0.05 )     ];

    if ( a5left) {
        widtha5 = widtha5 - 0.0025*speedModifier;
    } else {
        widtha5 = widtha5 + 0.0025*speedModifier;
    }

    if ( (widtha5 < -0.90) || (widtha5-0.05<widtha4+0.05) ) {
        a5left = false;
    } else if ( (widtha5 > 0.90) || (widtha5+0.05 > widtha6-0.05) ){
        a5left = true;
    }

    program = initShaders( gl, "vertex-shader", "fragment-shader3" );
    gl.useProgram( program );
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesa5), gl.STATIC_DRAW );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );
}

function drawAlien6() {

    var verticesa6 = [  vec2( widtha6 - 0.05, heightAlien2 + 0.05 ),
                        vec2( widtha6 + 0.05, heightAlien2 + 0.05 ),
                        vec2( widtha6 + 0.05, heightAlien2 - 0.05 ),
                        vec2( widtha6 - 0.05, heightAlien2 + 0.05 ),
                        vec2( widtha6 + 0.05, heightAlien2 - 0.05 ),
                        vec2( widtha6 - 0.05, heightAlien2 - 0.05 )     ];

    if ( a6left) {
        widtha6 = widtha6 - 0.0025*speedModifier;
    } else {
        widtha6 = widtha6 + 0.0025*speedModifier;
    }

    if ( (widtha6 < -0.90) || (widtha6-0.05<widtha4+0.05) || (widtha6-0.05<widtha5+0.05)) {
        a6left = false;
    } else if ( (widtha6 > 0.90) ){
        a6left = true;
    }

    program = initShaders( gl, "vertex-shader", "fragment-shader3" );
    gl.useProgram( program );
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesa6), gl.STATIC_DRAW );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );
}


function drawBullet1() {

    var verticesb1 = [  vec2( widthb1 - 0.025, heightb1 + 0.05 ),
                        vec2( widthb1 + 0.025, heightb1 + 0.05 ),
                        vec2( widthb1        , heightb1 + 0.10 )    ];

    // draw -----------------------------------------------------------------
    program = initShaders( gl, "vertex-shader", "fragment-shader2" );
    gl.useProgram( program );
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer); 
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesb1), gl.STATIC_DRAW );  
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
    // ----------------------------------------------------------------------
// if the tip point is inside a baddie
    if ( widthb1<=widtha1+0.05 && widthb1>=widtha1-0.05 && heightb1+0.10<=heightAlien1+0.05 && heightb1+0.10>=heightAlien1-0.05 ) { activea1 = false; activeb1 = false; heightb1 = -0.85;}
    if ( widthb1<=widtha2+0.05 && widthb1>=widtha2-0.05 && heightb1+0.10<=heightAlien1+0.05 && heightb1+0.10>=heightAlien1-0.05 ) { activea2 = false; activeb1 = false; heightb1 = -0.85;}
    if ( widthb1<=widtha3+0.05 && widthb1>=widtha3-0.05 && heightb1+0.10<=heightAlien1+0.05 && heightb1+0.10>=heightAlien1-0.05 ) { activea3 = false; activeb1 = false; heightb1 = -0.85;}
    if ( widthb1<=widtha4+0.05 && widthb1>=widtha4-0.05 && heightb1+0.10<=heightAlien2+0.05 && heightb1+0.10>=heightAlien2-0.05 ) { activea4 = false; activeb1 = false; heightb1 = -0.85;}
    if ( widthb1<=widtha5+0.05 && widthb1>=widtha5-0.05 && heightb1+0.10<=heightAlien2+0.05 && heightb1+0.10>=heightAlien2-0.05 ) { activea5 = false; activeb1 = false; heightb1 = -0.85;}
    if ( widthb1<=widtha6+0.05 && widthb1>=widtha6-0.05 && heightb1+0.10<=heightAlien2+0.05 && heightb1+0.10>=heightAlien2-0.05 ) { activea6 = false; activeb1 = false; heightb1 = -0.85;}


    if ( heightb1 > 0.8 ) {
        activeb1 = 0;
        heightb1 = -0.85;
    }
}

function drawBullet2() {

    var verticesb2 = [  vec2( widthb2 - 0.025, heightb2 + 0.05 ),
                        vec2( widthb2 + 0.025, heightb2 + 0.05 ),
                        vec2( widthb2        , heightb2 + 0.10 )    ];

    // draw -----------------------------------------------------------------
    program = initShaders( gl, "vertex-shader", "fragment-shader2" );
    gl.useProgram( program );
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer); 
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesb2), gl.STATIC_DRAW );  
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
    // ----------------------------------------------------------------------
    if ( widthb2<=widtha1+0.05 && widthb2>=widtha1-0.05 && heightb2+0.10<=heightAlien1+0.05 && heightb2+0.10>=heightAlien1-0.05 ) { activea1 = false; activeb2 = false; heightb2 = -0.85;}
    if ( widthb2<=widtha2+0.05 && widthb2>=widtha2-0.05 && heightb2+0.10<=heightAlien1+0.05 && heightb2+0.10>=heightAlien1-0.05 ) { activea2 = false; activeb2 = false; heightb2 = -0.85;}
    if ( widthb2<=widtha3+0.05 && widthb2>=widtha3-0.05 && heightb2+0.10<=heightAlien1+0.05 && heightb2+0.10>=heightAlien1-0.05 ) { activea3 = false; activeb2 = false; heightb2 = -0.85;}
    if ( widthb2<=widtha4+0.05 && widthb2>=widtha4-0.05 && heightb2+0.10<=heightAlien2+0.05 && heightb2+0.10>=heightAlien2-0.05 ) { activea4 = false; activeb2 = false; heightb2 = -0.85;}
    if ( widthb2<=widtha5+0.05 && widthb2>=widtha5-0.05 && heightb2+0.10<=heightAlien2+0.05 && heightb2+0.10>=heightAlien2-0.05 ) { activea5 = false; activeb2 = false; heightb2 = -0.85;}
    if ( widthb2<=widtha6+0.05 && widthb2>=widtha6-0.05 && heightb2+0.10<=heightAlien2+0.05 && heightb2+0.10>=heightAlien2-0.05 ) { activea6 = false; activeb2 = false; heightb2 = -0.85;}

    if ( heightb2 > 0.8 ) {
        activeb2 = 0;
        heightb2 = -0.85;
    }
}

function drawBullet3() {

    var verticesb3 = [  vec2( widthb3 - 0.025, heightb3 + 0.05 ),
                        vec2( widthb3 + 0.025, heightb3 + 0.05 ),
                        vec2( widthb3        , heightb3 + 0.10 )    ];

    // draw -----------------------------------------------------------------
    program = initShaders( gl, "vertex-shader", "fragment-shader2" );
    gl.useProgram( program );
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer); 
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesb3), gl.STATIC_DRAW );  
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
    // ----------------------------------------------------------------------
    if ( widthb3<=widtha1+0.05 && widthb3>=widtha1-0.05 && heightb3+0.10<=heightAlien1+0.05 && heightb3+0.10>=heightAlien1-0.05 ) { activea1 = false; activeb3 = false; heightb3 = -0.85;}
    if ( widthb3<=widtha2+0.05 && widthb3>=widtha2-0.05 && heightb3+0.10<=heightAlien1+0.05 && heightb3+0.10>=heightAlien1-0.05 ) { activea2 = false; activeb3 = false; heightb3 = -0.85;}
    if ( widthb3<=widtha3+0.05 && widthb3>=widtha3-0.05 && heightb3+0.10<=heightAlien1+0.05 && heightb3+0.10>=heightAlien1-0.05 ) { activea3 = false; activeb3 = false; heightb3 = -0.85;}
    if ( widthb3<=widtha4+0.05 && widthb3>=widtha4-0.05 && heightb3+0.10<=heightAlien2+0.05 && heightb3+0.10>=heightAlien2-0.05 ) { activea4 = false; activeb3 = false; heightb3 = -0.85;}
    if ( widthb3<=widtha5+0.05 && widthb3>=widtha5-0.05 && heightb3+0.10<=heightAlien2+0.05 && heightb3+0.10>=heightAlien2-0.05 ) { activea5 = false; activeb3 = false; heightb3 = -0.85;}
    if ( widthb3<=widtha6+0.05 && widthb3>=widtha6-0.05 && heightb3+0.10<=heightAlien2+0.05 && heightb3+0.10>=heightAlien2-0.05 ) { activea6 = false; activeb3 = false; heightb3 = -0.85;}

    if ( heightb3 > 0.8 ) {
        activeb3 = 0;
        heightb3 = -0.85;
    }
}

function drawBullet4() {

    var verticesb4 = [  vec2( widthb4 - 0.025, heightb4 + 0.05 ),
                        vec2( widthb4 + 0.025, heightb4 + 0.05 ),
                        vec2( widthb4        , heightb4 + 0.10 )    ];

    // draw -----------------------------------------------------------------
    program = initShaders( gl, "vertex-shader", "fragment-shader2" );
    gl.useProgram( program );
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer); 
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesb4), gl.STATIC_DRAW );  
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
    // ----------------------------------------------------------------------
    if ( widthb4<=widtha1+0.05 && widthb4>=widtha1-0.05 && heightb4+0.10<=heightAlien1+0.05 && heightb4+0.10>=heightAlien1-0.05 ) { activea1 = false; activeb4 = false; heightb4 = -0.85;}
    if ( widthb4<=widtha2+0.05 && widthb4>=widtha2-0.05 && heightb4+0.10<=heightAlien1+0.05 && heightb4+0.10>=heightAlien1-0.05 ) { activea2 = false; activeb4 = false; heightb4 = -0.85;}
    if ( widthb4<=widtha3+0.05 && widthb4>=widtha3-0.05 && heightb4+0.10<=heightAlien1+0.05 && heightb4+0.10>=heightAlien1-0.05 ) { activea3 = false; activeb4 = false; heightb4 = -0.85;}
    if ( widthb4<=widtha4+0.05 && widthb4>=widtha4-0.05 && heightb4+0.10<=heightAlien2+0.05 && heightb4+0.10>=heightAlien2-0.05 ) { activea4 = false; activeb4 = false; heightb4 = -0.85;}
    if ( widthb4<=widtha5+0.05 && widthb4>=widtha5-0.05 && heightb4+0.10<=heightAlien2+0.05 && heightb4+0.10>=heightAlien2-0.05 ) { activea5 = false; activeb4 = false; heightb4 = -0.85;}
    if ( widthb4<=widtha6+0.05 && widthb4>=widtha6-0.05 && heightb4+0.10<=heightAlien2+0.05 && heightb4+0.10>=heightAlien2-0.05 ) { activea6 = false; activeb4 = false; heightb4 = -0.85;} 

    if ( heightb4 > 0.8 ) {
        activeb4 = 0;
        heightb4 = -0.85;
    }
}

function drawBullet5() {

    var verticesb5 = [  vec2( widthb5 - 0.025, heightb5 + 0.05 ),
                        vec2( widthb5 + 0.025, heightb5 + 0.05 ),
                        vec2( widthb5        , heightb5 + 0.10 )    ];

    // draw -----------------------------------------------------------------
    program = initShaders( gl, "vertex-shader", "fragment-shader2" );
    gl.useProgram( program );
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer); 
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesb5), gl.STATIC_DRAW );  
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
    // ----------------------------------------------------------------------
    if ( widthb5<=widtha1+0.05 && widthb5>=widtha1-0.05 && heightb5+0.10<=heightAlien1+0.05 && heightb5+0.10>=heightAlien1-0.05 ) { activea1 = false; activeb5 = false; heightb5 = -0.85;}
    if ( widthb5<=widtha2+0.05 && widthb5>=widtha2-0.05 && heightb5+0.10<=heightAlien1+0.05 && heightb5+0.10>=heightAlien1-0.05 ) { activea2 = false; activeb5 = false; heightb5 = -0.85;}
    if ( widthb5<=widtha3+0.05 && widthb5>=widtha3-0.05 && heightb5+0.10<=heightAlien1+0.05 && heightb5+0.10>=heightAlien1-0.05 ) { activea3 = false; activeb5 = false; heightb5 = -0.85;}
    if ( widthb5<=widtha4+0.05 && widthb5>=widtha4-0.05 && heightb5+0.10<=heightAlien2+0.05 && heightb5+0.10>=heightAlien2-0.05 ) { activea4 = false; activeb5 = false; heightb5 = -0.85;}
    if ( widthb5<=widtha5+0.05 && widthb5>=widtha5-0.05 && heightb5+0.10<=heightAlien2+0.05 && heightb5+0.10>=heightAlien2-0.05 ) { activea5 = false; activeb5 = false; heightb5 = -0.85;}
    if ( widthb5<=widtha6+0.05 && widthb5>=widtha6-0.05 && heightb5+0.10<=heightAlien2+0.05 && heightb5+0.10>=heightAlien2-0.05 ) { activea6 = false; activeb5 = false; heightb5 = -0.85;} 

    if ( heightb5 > 0.8 ) {
        activeb5 = 0;
        heightb5 = -0.85;
    }
}
/*
    // black square
    program = initShaders( gl, "vertex-shader", "fragment-shader2" );
    gl.useProgram( program );
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer); 
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var vertices2 = [
        vec2( width2 - 0.05, height2 + 0.05 ),
        vec2( width2 + 0.05, height2 + 0.05 ),
        vec2( width2 + 0.05, height2 - 0.05 ),
        vec2( width2 - 0.05, height2 + 0.05 ),
        vec2( width2 + 0.05, height2 - 0.05 ),
        vec2( width2 - 0.05, height2 - 0.05 )
    ];

    if ( pressedDown2 == 1) {
        if ( height2 > -0.80 ) { height2 = height2 - 0.05; }
        pressedDown2 = 0
    }

    if ( pressedUp2 == 1) {
        if ( height2 < 0.80 ) { height2 = height2 + 0.05; }
        pressedUp2 = 0
    }

    if ( pressedLeft2 == 1) {
        if ( width2 > -0.80 ) { width2 = width2 - 0.05; }
        pressedLeft2 = 0
    }
 
    if ( pressedRight2 == 1) {
        if ( width2 < 0.80 ) { width2 = width2 + 0.05; }
        pressedRight2 = 0
    }

    console.log(height);
    console.log(width);

    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices2), gl.STATIC_DRAW );  

    //gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );

*/

/*
window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );



    // Initialise WebGL
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Sync HTML canvas size with JS canvas
    gl.viewport( 0, 0, canvas.width, canvas.height );

    //  Set canvas COLOR_BUFFER_BIT
    gl.clearColor( 0.75, 0.85, 0.8, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    vBuffer = gl.createBuffer();

    // Binding the vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer); 
    
    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );    
    
    render();

};

function render() {

    window.addEventListener("keydown", getKey, false);

	var vertices = [
		vec2( width - 0.05, height + 0.05 ),
		vec2( width + 0.05, height + 0.05 ),
		vec2( width + 0.05, height - 0.05 ),
		vec2( width - 0.05, height + 0.05 ),
		vec2( width + 0.05, height - 0.05 ),
		vec2( width - 0.05, height - 0.05 )
	];

	if ( pressedDown == 1) {
		if ( height > -0.80 ) { height = height - 0.05; }
        pressedDown = 0
	}

    if ( pressedUp == 1) {
        if ( height < 0.80 ) { height = height + 0.05; }
        pressedUp = 0
    }

    if ( pressedLeft == 1) {
        if ( width > -0.80 ) { width = width - 0.05; }
        pressedLeft = 0
    }
 
    if ( pressedRight == 1) {
        if ( width < 0.80 ) { width = width + 0.05; }
        pressedRight = 0
    }

	console.log(height);
    console.log(width);

	// Binding the vertex buffer
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );  

    // Clearing the buffer and drawing the square
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );

    window.requestAnimFrame(render);

}

*/



/*
window.onload = function init() {
canvas = document.getElementById( "gl-canvas" );
gl = WebGLUtils.setupWebGL( canvas );
if ( !gl ) { alert( "WebGL isn't available" ); }
gl.viewport( 0, 0, canvas.width, canvas.height );
gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
vBuffer = gl.createBuffer();
// Load shaders and initialize attribute buffers
program = initShaders( gl, "vertex-shader", "fragment-shader" );
gl.useProgram( program );
// Binding the vertex buffer
gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
// Associate out shader variables with our data buffer
var vPosition = gl.getAttribLocation( program, "vPosition" );
gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPosition );
render();
}

function render() {
// Six Vertices
var vertices = [
vec2( -0.05, height),
vec2( 0.05, height),
vec2( 0.05, height - 0.1 ),
vec2( -0.05, height),
vec2( 0.05, height - 0.1 ),
vec2( -0.05, height - 0.1 )
];
// Changing the height value for moving the square
height = height - 0.01;
// For debugging
console.log(height);
// Binding the vertex buffer
gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
// Clearing the buffer and drawing the square
gl.clear( gl.COLOR_BUFFER_BIT );
gl.drawArrays( gl.TRIANGLES, 0, 6 );
window.requestAnimFrame(render);
*/